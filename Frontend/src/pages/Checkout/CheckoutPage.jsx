<<<<<<< HEAD
import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createOrder } from '../../services/orderService';
import './checkoutPage.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Map from '../../components/Map/Map';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    if (!order.addressLatLng) {
      toast.warning('Please select your location on the map');
      return;
    }

    try {
      await createOrder({ ...order, name: data.name, address: data.address });
      clearCart(); // Clear the cart after successful order
      navigate('/payment');
    } catch (error) {
      toast.error('Failed to create order. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <Title title="Order Form" fontSize="1.6rem" />
          <div>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register('address', { required: 'Address is required' })}
              error={errors.address}
            />
          </div>
          <OrderItemsList order={order} />
        </div>
        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={(latlng) => {
              setOrder({ ...order, addressLatLng: latlng });
            }}
          />
        </div>
        <div>
          <Button
            type="submit"
            text="Go To Payment"
           
            width="100%"
            height="3rem"
          />
          <Button
            type="submit"
            
            text="Pay at Counter"
            width="100%"
            height="3rem"
          />
        </div>
      </form>
    </div>
  );
}
=======
import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import classes from './checkoutPage.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Map from '../../components/Map/Map';
import { getDistance } from 'geolib'; // Import distance calculation utility


export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart, addressLatLng: null });
  const [error, setError] = useState("");
  const [razorpayOrderId, setRazorpayOrderId] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Define restaurant coordinates for distance validation
  const restaurantLocation = { lat: 25.609, lng: 85.1343 }; // Example location

  const validateLocation = (latlng) => {
    const distance = getDistance(
      { latitude: restaurantLocation.lat, longitude: restaurantLocation.lng },
      { latitude: latlng.lat, longitude: latlng.lng }
    );
    return distance <= 100;
  };

  const submitOrder = async (data) => {
    if (order.addressLatLng && !validateLocation(order.addressLatLng)) {
      toast.warning('Your location is more than 100 meters from the restaurant. Please move closer.');
      return;
    }

    try {
      const { data: orderResponse } = await axios.post('/api/orders/place', {
        user: user.id,
        items: cart.items.map(item => ({
          food: item.food,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: cart.totalPrice,
        amount: cart.totalPrice,
        name: data.name,
        address: data.address,
        addressLatLng: order.addressLatLng ? {
          lat: order.addressLatLng.lat,
          lng: order.addressLatLng.lng
        } : null,
        bookTableInfo: {
          tableNumber: data.tableNumber,
          numberOfPersons: data.numberOfPersons,
          mobileNumber: data.mobileNumber
        }
      });

      const options = {
        key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay key
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: "BrTech",
        description: "Order Payment",
        order_id: orderResponse.orderId,
        handler: async (response) => {
          const paymentData = {
            orderCreationId: orderResponse.orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          try {
            const captureResponse = await axios.post('/api/orders/capture', paymentData);
            if (captureResponse.data.success) {
              toast.success("Payment Successful! Your order has been placed.");
              clearCart();
              navigate('/thank-you');
            } else {
              toast.error("Payment failed. Please try again.");
            }
          } catch (error) {
            setError("An error occurred while capturing the payment. Please try again.");
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.mobileNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setError(`An error occurred while placing the order: ${error.message}`);
    }
  };

  useEffect(() => {
    if (window.Razorpay) {
      window.Razorpay = window.Razorpay;
    }
  }, []);

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(submitOrder)}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register('address', { required: 'Address is required' })}
              error={errors.address}
            />
            <Input
              type="text"
              label="Mobile Number"
              name="mobileNumber"
              {...register('mobileNumber', { required: 'Mobile Number is required' })}
              error={errors.mobileNumber}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              {...register('email')}
              error={errors.email}
            />
            <Input
              type="number"
              label="Number of Persons"
              name="numberOfPersons"
              {...register('numberOfPersons', { required: 'Number of Persons is required' })}
              error={errors.numberOfPersons}
            />
            <select
              label="BookTable"
              name="tableNumber"
              {...register('tableNumber', { required: 'Table Number is required' })}
              className="border border-2 p-2 w-full mb-3"
            >
              <option value="">Select Table Number</option>
              <option value="1">Table 1</option>
              <option value="2">Table 2</option>
              <option value="3">Table 3</option>
            </select>
          </div>
          
          <OrderItemsList order={order} />
        </div>
        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            readonly={false}
            location={order.addressLatLng}
            onChange={(latlng) => setOrder({ ...order, addressLatLng: latlng })}
          />
        </div>
        <div className={classes.buttons_container}>
          <Button
            type="submit"
            text="Go To Payment"
            width="100%"
            height="3rem"
            disabled={!order.addressLatLng || !validateLocation(order.addressLatLng)} // Disable if location is invalid
          />
          <Button
            type="button"
            text="Pay at Counter"
            width="100%"
            height="3rem"
            onClick={submitOrder}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}
>>>>>>> 921cc4015e8fa76aee9f0ce442894306da0db461
