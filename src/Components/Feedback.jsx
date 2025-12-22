import React from "react";
import FeedbackCard from "./FeedbackCard";

const feedbackData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    message:
      "LoanLink made getting my business loan incredibly easy. The process was transparent and fast!",
    rating: 5,
    avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    message:
      "I got my home renovation loan approved within days. Excellent service and competitive rates!",
    rating: 5,
    avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Student",
    message:
      "The education loan helped me pursue my dreams. Thank you LoanLink for making it possible!",
    rating: 5,
    avatar: "https://img.daisyui.com/images/profile/demo/4@94.webp",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Entrepreneur",
    message:
      "Quick approval, great rates, and amazing customer support. Highly recommend LoanLink!",
    rating: 4,
    avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Medical Professional",
    message:
      "When I needed an emergency loan, LoanLink was there for me. Fast and reliable service!",
    rating: 5,
    avatar: "https://img.daisyui.com/images/profile/demo/1@94.webp",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Car Buyer",
    message:
      "Got my car loan approved with minimal hassle. The whole process was smooth and efficient.",
    rating: 4,
    avatar: "https://img.daisyui.com/images/profile/demo/6@94.webp",
  },
];

const Feedback = () => {
  return (
    <section className="py-24 overflow-hidden jost">
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            What Our Clients Say
          </h2>
          <p className="text-base-content/60 mt-4 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about their experience with LoanLink.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-base-100 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-base-100 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex animate-infinite-scroll hover:pause-animation">
          {/* First set of cards */}
          {feedbackData.map((feedback) => (
            <FeedbackCard key={`first-${feedback.id}`} feedback={feedback} />
          ))}
          {/* Duplicate set for seamless loop */}
          {feedbackData.map((feedback) => (
            <FeedbackCard key={`second-${feedback.id}`} feedback={feedback} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
