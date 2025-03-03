import React, { useEffect, useState } from "react";
import CardCarousel from "../Account/CardCarousel";
import "../Account/AccountPage.css";
import HeightChart from "../Chart/HeightChart";
import WeightChart from "../Chart/WeightChart";
import HeadDiameterChart from "../Chart/HeadDiameterChart";
import ToothChart from "../Chart/ToothChart";


const AccountPage = () => {
  const [userId, setUserId] = useState(null);

  // Retrieve userId from localStorage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));  // Parse to integer
    }
  }, []);

  // Return loading state if userId is not yet set
  if (userId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-page">
     
      <div className="bgimg">
        {/* Card Carousel */}
        <div className="card-carousel-container">
          <CardCarousel />
        </div>

        {/* Height Chart */}
        <div className="height-chart-container">
          {/* Pass the userId to the HeightChart component */}
          <HeightChart userId={userId} />
        </div>

        <div className="weight-chart-container">
          {/* Pass the userId to the HeightChart component */}
          <WeightChart userId={userId} />
        </div>

        <div className="head-diameter-chart-container">
          {/* Pass the userId to the HeightChart component */}
          <HeadDiameterChart userId={userId} />
        </div>

        <div className="tooth-chart-container">
          {/* Pass the userId to the HeightChart component */}
          <ToothChart userId={userId} />
        </div>
      </div>
      <footer className="footer">
    BabyGrowth 2024 © Developed by Buddhi Dassanayake
  </footer>
  
    </div>
   
  );
};

export default AccountPage;
