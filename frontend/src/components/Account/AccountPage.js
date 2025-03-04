import React, { useEffect, useState } from "react";
import CardCarousel from "../Account/CardCarousel";
import "../Account/AccountPage.css";




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

        

       
      </div>
     
  
    </div>
   
  );
};

export default AccountPage;
