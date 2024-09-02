import "./OffersPage.css"
const Offers = () =>{
  return(
    <section class="services padding-2" id="chefs">
            <h3 class="subtitle">Flavors For Royalty</h3>
            <h2 class="section-title">We Offer Top Notch</h2>
            <p class="paragraph">The best social network is a table full of good food and surrounded by people you love.
                We cook with love so you can eat with a conscience.</p>
            <div class="services-box">
                <div class="service">
                    <picture>
                        <img src="/src/assets/img/service-1.jpg" alt="Breakfast" />
                    </picture>
                    <h2>Breakfast</h2>
                    <button>View Menu</button>
                </div>
                <div class="service">
                    <picture>
                        <img src="/src/assets/img/service-2.jpg" alt="Breakfast" />
                    </picture>
                    <h2>Appetizers</h2>
                    <button>View Menu</button>
                </div>
                <div class="service">
                    <picture>
                        <img src="/src/assets/img/service-3.jpg" alt="Breakfast" />
                    </picture>
                    <h2>Drinks</h2>
                    <button>View Menu</button>
                </div>
            </div>
        </section>
  )
}

export default Offers;