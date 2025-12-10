import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import AvailableLoans from "../components/home/AvailableLoans";
import HowItWorks from "../components/home/HowItWorks";
import CustomerFeedback from "../components/home/CustomerFeedback";
import WhyPeopleChooseUs from "../components/home/WhyPeopleChooseUs";
import TourCalculator from "../components/home/TourCalculator";

export default function Home() {
    return (
        <div>
            <HeroBanner />
            <AvailableLoans />
            <WhyPeopleChooseUs />
            <TourCalculator />
            <HowItWorks />
            <CustomerFeedback />
        </div>
    );
}
