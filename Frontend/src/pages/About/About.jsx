import "./About.css"
const About = () =>{
    return(
        <section class="about padding-2" id="about">
            <div class="about__info">
                <h3 class="subtitle">Our Story</h3>
                <h2 class="section-title">Every Flavor Tells a Story</h2>
                <p class="paragraph"> challenges the boundaries of cuisine by drawing its influences from the
                    culinary roots of our team members. We combine traditional and innovative techniques to create
                    unique offerings using local ingredients in all of its dishes.  is based on hospitality with
                    our staff's commitment to provide you with a memorable experience every time you walk through the
                    door.</p>
                <h3 class="highlight">Book Through Call</h3>
                <strong>+80 (400) 123 4567</strong>
                <button class="btn" data-text="Read more">
                    <span>Read more</span>
                </button>
            </div>
            <div class="about__image">
                <div class="badge">
                    <img src="/src/assets/img/badge-2.png" alt="About badge" />
                    <img src="/src/assets/img/badge-2-bg.png" alt="About badge background" />
                </div>
            </div>
        </section>
    )
}

export default About;