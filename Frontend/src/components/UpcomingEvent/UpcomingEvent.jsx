import "./UpcomingEvent.css"
const UpcomingEvent = () => {
  return (
    <section className="updates padding-5">
      <h3 className="subtitle">Recent Updates</h3>
      <h2 className="section-title">Upcoming Event</h2>
      <div className="updates-box">
        <div className="updates__item">
          <img src="/src/assets/img/event-1.jpg" alt="Updates image" />
          <h3 className="subtitle">Food, Flavour</h3>
          <h2>Flavour so good you’ll try to eat with your eyes.</h2>
          <div className="tag-date">16/01/2023</div>
        </div>
        <div className="updates__item">
          <img src="/src/assets/img/event-2.jpg" alt="Updates image" />
          <h3 className="subtitle">Healthy Food</h3>
          <h2>Flavour so good you’ll try to eat with your eyes.</h2>
          <div className="tag-date">05/01/2023</div>
        </div>
        <div className="updates__item">
          <img src="/src/assets/img/event-3.jpg" alt="Updates image" />
          <h3 className="subtitle">Recipie</h3>
          <h2>Flavour so good you’ll try to eat with your eyes.</h2>
          <div className="tag-date">29/12/2022</div>
        </div>
      </div>
      <button className="btn" data-text="You'll love it">
        <span>View Our Blog</span>
      </button>
    </section>
  );
};

export default UpcomingEvent;
