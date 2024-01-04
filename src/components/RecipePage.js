import React from "react";
import myimage from '../assets/img/logo.png'

/* Database */
import { db } from '../firebase.config';
/* Collection is to get access to a collection in the database, snapshot is for real time changes */
import { collection, onSnapshot } from 'firebase/firestore';
import { useState,useEffect } from 'react';
const RecipePage = () => {
    const [recipes,setRecipes] = useState([])
    const [form,setForm] = useState({
      title:"",
      desc:"",
      ingredients:[],
      steps:[]
    })
    const [popupActive,setPopupActive] = useState(false)
  /* Reference to the recipes collection */
  const recipesCollectionRef = collection(db,"recipes")

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(snapshot.docs.map(doc => {
        return {
          id:doc.id,
          viewing:false, // toggle
          ...doc.data()
        }
      }))
    })
  }, [])
    return (
        <>
        <div className="heading">
            <h1>Welcome to the Imperial Baking Society Website!</h1>
        </div>
        <button>Add Recipe</button>
        <div className="container">
        <div className='recipes'>
            {recipes.map((recipe,i) => (
            // <div className='recipe' key={recipe.id}>
                <div className="card">
                <img src={myimage} alt="recipe"></img>
                <div className="info">
                    <h2>{recipe.title}</h2>  
                    {/* allows us to render html tags */}
                    <p dangerouslySetInnerHTML={{ __html: recipe.desc}}></p>    
                </div>
                <div className="recipe">
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient,i) => (
                            <li key={i}>{ingredient}</li>
                        ))}
                    </ul>
                    <h2>Steps</h2>
                    <ol>
                        {recipe.steps.map((step,i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        //   </div>
        ))}
        </div>
        </div>
        </>
    )
}
export default RecipePage;