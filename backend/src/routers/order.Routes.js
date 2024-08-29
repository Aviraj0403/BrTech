import { Router } from 'express';
import {
  createOrder,
  payOrder,
  trackOrder,
  getNewOrderForCurrentUser,
  getAllOrderStatuses,
  getOrdersByStatus,
  placeOrderWithRazorpay,
  capturePayment
} from '../controllers/order.controller.js';
import authMiddleware from '../middleware/authMid.js';

const router = Router();

// Authentication middleware for protected routes
router.use(authMiddleware);

// Routes for standard order operations
router.post('/create', createOrder);
router.put('/pay', payOrder);
router.get('/track/:orderId', trackOrder);
router.get('/newOrderForCurrentUser', getNewOrderForCurrentUser);
router.get('/allstatus', getAllOrderStatuses);
router.get('/:status?', getOrdersByStatus);

// Routes for Razorpay integration
router.post('/place', placeOrderWithRazorpay);
router.post('/capture', capturePayment);

export default router;
