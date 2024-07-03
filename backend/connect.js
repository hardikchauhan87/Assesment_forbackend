var {MongoClient} = require('mongodb')
const URL= "mongodb://127.0.0.1:27017/"
const client= new MongoClient(URL)

async function connection(){
let result=await client.connect()
var db=result.db("apifetch")
return db.collection('data')

}

module.exports=connection