import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getClean } from "../Redux/Actions";
import { useEffect } from "react";
import style from '../Estilos/Details.module.css'


export default function Details(props){
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(()=> {
        dispatch(getDetail(id));
    }, [dispatch, id])

    useEffect(()=> {
      dispatch(getClean());
  }, [id])


    const myRecipe = useSelector ((state) => state.detail);
    console.log('MI RECETA:', myRecipe)

    return (
    <div className={style.container}>
      {
      myRecipe.map(el =>{
        return(
        <div>            
          <h1 className={style.title}>{el?.title}</h1>
          <img className={style.img} src= {el.image}/> 
          <h2>Spoonacular Score: {el?.score?el?.score:'no score'} </h2>
          <h2 >Health Score: {el?.healthScore} </h2>
          <h3>Type of diet: {el.diets}</h3>
          <h4>Summary: <div dangerouslySetInnerHTML={{ __html: el?.summary }}/></h4>
          <h4>Steps: <div dangerouslySetInnerHTML={{ __html:( el?.steps ? el?.steps : "Se desconocen los pasos a seguir") }}/></h4>
        </div>
        )
      }) 
      }
      <Link to= "/Home"><button className={style.btn}>Back to Home</button></Link>
    </div>
    )
}