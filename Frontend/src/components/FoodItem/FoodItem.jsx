import Price from "../Price/Price";
import { Link } from "react-router-dom";
import "./FoodItem.css"
const FoodItem = ({ foods }) => {
  return (
    <div className="menu-box over-slider">
      {foods.map((item) => {
        return (
          <Link to={`/food/${item.id}`} key={item.id} className="menu-item">
            <img src={item.imageUrl} alt={item.name} />
            <div className="menu__info">
              <div className="menu__info-top">
                <h2>{item.name}</h2>
                <div className="tag">Seasonal</div>
                <span></span>
                <h3>
                  <Price price={item.price} />
                </h3>
              </div>
              <p>
                Tomatoes, green bell pepper, sliced cucumber onion, olives, and
                feta cheese.
              </p>
              <p>
                Ingredients : 
              </p>
              <Link to="/" className="btn btn-add-cart" data-text="Add to Cart">
                <span>Add to Cart</span>
              </Link>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FoodItem;
