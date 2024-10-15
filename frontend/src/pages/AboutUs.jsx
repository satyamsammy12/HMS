import React from "react";
import Biography from "./../components/Biography";
import Hero from "./../components/Hero";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About | Vindhya Hospital And Research Center"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
