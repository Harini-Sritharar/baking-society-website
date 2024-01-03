import React from "react";
import Recipe from './Recipe';
import logo from '../assets/img/logo.png';
const HomePage = () => {
    return (
        <div className="main">
         
          <div className = "logo">
            <img src = {logo} alt = "logo"></img>
          </div>
      
            <div className="heading">
                <h1>Welcome to the Imperial Baking Society Website!</h1>
            </div>
            <div className="container">
              <Recipe/>

            </div>
        </div>
    )
}
export default HomePage;