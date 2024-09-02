import "./FoodMenu.css";
import FoodItem from "../FoodItem/FoodItem";
import Tags from "../Tags/Tags";
const FoodMenu = ({ foods , tags }) => {
  return (
    <section className="menu padding-2" id="menu">
      <h3 className="subtitle over-slider">Special Selection</h3>
      <h2 className="section-title over-slider">Delicious Menu</h2>

      <Tags tags={tags} />

      {/* food items */}
      <FoodItem foods={foods} />
      {/* food items */}

      <p className="winter over-slider">
        **During winter daily from <b>7:00 pm</b> to <b>9:00 pm</b>
      </p>
      <button className="btn over-slider" data-text="View All Menu">
        <span>View All Menu</span>
      </button>

      <img
        src="/src/assets/img//shape-5.png"
        width="921"
        height="1036"
        loading="lazy"
        alt="shape"
        className="shape shape-2"
      />
      <img
        src="/src/assets/img//shape-6.png"
        width="700"
        height="800"
        loading="lazy"
        alt="shape"
        className="shape shape-3"
      />
    </section>
  );
};

export default FoodMenu;
