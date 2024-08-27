const express= require("express")
const {fetchCsv,search} =require('./controller')

const app = express()
const PORT = 30002;


app.get('/populate',async(req,res)=>{
    try {
        await fetchCsv();
        res.status(200).json({
            message:"data fetch",

        })
    } catch (error) {
        console.log("some error",error);
    }
})

app.post('/search',async(req,res)=>{
    try {
        // const {name, email, body,limit} = req.body
        await search(req.body);
        res.status(200).json({
            data:result,
            message:"data fetch",

        })
    } catch (error) {
        console.log("some error",error);
    }
})


app.listen(PORT,()=>{
    console.log(`server is up and running:::${PORT}`);
    
})