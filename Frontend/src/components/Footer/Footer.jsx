import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer__links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About us</a>
          <a href="#chefs">Our Chefs</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="getInToch padding-2">
          <img src="./img/logo.svg" alt="BR TECH" />
          <p className="text">Restaurant St, Delicious City, Delhi 9578, IN</p>
          <a href="mailto:booking@grilli.com" className="text">
            booking@brtech.com
          </a>
          <a href="tel:+88123123456" className="text">
            Booking Request : +88-123-123456
          </a>
          <p className="text">Open : 09:00 am - 01:00 pm</p>
          <div className="footer-separator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h2 className="section-title">Get Offers</h2>
          <h3>
            Subscribe us & Get <span>25% Off.</span>
          </h3>
          <div className="subscribe">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="email"
              inputMode="email"
              placeholder="Your email"
              maxLength="70"
            />
            <button className="btn btn-secondary" data-text="Appreciated!">
              <span>Subscribe</span>
            </button>
          </div>
        </div>
        <div className="footer__links">
          <a href="https://www.facebook.com" target="_blank">
            Facebook
          </a>
          <a href="https://www.instagram.com" target="_blank">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank">
            Twitter
          </a>
          <a href="https://www.youtube.com" target="_blank">
            Youtube
          </a>
          <a href="https://www.google.com/maps" target="_blank">
            Google Maps
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
