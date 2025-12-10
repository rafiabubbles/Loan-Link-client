import React, { useState, useEffect, useRef } from "react";

// স্ক্রলবার লুকানোর জন্য কাস্টম CSS
// বাস্তব অ্যাপ্লিকেশনে, এটি আপনার index.css বা একটি কাস্টম CSS ফাইলে থাকা উচিত।
// সুবিধার জন্য, আমরা এটিকে একটি <style> ট্যাগে রেন্ডার করার জন্য একটি কাস্টম কম্পোনেন্ট তৈরি করব।

const ScrollbarHideStyle = () => (
    <style jsx="true">{`
        /* Webkit-ভিত্তিক ব্রাউজার (Chrome, Safari) */
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

    // Banner background image URL (Change this to your actual image)
    const backgroundImageUrl = "https://images.unsplash.com/photo-1542838132-8418f731c34a?q=80&w=1974&auto=format&fit=crop";

    // **অটো-স্লাইড লজিক**
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const totalItems = feedbacks.length;
    // এটি নির্দেশ করে, একটি স্ক্রীনে কয়টি কার্ড দেখা যাবে (lg:w-1/3 মানে ডেস্কটপে 3টি)
    const itemsPerViewDesktop = 3;

    useEffect(() => {
        // স্ক্রোল ফাংশন
        const scrollNext = () => {
            if (carouselRef.current) {
                // বর্তমানে যে index-এ আছি, তার পরের index-এ যেতে চাই
                const nextIndex = (currentIndex + 1) % totalItems;
                setCurrentIndex(nextIndex);

                // কার্ডের প্রস্থ (Width) বের করা
                // ধরে নিলাম, সব কার্ডের প্রস্থ একই
                const itemWidth = carouselRef.current.children[0]?.offsetWidth || 0;

                // স্ক্রোল করার দূরত্ব
                // পরবর্তী কার্ডে স্ক্রোল করতে হবে
                // মোট আইটেম থেকে বর্তমান আইটেম বাদ দিয়ে পরের আইটেমের অবস্থানে যেতে হবে।
                const scrollDistance = nextIndex * itemWidth;

                carouselRef.current.scrollTo({
                    left: scrollDistance,
                    behavior: 'smooth' // মসৃণ স্লাইডের জন্য
                });

                // যদি শেষ কার্ডে চলে আসে, তাহলে প্রথম কার্ডে ফিরে যাওয়ার জন্য 3 সেকেন্ড বিরতি দিতে হবে।
                // যখন `nextIndex` 0 হবে, তখন এটি স্বয়ংক্রিয়ভাবে প্রথম অবস্থানে স্ক্রোল করবে।
            }
        };

        // প্রতি 3 সেকেন্ডে স্লাইড
        const intervalId = setInterval(scrollNext, 3000);

        // কম্পোনেন্ট আনমাউন্ট হলে ইন্টারভাল পরিষ্কার করুন
        return () => clearInterval(intervalId);
    }, [currentIndex, totalItems]); // currentIndex পরিবর্তন হলে useEffect আবার চলবে

    // **ক্যারোসেলের জন্য রেন্ডার অংশ**

    return (
        <section
            className="py-16 mt-8 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            {/* কাস্টম স্টাইল রেন্ডার করুন */}
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
                        ref={carouselRef} // ref যোগ করা হয়েছে
                        className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-4 scrollbar-hide"
                    >
                        {feedbacks.map((f, i) => (
                            <div
                                key={i}
                                // flex-none w-full: মোবাইল বা ছোট স্ক্রিনে পূর্ণ প্রস্থ
                                // md:w-1/2: মাঝারি স্ক্রিনে অর্ধেক প্রস্থ
                                // lg:w-1/3: বড় স্ক্রিনে এক-তৃতীয়াংশ প্রস্থ (প্রতি লাইনে 3টি দেখাবে)
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