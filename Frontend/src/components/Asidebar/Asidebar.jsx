import "./Asidebar.css"

const Asidebar = () => {
  return (
    <>
      <aside>
        <div className="aside-close">
          <ion-icon name="close-circle-outline"></ion-icon>
        </div>
        <img src="./img/logo.svg" width="160" height="50" alt="Grilli Logo" />
        <div className="nav__items">
          <a href="#home" className="nav-items--active">
            <span>Home</span>
          </a>
          <a href="#menu">
            <span>Menus</span>
          </a>
          <a href="#about">
            <span>About Us</span>
          </a>
          <a href="#chefs">
            <span>Our Chefs</span>
          </a>
          <a href="#contact">
            <span>Contact</span>
          </a>
        </div>
        <h2>Visit Us</h2>
        <p>Restaurant St, Delicious City, Delhi 9578, IN</p>
        <p>Open: 9.30 am - 2.30pm</p>
        <p>booking@grilli.com</p>
        <div className="separator"></div>
        <h3 className="highlight">Booking Request</h3>
        <strong>
          <a href="tel:+88123123456">+88-123-123456</a>
        </strong>
      </aside>
      <div className="aside-overlay"></div>
    </>
  );
};

export default Asidebar;
