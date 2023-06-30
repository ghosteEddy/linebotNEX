import checkC from '../controllers/checkC'

// import {} from '../controllers/checkC'
// const CheckC = require('../controllers/checkC')
const Router = require('express').Router

const router = Router()
router.get('/health',checkC.healthCheck)
export default router