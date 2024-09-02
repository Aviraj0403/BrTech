import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Price from "../../components/Price/Price";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import { useCart } from "../../hooks/useCart";
import { getById } from "../../services/foodService";
import "./FoodPage.css";
import NotFound from "../../components/NotFound/NotFound";

export default function FoodPage() {
  const [food, setFood] = useState(null); // Initialize as null for better conditional checks
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  useEffect(() => {
    getById(id)
      .then((response) => setFood(response))
      .catch((error) => {
        console.error("Error fetching food:", error);
        // Handle error case here, e.g., navigate to a different page or show an error message
      });
  }, [id]);

  // Check if food object is null or not
  if (food === null) {
    return <NotFound message="Food Not Found!" linkText="Back To Homepage" />;
  }

  return (
    <section className="food-section">
        <div class="food-container">
          <div class="food-image-wrapper">
            <img class="food-image" src={food.imageUrl} alt={food.name} />
          </div>
          <div class="food-details">
            <div class="food-header">
              <h1 class="food-name">{food.name}</h1>
              <span class="food-favorite">❤</span>
            </div>
            <div class="food-rating">
              <span class="rating">
                <StarRating stars={food.stars} size={25} />
              </span>
            </div>
            <div class="food-origins">
              {food.origins?.map((origin) => (
                <span key={origin} class="origin">
                  {origin}
                </span>
              ))}
            </div>
            <div class="food-tags">
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>
            <div class="food-cook-time">
              <span>
                Time to cook: <strong>{food.cookTime}</strong> minutes
              </span>
            </div>
            <div class="food-price">
              <Price price={food.price} />
            </div>
            <button class="add-to-cart" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>

    </section>
  );
}
