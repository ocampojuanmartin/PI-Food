import React from "react";
import { Link } from 'react-router-dom';
import style from "../Estilos/Landing.module.css"

export default function LandingPage (){
    return(
        <div className={style.container}>
            <h1 className={style.btn2}> WELCOME </h1>
            <Link to = '/home'>
                <button className={style.btn1}>Enter</button>

            </Link>
        
        </div>
    )
}