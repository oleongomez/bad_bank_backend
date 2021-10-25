var express = require("express")
var router = express.Router()


router.post("/add", function (req, res, next){
    var body =  req.body
    console.log('Creating an account with: ', body)
    res.send('NOT IMPLEMENTED')
})

router.get("/data", function (req, res, next){
    var body = req.body
    console.log("Looking for :", body)
    res.send('NOT IMPLEMENTED')
})

router.get("/all_data", function (req, res, next){
    console.log("This is all data")
    res.send('NOT IMPLEMENTED')
})

router.delete('/', function(req, res, next){
    console.log('Deleting an account: ', req.body)
    res.send('NOT IMPLEMENTED')
})

module.exports = router