import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero containers">
      <div className="banner">
        <h1 className="font-bold">{title}</h1>

        <p>
          "At Vihaan Hospital & Research Centre, we offer comprehensive health
          treatment services tailored for you and your family's needs, ensuring
          compassionate care with state-of-the-art facilities in a welcoming
          environment."
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="Hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
