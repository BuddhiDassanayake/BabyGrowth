import React, { useEffect, useState } from "react";
import CardCarousel from "../Account/CardCarousel";
import "../Account/AccountPage.css";
import HeightChart from "../Chart/HeightChart";
import WeightChart from "../Chart/WeightChart";
import HeadDiameterChart from "../Chart/HeadDiameterChart";



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
        <div className="charts">
        <h2>Growth Charts</h2>
        <p className="description-baby">Track your baby’s growth with adorable charts, making every tiny change a big milestone!</p>
        <div className="chart-container">
        <HeadDiameterChart userId={userId} />
          <WeightChart userId={userId} />
          <HeightChart userId={userId} />
          
        </div>
      </div>

      
        

       
      </div>
     
  
    </div>
   
  );
};

export default AccountPage;
