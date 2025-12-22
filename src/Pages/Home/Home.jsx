import React from "react";
import Hero from "../../Components/Hero";
import HowWorks from "../../Components/HowWorks";
import HomeCard from "../../Components/HomeCard";
import Feedback from "../../Components/Feedback";
import WhyChooseUs from "../../Components/WhyChooseUs";
import CTA from "../../Components/CTA";

const Home = () => {
  return (
    <div className="">
      <section>
        <Hero></Hero>
      </section>

      <HomeCard></HomeCard>

      <WhyChooseUs></WhyChooseUs>

      <Feedback></Feedback>

      <section>
        <HowWorks></HowWorks>
      </section>

      <CTA></CTA>
    </div>
  );
};

export default Home;
