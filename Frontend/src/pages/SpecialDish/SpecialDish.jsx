import "./SpecialDish.css"
const SpecialDish = () =>{
    return(
        <section class="special-dish">
            <div class="special__image">
                <img src="/src/assets/img/special-dish-banner.jpg" alt="Special dish banner" />
            </div>
            <div class="special__info">
                <img src="/src/assets/img/badge-1.png" alt="Badge" />
                <h2 class="subtitle">Special Dish</h2>
                <h1 class="section-title">Lobster Tortellini</h1>
                <p class="paragraph">This is another dish that will amaze you from the first bite, we present the
                    Lobster Tortellini that integrates the most special and unique flavors of the house. We elaborate a
                    versatile dish with a subtle yet aesthetic innovation.</p>
                <div class="price">
                    <span>Rs.300.00</span>
                    <span>Rs.200.00</span>
                </div>
                <button class="btn" data-text="View All Menu">
                    <span>View All Menu</span>
                </button>
            </div>
        </section>
    )
}

export default SpecialDish;