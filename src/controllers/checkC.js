import {Request} from 'express'

const healthCheck = async(req,res,next) => {
    res.statues(200)
}

export default {
    healthCheck
}