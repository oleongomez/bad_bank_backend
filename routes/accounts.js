var express = require("express")
var router = express.Router()
var account = require("../src/domain/account")
var storage = require("../src/adapters/mongo_adapter")
const Account = require("../src/domain/account")

var adapters = require("../src/adapters/mongo_adapter")
var MongoStorageAdapter = adapters.MongoStorageAdapter

const url = 'mongodb://accounts:bXkIFbmGRxF4hjixK7A@54.151.63.111:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=accounts&authMechanism=SCRAM-SHA-256&3t.uriVersion=3&3t.connection.name=54.151.63.111&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true'
router.post("/add", function (req, res, next){
    var body =  req.body
    console.log('Creating an account with: ', body)
    var mongo_adapter = new MongoStorageAdapter(url)
    var {unique_id, name, email} = {...req.body}
    var acc = new Account(unique_id, name, email, mongo_adapter)
    acc.saveToStorage().then((value)=>{
        console.log("Saved then: "+ value)
        res.send(value)
    })
    
})

router.post("/data", function (req, res, next){
    var body = req.body
    console.log("Looking for :", body)
    var {unique_id, email} = {...req.body}
    var mongo_adapter = new MongoStorageAdapter(url)
    var acc = new Account(unique_id, '', email, mongo_adapter)
    acc.loadFromStorage().then((value)=>{
        console.log("Loaded Account: ",value)
        res.send(value)
    })
})

router.post("/update_balance", function (req, res, next){
    let {unique_id, email, amount} = {...req.body}
    console.log(unique_id, email, amount)
    var mongo_adapter = new MongoStorageAdapter(url)
    var acc = new Account(unique_id, null, email, mongo_adapter)
    let result = acc.updateBalance(amount).then((value)=>{
        console.log("Updated account:",value)
        res.send(value)
    })
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