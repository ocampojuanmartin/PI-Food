const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { getFoodInfo , findById, getDiets , createRecipe } = require('./controller')

const router = Router();


router.get('/recipes', getFoodInfo )
router.get('/recipes/:id', findById)
router.get('/types', getDiets)
router.post('/recipe', createRecipe)

module.exports = router;
