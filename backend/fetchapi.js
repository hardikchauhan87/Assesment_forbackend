const Connection = require('./connect');
const express = require('express')
const app=express()

app.use(express.json())
const cors = require('cors');
const axios = require('axios');
app.use(cors())

async function getPost() {
    const apidata = await fetch("https://api.wazirx.com/api/v2/tickers");
    const response = await apidata.json();
    let array=[]
    for(let i=0;i<10;i++)
    { 
        const {name,last,buy,sell,volume,base_unit}=response[Object.keys(response)[i]]
        const obj={name,last,buy,sell,volume,base_unit}
        array=[...array,obj]
    }
   
    return array
}
app.post("/Insert",async function(req,resp){
    const data=await getPost()
    console.log(data)
    const collection=await Connection()
    const response=await collection.insertMany(data)
    resp.send(response)
    resp.end()
})
app.get("/Fetch",async function(req,resp){
    const collection=await Connection()
    const response=await collection.find({}).toArray()
    resp.send(response)
    resp.end()
})


//app.listen(PORT, async () => {
//    console.log(`Server is running on port ${PORT}`);
//
//    // Simulate a POST request to /Insert
//    try {
//        const response = await axios.post(`http://localhost:${PORT}/Insert`);
//        console.log('POST /Insert response:', response.data);
//    } catch (error) {
//        console.error('Error making POST request:', error);
//    }}
 app.listen(3010)
 