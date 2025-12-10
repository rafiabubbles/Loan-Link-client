import React, { useState, useEffect, useRef } from "react";



const ScrollbarHideStyle = () => (
    <style jsx="true">{`
        
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* IE and Edge */
        .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
    `}</style>
);

export default function CustomerFeedback() {
    // static data for feedback
    const feedbacks = [
        { name: "Amina", text: "Fast and easy process. I got my loan disbursed within 24 hours. Highly recommended!", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" }, // Placeholder image for user
        { name: "Jamal Hossain", text: "Helpful managers and quick approval. The interest rates were very competitive compared to other banks.", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=80&q=80" },
        { name: "Farida Begum", text: "Excellent customer service! They guided me through every step of the verification process.", image: "https://images.unsplash.com/photo-1605643097366-2ebbc7aeb96b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { name: "Nayeem Khan", text: "The online application was seamless. Truly a modern and efficient lending platform.", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=80&q=80" },
    ];


    const backgroundImageUrl = "https://images.unsplash.com/photo-1542838132-8418f731c34a?q=80&w=1974&auto=format&fit=crop";

    // **Auto Slide Logic**
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const totalItems = feedbacks.length;
    // card provide 3 items per view on desktop
    const itemsPerViewDesktop = 3;

    useEffect(() => {
        // scroll funtion
        const scrollNext = () => {
            if (carouselRef.current) {
                //next index calculation
                const nextIndex = (currentIndex + 1) % totalItems;
                setCurrentIndex(nextIndex);

                const itemWidth = carouselRef.current.children[0]?.offsetWidth || 0;


                const scrollDistance = nextIndex * itemWidth;

                carouselRef.current.scrollTo({
                    left: scrollDistance,
                    behavior: 'smooth' // for smooth scrolling
                });


            }
        };

        // 3 seconds scroll interval
        const intervalId = setInterval(scrollNext, 3000);

        // cleanup function
        return () => clearInterval(intervalId);
    }, [currentIndex, totalItems]); // dependency array



    return (
        <section
            className="py-16 mt-8 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            {/* custom style render*/}
            <ScrollbarHideStyle />

            {/* Overlay to darken the image and make text readable */}
            <div className="bg-blue-900/80 py-16">

                <div className="max-w-6xl mx-auto px-6 text-white text-center">

                    {/* Heading: Matches AvailableLoans/HowItWorks styling */}
                    <h2 className="text-4xl font-extrabold mb-10 text-white">
                        Customer Feedback
                    </h2>

                    {/* Carousel Container */}
                    <div
                        ref={carouselRef} // ref for scrolling
                        className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-4 scrollbar-hide"
                    >
                        {feedbacks.map((f, i) => (
                            <div
                                key={i}

                                className="flex-none w-full md:w-1/2 lg:w-1/3 p-6 bg-white shadow-xl rounded-lg text-gray-800 snap-start"
                            >
                                {/* Rating Stars */}
                                <div className="flex justify-center mb-3 text-yellow-500 text-xl">
                                    <span className="mr-1">★</span>
                                    <span className="mr-1">★</span>
                                    <span className="mr-1">★</span>
                                    <span className="mr-1">★</span>
                                    <span>★</span>
                                </div>

                                {/* Feedback Text */}
                                <p className="italic mb-4 text-lg">“{f.text}”</p>

                                {/* User Info (Image and Name) */}
                                <div className="flex items-center justify-center pt-3 border-t border-gray-200">
                                    <img
                                        src={f.image || "https://via.placeholder.com/40"}
                                        alt={f.name}
                                        className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-green-500"
                                    />
                                    <p className="font-semibold text-gray-900">— {f.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}