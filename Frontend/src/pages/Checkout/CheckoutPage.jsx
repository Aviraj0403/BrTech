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
  const [order, setOrder] = useState({ ...cart, addressLatLng: null });
  const [error, setError] = useState("");

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
      // Create the order in your system first
      const orderResponse = await createOrder({
        user: user.id,  // Ensure user ID is sent
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
      });

      // Razorpay payment options
      const options = {
        key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay key
        amount: orderResponse.amount, // Amount in the smallest currency unit
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
            const captureResponse = await capturePayment(paymentData);
            if (captureResponse.success) {
              toast.success("Payment Successful! Your order has been placed.");
              clearCart(); // Clear the cart after successful payment
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

      // Open Razorpay checkout
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
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
          </div>
          <OrderItemsList order={order} />
        </div>
        <div>
          <Title title="Choose Your Location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={(latlng) => setOrder({ ...order, addressLatLng: latlng })}
          />
        </div>
        <div>
          <Button
            type="submit"
            text="Go To Payment"
            width="100%"
            height="3rem"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}
