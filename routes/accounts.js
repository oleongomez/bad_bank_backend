var express = require("express")
var router = express.Router()
var account = require("../src/domain/account")
var storage = require("../src/adapters/mongo_adapter")
const Account = require("../src/domain/account")

var adapters = require("../src/adapters/mongo_adapter")
var MongoStorageAdapter = adapters.MongoStorageAdapter

const url = 'mongodb://localhost:27017'

router.post("/add", function (req, res, next){
    var body =  req.body
    console.log('Creating an account with: ', body)
    var mongo_adapter = new MongoStorageAdapter(url)
    var {name, email, password} = {...req.body}
    var acc = new Account(name, email, password, mongo_adapter)
    acc.saveToStorage().then((value)=>{
        console.log("Saved then: "+ value)
        res.send(value)
    })
    
})

router.get("/data", function (req, res, next){
    var body = req.body
    console.log("Looking for :", body)
    res.send('NOT IMPLEMENTED')
})

router.get("/all_data", function (req, res, next){
    console.log("This is all data")
    var mongo_adapter = new MongoStorageAdapter(url)
    mongo_adapter.load_all().then(value => {
        res.send(value)
    })
    
})

router.delete('/', function(req, res, next){
    console.log('Deleting an account: ', req.body)
    res.send('NOT IMPLEMENTED')
})

module.exports = router