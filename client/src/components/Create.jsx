import React from "react";
import { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import { getDiets, postRecipe } from "../Redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import style from "../Estilos/RecipeCreate.module.css"

function validate(input){
    let errors = {}
    if(!input.title || !/^[a-zA-Z]?\s?[a-zA-Z]/.test(input.title)){
        errors.title = 'Insert an alphabetic number'
    } 
    if(!input.summary){
        errors.summary = 'Summary required'
    } 
    if(!input.healthScore){
        errors.healthScore = 'Health score required'
    } 
    if(!input.score){
        errors.spoonacularScore = 'Score required'
    } 
    if(!input.steps){
        errors.steps = 'Steps required'
    } 
    if(input.diets.length <= 0){
        errors.diets = 'Diets required'
    } 
    return errors
}

export default function RecipeCreated() {
    const dispatch = useDispatch()
    const history = useHistory()
    const dietas = useSelector((state)=>state.diets)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({

        title: "",
        summary: "",
        healthScore: "",
        steps:"",
        score: "",
        img: "",
        diets:[],
    })

    function handleDelete(el){
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== el)
        })
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets,e.target.value] 
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if(Object.keys(errors).length >0) {
            alert("Complete the required fields");
        } else { 
            dispatch(postRecipe(input))
            alert("Recipe created!")
            setInput({
            title: "",
            summary: "",
            healthScore: "",
            steps:"",
            score: "",
            diets:[],
            img: ""
            })
            history.push('/home')
        }
        
    }

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch])

    useEffect(() => {
        setErrors(validate(input))
    }, [input]) // se refresca cuando se ejecuta el input



    
    return (

        <div className={style.container}>
            <h1 className={style.head}> CREATE YOUR OWN RECIPE </h1>
            
            <div>
                <form className={style.form} onSubmit={(e)=>handleSubmit(e)}> 

                
                <div className={style.divider}/>
                    <div className={style.input_container}>
                        <input
                        type= "text"
                        className={style.input}
                        value={input.title}
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        />
                        
                        {errors.title && (
                        <p className='error' className={style.err}>{errors.title}</p>
                        )}
                    </div>
                            
                    <div className={style.divider}/>
                    <div className={style.input_container}>
                        <input
                        type="text"
                        className={style.input}
                        value={input.summary}
                        name="summary"
                        placeholder="Summary"
                        onChange={handleChange}
                        />
                        {errors.summary && (
                        <p className='error' className={style.err}>{errors.summary}</p>
                        )}
                    </div>

                    <div className={style.divider}/>
                    <div className={style.input_container}>
                        <input
                        type="number"
                        className={style.input}
                        value={input.spoonacularScore}
                        name="score"
                        placeholder="SpoonacularScore"
                        onChange={handleChange}
                        />
                        {errors.spoonacularScore && (
                        <p className='error' className={style.err}>{errors.spoonacularScore}</p>
                        )}
                    </div>

                    <div className={style.divider}/>
                    <div className={style.input_container}>
                        <input
                        type="number"
                        className={style.input}
                        value={input.healthScore}
                        name="healthScore"
                        onChange={handleChange}
                        placeholder="HealthScore"
                        />
                        {errors.healthScore && (
                        <p className='error' className={style.err}>{errors.healthScore}</p>
                        )}
                    </div>

                    <div className={style.divider}/>
                    <div className={style.input_container}>     
                        <input
                        type="text"
                        className={style.input}
                        value={input.steps}
                        name="steps"
                        onChange={handleChange}
                        placeholder="Steps"
                        />
                        {errors.steps && (
                        <p className='error' className={style.err}>{errors.steps}</p>
                        )}
                    </div>

                    <div className={style.divider}/>
                    <div className={style.input_container}>   
                        <select onChange={(e) => handleSelect(e)}  name="Diets" className={style.input}>
                        {dietas.map((e) => (
                        <option value={e.name}>{e.name}</option>
                        ))}
                        </select>
                            
                        
                    </div>

                    <div className={style.divider}/>
                    <div className={style.input_container}> 
                        <input
                        type="text"
                        className={style.input}
                        value={input.image}
                        name="img"
                        onChange={handleChange}
                        placeholder="Image Url...(optional)"
                        />   
                    </div>



                    <div className={style.borrar}>
                    {input.diets.map(el => 
                        <div>
                            <p className={style.nombres}>{el}</p>
                            <button className={style.botonx} onClick={()=> handleDelete(el)}> X </button> 
                        </div>
                    )}
                    </div>
                


                    {
                        !errors.title && !errors.summary && !errors.score && !errors.healthScore && !errors.steps && !errors.diets
                        ? <button className={style.submit} type='Submit'>Create recipe</button>
                        : (<p className={style.warn}>Complete the required fields</p> )
                            
                    }

                    
                
                
                </form>

                <Link to= "/Home" ><button className={style.btn}>Back to home</button></Link>
            </div>
            
        </div>
    )
}


