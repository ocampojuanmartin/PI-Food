const initialState = {
    recipes : [],
    allRecipes : [],
    diets: [],
    detail: []
}


function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
        }
        
        case 'GET_RECIPE_NAME':
            return{
                ...state,
                recipes: action.payload
        }

        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
        }

        case 'ORDER_NAME':
            let order = [...state.allRecipes]
            const arr = action.payload === 'asc' ?
            order.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1
                }
                if (b.title > a.title) {
                    return -1
                }
                return 0
            }) :
            order.sort(function (a, b) {
                if (a.title > b.title) {
                    return -1
                }
                if (b.title > a.title) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: action.payload === 'all' ? state.allRecipes : arr,
        }


        case 'FILTER_BY_SCORE':
            let score = [...state.allRecipes] 
            const orderScore = action.payload === "asc" ?
            score.sort(function(a, b){
                if (a.healthScore > b.healthScore) {
                    return 1
                }
                if (b.healthScore > a.healthScore) {
                    return -1
                }
                return 0
            }) :
            score.sort(function(a, b){
                if (a.healthScore > b.healthScore) {
                    return -1
                }
                if (b.healthScore > a.healthScore) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                recipes: action.payload === 'all' ? state.allRecipes : orderScore,
        }

        case 'FILTER_BY_DIET':
            let allRecipes2 = state.allRecipes
            let dietsFiltered = 
             action.payload?.includes("all")
                ? allRecipes2
                : allRecipes2?.filter((el) => el.diets?.includes(action.payload)); 
                console.log(dietsFiltered)
                
      
            return {
              ...state,
              recipes: dietsFiltered, 
        }

        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
        }

        case "GET_CLEAN":
            return {
                ...state,
                detail: []
        }

        case 'POST_RECIPE':
        return{
            ...state,
        }
        
        default:
            return state
    }

}

export default rootReducer