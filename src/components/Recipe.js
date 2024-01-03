import React from "react";
import myimage from '../assets/img/logo.png'
const Recipe = () => {
    return (
        <>
        <div className="card">
            <img src={myimage} alt="recipe"></img>
            <div className="info">
                <h2>Shortbread</h2>  
                <p>Vegetarian</p>    
            </div>
            <div className="recipe">
                <h2>Ingredients</h2>
                <ul>
                    <li> 50g sugar</li>
                    <li> 100g butter</li>
                    <li> 150g flour</li>
                </ul>
                <h2>Method</h2>
                <p>Preheat oven at 150 degrees. Cream butter and sugar together, and add in sifted flour. Roll and cut into fingers and bake for 10 mins.</p>
            </div>
        </div>
        </>
    )
}
export default Recipe;