import React from "react";
import { Link } from "react-router-dom";
import Price from "../../components/Price/Price";
import NotFound from "../../components/NotFound/NotFound";
import "./cartPage.css";
import { useCart } from "../../hooks/useCart";
import Footer from "../../components/Footer/Footer";

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  if (cart.items.length === 0) {
    return <NotFound message="Cart Page Is Empty!" />;
  }

  return (
    <>
      <section className="cart">
        <div className="cart-header">
          <Link to="/" className="cart-home-link">
            <span>&larr; Home</span>
          </Link>
          <h1 className="cart-title">Cart</h1>
        </div>

        <div className="cart-items">
          <div className="cart-items-title cart-heading">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          <hr />

          {cart.items.length === 0 ? (
            <p className="NoItems">No Items in cart</p>
          ) : (
            cart.items.map((cartItem) => (
              <React.Fragment key={cartItem._id}>
                <div className="cart-items-item">
                  <img src={cartItem.food.imageUrl} alt="food img" />
                  <p>{cartItem.food.name}</p>
                  <p>&#x20b9;{cartItem.food.price}</p>
                  <p>
                    <select
                      value={cartItem.quantity}
                      onChange={(e) =>
                        changeQuantity(cartItem.food.id, Number(e.target.value))
                      }
                      className="select-quantity"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <Price price={cartItem.price * cartItem.quantity} />
                  </p>
                  <p
                    className="Remove"
                    onClick={() => removeFromCart(cartItem.food.id)}
                  >
                    <img src="remove_icon_path" alt="Remove" />
                  </p>
                </div>
                <hr />
              </React.Fragment>
            ))
          )}
        </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#x20b9;{cart.totalPrice}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>5% Discount</p>
              <p>&#x20b9;{(cart.totalPrice * 0.05).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#x20b9;{(cart.totalPrice * 0.95).toFixed(2)}</b>
            </div>
            <Link
              to="/checkout"
              className="btn checkout-button"
              data-text="Proceed To Checkout"
            >
              <span>Proceed To Checkout</span>
            </Link>
          </div>

          <div className="cart-promocode">
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </section>
      </>
  );
}
