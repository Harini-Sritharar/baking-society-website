import myimage from '../assets/img/logo.png'

const RecipeCard = ({recipe}) => {
    return (
        <div className="card">
            <img src={myimage} alt="recipe"></img>
            <div className="info">
                <h2>{recipe.title}</h2> 
                <br/>
                <h3> Time : {recipe.time}</h3>
                <p>Submitted by {recipe.author}</p>
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
    )
    
}

export default RecipeCard;