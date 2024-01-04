import React from "react";
import myimage from '../assets/img/logo.png'

/* Database */
import { db } from '../firebase.config';
/* Collection is to get access to a collection in the database, snapshot is for real time changes */
import { collection, onSnapshot, doc, addDoc } from 'firebase/firestore';
import { useState,useEffect } from 'react';
const RecipePage = () => {
    const [recipes,setRecipes] = useState([])
    const [form,setForm] = useState({
      title:"",
      author:"",
      time:"",
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

  const handleSubmit = (e) => {
    e.preventDefault()

    // checking that all fields are filled out, and the form is valid
    if (
      !form.title.trim() ||
      !form.author.trim() ||
      !form.time.trim() ||
      form.ingredients.length === 0 ||
      form.steps.length === 0
    ) {
      alert("Please fill out all fields")
      return
    }
    addDoc(recipesCollectionRef,form)

    setForm({
      title:"",
      author:"",
      time:"",
      ingredients:[],
      steps:[]
    })
    setPopupActive(false)
  }

  const handleIngredient = (e,i) => {
    const ingredientsClone = [...form.ingredients]
    ingredientsClone[i] = e.target.value
    setForm({...form, ingredients:ingredientsClone})
  }

  const incrementIngredientCnt = () => {
    setForm({
      ...form,
      ingredients:[...form.ingredients,""] // add an empty string to the array so we can add another ingredient
    })
  }

  const handleSteps = (e,s) => {
    const stepsClone = [...form.steps]
    stepsClone[s] = e.target.value
    setForm({...form, steps:stepsClone})
  }
  
  const incrementStepCnt = () => {
    setForm({
      ...form,
      steps:[...form.steps,""] // add an empty string to the array so we can add another step
    })
  }

    return (
        <>
        <div className="heading">
            <h1>Welcome to the Imperial Baking Society Website!</h1>
        </div>
        <button onClick={()=>setPopupActive(!popupActive)}>Add Recipe</button>
        <div className="container">
        <div className='recipes'>
            {recipes.map((recipe,i) => (
                <div className="card">
                <img src={myimage} alt="recipe"></img>
                <div className="info">
                    <h2>{recipe.title}</h2> 
                    <h3> {recipe.time}</h3>
                    <p>-{recipe.author}</p>
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
        ))}
        </div>
        
        {popupActive && 
        <div className="popup">
          <div className="popup-inner">
            <h2> Add a new recipe </h2>
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Title</label>
                <input type="text"
                 value = {form.title} 
                 onChange={e => setForm({...form, title: e.target.value}) }/>
              </div>

              <div className="form-group">
                <label>Author</label>
                <input
                 type="text"
                 value = {form.author} 
                 onChange={e => setForm({...form, author: e.target.value}) }/>
              </div>

              <div className="form-group">
                <label>Recipe Time</label>
                <input
                 type="text"
                 value = {form.time} 
                 onChange={e => setForm({...form, time: e.target.value}) }/>
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                {
                form.ingredients.map((ingredient,i) => (
                  <input type="text"
                  key = {i}
                  value = {ingredient} 
                  onChange={e => handleIngredient(e,i)}/>
                ))
                }
                <button type="button" onClick={incrementIngredientCnt}>Add Ingredient</button>
              </div>

              <div className="form-group">
                <label>Steps</label>
                {
                form.steps.map((step,s) => (
                  <input type="text"
                  key = {s}
                  value = {step} 
                  onChange={e => handleSteps(e,s)}/>
                ))
                }
                <button type="button" onClick={incrementStepCnt}>Add Step</button>
              </div>
              <div className="buttons">
                <button type="submit">Submit Recipe</button>
                <button type ="button" onClick={()=>setPopupActive(false)}>Cancel</button>
                </div>
            </form>
          </div>
        </div>}
        </div>
        </>
    )
}
export default RecipePage;