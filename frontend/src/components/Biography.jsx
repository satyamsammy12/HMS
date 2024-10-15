import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="containers biography">
      <div className="banner">
        <img src={imageUrl} alt="about" />
      </div>
      <div className="banner">
        <p className="text-3xl">Biography</p>
        <h3 className="text-3xl">Who We Are</h3>
        <p>
          Welcome to Vihaan Hospital & Research Centre in Rewa, a beacon of
          healthcare excellence. Our state-of-the-art facility is dedicated to
          providing compassionate, comprehensive medical care. With a focus on
          innovation and research, we strive to offer the latest treatments and
          technologies, ensuring the best outcomes for our patients in a
          nurturing environment.
        </p>
        <p>
          Trust us to prioritize your health, offering the best treatments and
          care for your enduring well-being
        </p>
        <p>
          At Vihaan Hospital & Research Centre in Rewa, our professional
          excellence sets us apart. Our skilled team, leveraging cutting-edge
          research, is committed to delivering superior medical care. We pride
          ourselves on our holistic approach, ensuring each patient receives
          personalized, compassionate treatment. Here, excellence in healthcare
          is not just a goal; it’s our standard.
        </p>
        <p>Over 30+ Years Experience Doctor's</p>
      </div>
    </div>
  );
};

export default Biography;
