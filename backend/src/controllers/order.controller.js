import { OrderModel } from '../models/orderModel.js';
import { OrderStatus } from '../constants/orderStatus.js';
import { UserModel } from '../models/userModel.js';
import { sendEmailReceipt } from '../helpers/mailHelper.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { verifyPaymentSignature } from '../config/razorpay.config.js';
import dotenv from 'dotenv';

dotenv.config();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrderWithRazorpay = async (req, res) => {
  console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
  
  try {
    // const { userId, items, amount, bookTableInfo } = req.body;

    // console.log("Received Order Data:", { userId, items, amount, bookTableInfo });
    const {
      user,
      items,
      totalPrice,
      amount,
      address,
      name,
      addressLatLng,
      bookTableInfo
    } = req.body;
  
    console.log('Received Order Data:', req.body); 

    // if (!userId || !items || !amount || !bookTableInfo) {
    //   console.log("Missing required fields");
    //   return res.status(400).json({ success: false, message: 'Missing required fields' });
    // }
   // Validate required fields
   if (!user || !totalPrice || !amount || !address || !name || !addressLatLng || !items) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }
    const amountInPaise = Math.round(amount*100); // Convert to paisa

    // const newOrder = new OrderModel({
    //   userID: userId,
    //   items,
    //   amount: amountInPaise,
    //   bookTableInfo,
    // });
    // await newOrder.save();

    // try {
      const order = new OrderModel({
        user,
        items,
        totalPrice,
        amount,
        address,
        name,
        addressLatLng: addressLatLng || null, 
        bookTableInfo
      });
  
      await order.save();
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: crypto.randomBytes(16).toString('hex'),
      payment_capture: '1',
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("Razorpay Order Created:", razorpayOrder);

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
    });
  
  } catch (error) {
    console.error('Error placing order with Razorpay:', error);
    res.status(500).json({ success: false, message: 'An error occurred while placing the order.', error: error.message });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    console.log("Received Capture Data:", { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature });

    if (!verifyPaymentSignature(orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature)) {
      console.log("Invalid signature");
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const order = await OrderModel.findById(orderCreationId);
    if (!order) {
      console.log("Order not found");
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.paymentId = true;
    await order.save();

    res.json({ success: true, message: 'Payment successful' });
  } catch (error) {
    console.error('Error capturing payment:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while capturing the payment.', error: error.message });
  }
};


const createOrder = async (req, res) => {
  try {
    const order = req.body;

    if (!order.items || order.items.length <= 0) {
      return res.status(400).json({ message: 'Cart is empty!' });
    }

    // Remove existing new order for the user
    await OrderModel.deleteOne({ user: req.user.id, status: OrderStatus.NEW });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const payOrder = async (req, res) => {
  try {
    const { paymentId } = req.body;
    const order = await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });

    if (!order) {
      return res.status(400).json({ message: 'Order not found!' });
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    sendEmailReceipt(order);

    res.json({ orderId: order._id });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const user = await UserModel.findById(req.user.id);

    const filter = { _id: orderId };
    if (!user.isAdmin) {
      filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);
    if (!order) {
      return res.status(404).json({ message: 'Order not found!' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error tracking order:', error);
    res.status(500).json({ message: 'Error tracking order', error: error.message });
  }
};

const getNewOrderForCurrentUser = async (req, res) => {
  try {
    const order = await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW }).populate('user');
    if (!order) {
      return res.status(404).json({ message: 'No new order found for user' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching new order for user:', error);
    res.status(500).json({ message: 'Error fetching new order for user', error: error.message });
  }
};

const getAllOrderStatuses = (req, res) => {
  res.json(Object.values(OrderStatus));
};

const getOrdersByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const user = await UserModel.findById(req.user.id);

    const filter = {};
    if (!user.isAdmin) filter.user = user._id;
    if (status) filter.status = status;

    const orders = await OrderModel.find(filter).sort('-createdAt');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    res.status(500).json({ message: 'Error fetching orders by status', error: error.message });
  }
};

export { createOrder, payOrder, trackOrder, getNewOrderForCurrentUser, getAllOrderStatuses, getOrdersByStatus, placeOrderWithRazorpay, capturePayment  };
