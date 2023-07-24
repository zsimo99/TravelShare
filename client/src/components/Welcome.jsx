import React from "react";

const Welcome = () => {
  return (
    <div className="text-center md:text-start pb-10">
      <h1 className="text-xl md:text-2xl xl:text-3xl text-secondary-100 mb-4">
        Welcome to TravelShare!
      </h1>
      <p className="text-sm font-semibold md:max-w-[450px] leading-6">
        Share your wanderlust and connect with a community of passionate
        travelers! TravelShare is the perfect platform to inspire others with
        your exciting travel stories, discover hidden gems, and immerse yourself
        in diverse cultures. Share your recommendations and engage with fellow
        adventurers as you embark on a journey of exploration and friendship.
        Join us today and let your adventures unfold!{" "}
      </p>
      <p className="font-bold text-secondary-300 text-xl mt-4 text-end">
        Bon voyage!
      </p>
      <p className="text-xl">
        Made By:{" "}
        <span className="text-tertiary-300 font-bold cursor-pointer underline">
          <a href="https://github.com/zsimo99" target="_blank" rel="noreferrer">
            Mohamed Zoraa
          </a>
        </span>
      </p>
    </div>
  );
};

export default Welcome;
