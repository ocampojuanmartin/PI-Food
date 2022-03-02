import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getRecipes , getDiets, filterRecipesByDiet, orderByName, filterByScore} from '../Redux/Actions'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar.jsx'
import style from "../Estilos/Home.module.css"

export default function Home (){

    const dispatch = useDispatch()
    const [orden, setOrden]= useState('')
    const [orden2, setOrden2]= useState('')
    const allRecipes = useSelector((state) => state.recipes)
    const diets = useSelector((state) => state.diets)

    const [currentPage, setCurrentPage] = useState(1) // guarda la pagina actual en un estado local y una const que setea la pagina actual. el 1 es para que arranque de la pag 1
    const [recipesPerPage, setRecipesPerPage] = useState(9) // guarda 9 recetas por pagina
    const indexOfLastRecipe = currentPage * recipesPerPage // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe , indexOfLastRecipe)
    


    const paginado= (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getRecipes())
    },[dispatch])

    useEffect (()=>{
        dispatch(getDiets())
    },[dispatch])


    function handleClick(e){
        e.preventDefault()
        dispatch(getRecipes())
    }

    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSort2(e) {
        e.preventDefault();
        dispatch(filterByScore(e.target.value))
        setCurrentPage(1);
        setOrden2(`Ordenado ${e.target.value}`)

    }

    function handleFilterDiet(e){
        e.preventDefault()
         dispatch(filterRecipesByDiet(e.target.value))
         setCurrentPage(1)
    }

    return (
        <div className={style.home}>
            
            <button onClick={e => {handleClick(e)}} className={style.btn}>RELOAD RECIPES</button>
            <div>
                <div className={style.box1}>
                <label htmlFor='select' className={style.word}> FILTER BY:  </label>
                    <select onChange={e => handleSort(e)}>
                        <option value= "all">All</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                    </select>
                </div>

                <div className={style.box3}>
                    <select onChange={(e) => handleSort2(e)}>
                        <option value= "all">All</option>
                        <option value='asc'>Lowest score</option>
                        <option value='desc'>Highest score</option>
                    </select>
                </div>

                <div className={style.box2}>
                <select onChange={(e) => handleFilterDiet(e)}  name="Diets">
                    {diets?.map((e) => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                    </select>
                </div>

                <div>
                <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                />
                <SearchBar/>
                </div>
                <div className={style.cards}>
                    {
                        currentRecipes?.map(el =>
                            (<div >
                                <Link to={'/recipes/' + el.id}>
                                    <Card  className={style.carta}
                                    title={el.title} 
                                    image={el.image?el.image:el.img} 
                                    diets = {el.diets}
                                    key = {el.id}
                                    id = {el.id}
                                    />
                                </Link>
                            </div>
                            )  
                        )
                    }
                </div>
            </div>
        </div>
    )
}