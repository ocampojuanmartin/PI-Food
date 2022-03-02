import axios from 'axios'

export function getRecipes () {
    return async function (dispatch) { // despacha la info
        const infoBack = await axios.get('http://localhost:3001/recipes') // me traigo el back
       
        return dispatch ({
            type: 'GET_RECIPES',
            payload: infoBack.data
            
        })
        
    }
}

export function getDetail(id) {
    return async function (dispatch){
      try {
        var json = await axios.get("http://localhost:3001/recipes/" + id);
        return dispatch({
          type: "GET_DETAIL",
          payload: json.data
        })
      }
      catch(error) {
        console.log(error)
      }
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_NAME',
        payload
    }
}

export function filterByScore(payload) {
  return {
  type: "FILTER_BY_SCORE",
  payload,
   }
}


export function getRecipeName(name){
  return async function (dispatch){ // hacer con promises
      try  {
          var json = await axios.get ('http://localhost:3001/recipes?name=' + name)
          return dispatch({
              type: 'GET_RECIPE_NAME',
              payload: json.data  // lo que devuelve la ruta de la linea 33
          })
      } catch (error) {
          console.log(error)
      }
  }
}



export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: 'GET_DIETS',
      payload: json.data,
    })
  }
}

export function filterRecipesByDiet (payload){
  return {
  type: 'FILTER_BY_DIET',
  payload,
   }
}

export function postRecipe (payload){
  return async function (){
    const data = await axios.post("http://localhost:3001/recipe", payload)
    return data
  }
 
}

export function getClean (){
  return {
    type: "GET_CLEAN",
  }
}
