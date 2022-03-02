const axios = require('axios');
const e = require('express');
const {Recipe, Diet } = require('../db');
require('dotenv').config()
const API_KEY = process.env.API_KEY

// bd699ae831ca4e068ea7f1c3258f8a54 

// 3aff5d187dca4083ae4397f20d594d56

// 6b8b021a8e444ba3b3455ae289dcfc54

// 892fb186d9cb42c585622f696481982a

// 2c81bd7d0e1143899ff74edf850a38ab

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    
    let paso1 = apiUrl.data.results.map(e =>{
        return{P_Instrucciones: e.analyzedInstructions[0]}
    })
    let paso2 = paso1[0].P_Instrucciones.steps.map(e => {
        return {passos: e.step}
    })
    let yFinal = paso2.map(e=>{
        return{yFinal: Object.values(e)}
    })
    let stepFnal= []
    yFinal.map(e => {stepFnal.push(e.yFinal)})

    const apiInfo = await apiUrl.data.results.map(el => {
        return {
            title: el.title.toUpperCase(),
            id: el.id,
            summary: el.summary,
            score: el.spoonacularScore,
            healthScore: el.healthScore,
            steps: el.analyzedInstructions.map(item =>{
                return(item.steps.map(item2 =>(item2.step)))
              }),
            image: el.image,
            diets: el.diets
        }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}


const joinInfo = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const dbInfoApi = dbInfo.map(el=> {
        return {    
        title:el.title.toUpperCase(),
        id:el.id,
        summary:el.summary,
        score:el.score,
        healthScore:el.healthScore,
        steps:el.steps,
        image:el.img?el.img:'https://i.blogs.es/87930e/comidas-ricas/840_560.jpg',
        diets:el.diets.map(el=>el.name)
        }
    })
    const allInfo = apiInfo.concat(dbInfoApi)


    
    return allInfo
}

// //----------------------------NAME----------------------------

const getFoodInfo = async(req, res) => {
    try {
        const { name } = req.query
        const info = await joinInfo()

        if(name) {
            var recipe = await info.filter(i=> i.title.toLowerCase().includes(name.toLowerCase()))
            recipe.length? res.status(200).json(recipe) : res.status(404).json({msg: "recipe not found"})
        } else {
            res.status(200).send(info)
        }
    } 
    
    catch (error) {
        console.log(error)
    }
}

// //----------------------------ID----------------------------

const findById = async(req, res) => {
    const {id} = req.params

    const info = await joinInfo()

    if (id) {
        var foodId = await info.filter(i =>i.id == id);
        foodId.length?
        res.status(200).send(foodId):
        res.status(404).send('recipe not found')
    }
}

// //----------------------------DIETS----------------------------

const getDiets = async (req, res) => {
    try {
         const tipos = ["gluten free", "dairy free", "paleolithic", "ketogenic", "lacto ovo vegetarian", "vegetarian", "vegan", "pescetarian", "primal", "fodmap friendly", "whole 30"]
    
          tipos.forEach(el => {
            try {
              if (el){ Diet.findOrCreate({
                where: { name: el }})}
            } catch (error) {
              console.log(error)
            }
              
          });
          const dietBd = await Diet.findAll();
          res.status(200).json(dietBd);
      } catch (error) {
          res.status(404).send('No se tiene respuesta a su solicitud' + error)
      }
}


// //----------------------------CREATE----------------------------

const createRecipe = async (req, res) => {
    const { title, summary, score, healthScore, steps, img, diets } = req.body
    const newRecipe = await Recipe.create({ title, summary, score, healthScore, steps, img })

    const diet = await Diet.findAll({
        where: {name: diets}
    })
    newRecipe.addDiet(diet)
    res.send('Recipe created succesfully')
}

module.exports = { getFoodInfo , findById, getDiets, createRecipe}