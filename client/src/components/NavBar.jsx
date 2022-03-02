import React from "react"
import { Link } from 'react-router-dom'
import style from "../Estilos/NavBar.module.css"


export default function NavBar() {
    return (
        <nav className={style.bar}>  
               <div className={style.container}>
                    <div>
                        <Link to='/home'>
                            <button className={style.button}>Home</button>
                        </Link>
                    </div>

                    <div>
                        <Link to='/recipe'>
                            <button className={style.button2}>Create your own recipe</button>
                        </Link>
                    </div>
                </div>
        </nav>
    )
}