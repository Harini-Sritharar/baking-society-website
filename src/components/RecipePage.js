import React from "react";
import RecipeCard from './RecipeCard'

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
      ingredients:[""],
      steps:[""]
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
      alert("One or more fields are empty! Please fill out all fields before submitting.")
      return
    }
    alert("Recipe submitted! Thank you for your contribution.")
    addDoc(recipesCollectionRef,form)

    resetForm()
    setPopupActive(false)
  }

  const resetForm = () => {
    setForm({
      title:"",
      author:"",
      time:"",
      ingredients:[""],
      steps:[""]
    })
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
        <button class = "add" onClick={() => setPopupActive(!popupActive)}>Add Recipe</button>
        <div className="container">
        <div className='recipes'>
            {recipes.map((recipe) => (
              <RecipeCard recipe={recipe}/>
        ))}
        </div>
        
        {popupActive && 
        <div className="popup">
          <div className="popup-inner">
            <h2> Submit your recipe! </h2>
            <button type ="button" class ="cancel" 
            onClick={() => {
            resetForm()
            setPopupActive(false)
            }}>
            X</button>
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
                <button type="button" onClick={incrementIngredientCnt}>+</button>
                {
                form.ingredients.map((ingredient,i) => (
                  <input type="text"
                  placeholder="Enter an ingredient and press + to add more"
                  key = {i}
                  value = {ingredient} 
                  onChange={e => handleIngredient(e,i)}/>
                ))
                }
              </div>

              <div className="form-group">
                <label>Steps</label>
                <button type="button" onClick={incrementStepCnt}>+</button>
                {
                form.steps.map((step,s) => (
                  <input type="text"
                  placeholder="Enter a step and press + to add more"

                  key = {s}
                  value = {step} 
                  onChange={e => handleSteps(e,s)}/>
                ))
                }
              </div>
              <div className="buttons">
                <button type="submit" class = "submit">Submit</button>
                </div>
            </form>
          </div>
        </div>}
        </div>
        </>
    )
}
export default RecipePage;