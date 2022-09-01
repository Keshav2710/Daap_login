const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const UsersModel = require('../Model/Users.js')

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
}

router.post('/checkaccounts', async (req, res) => {
    try {
        const accounts = req.body.account
        const userDetails = await UsersModel.findOne({ userID: accounts })
        if (userDetails !== null) {
            var obj = {}
            obj['account'] = userDetails.userID
            obj['id'] = userDetails.id
            res.json(obj)
        } else {
            res.status(204).json({
                status: 204,
                message: "Data Not Available"
            })
        }
    } catch (error) {
        res.json({
            message: err,
            status: "503 Service Unavailable"
        }, 503)
    }
})

router.post('/register', async (req, res) => {
    const restModal = new UsersModel({
        userID: req.body.accounts,
        Name: req.body.name,
        email: req.body.email,
        DOB: req.body.DOB
    })
    try {
        if (req.body.accounts !== "" && req.body.name !== "" && req.body.email !== "" && req.body.DOB !== "") {
            const userDetails = await UsersModel.findOne({ userID: req.body.accounts, email: req.body.email })
            if (userDetails === null) {
                const restModalSaved = await restModal.save()
                res.json(restModalSaved)
            } else {
                res.status(409).json({status:409,message:"Already Exists"})
            }
        } else {
            res.status(403).json({ status: 403, message: "no data available" })
        }
    } catch (err) {
        res.status(503).json({
            message: err,
            status: "503 Service Unavailable"
        })
    }
})


router.post('/token', async (req,res)=>{
    try{
        const userDetails = await UsersModel.findOne({userID:req.body.account})
        if(userDetails !== null){
            let obj = {}
            obj['name'] = userDetails.Name
            obj['id'] = userDetails._id
            obj['account'] = userDetails.userID
            obj['email'] = userDetails.email
            const token = generateAccessToken(obj)
            res.json({"access_token": token})
        }else {
            res.status(404).json({
                status: 404,
                message: "Data Not Available"
            })
        }
    }catch (err){
        res.status(503).json({
            message: err,
            status: 503
        })
    }
})

module.exports = router