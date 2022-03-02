import React from "react";
import style from "../Estilos/Card.module.css"


export default function Card ({title, image, diets}) {
    return (
        <div>
            <div className={style.card}>
                <h3 className={style.tag}>{title}</h3>
                <img className={style.img} src={image} alt="Img not found" width="200px" height="200px"/>
                <div className={style.diet}>{diets?.map(el => <h5>{el}</h5>)}</div>    
            </div>
        </div>
        
          
    )
}