const axios=require('axios')
const csvParser=require('csv-parser')
const User = require('./entity')


async function fetchCsv(){
    try {
        const result=[];
        //https://jsonplaceholder.typicode.com/comments
        //giving me only [{},{}]
        // const comments= await axios.get('https://jsonplaceholder.typicode.com/comments');
        // //below will give csv file
        // const response = await axios.get('http://cfte.mbwebportal.com/deepak/csvdata.csv',{
        //     responseType:"stream"
        // })
        //


        const [promise1,promise2] = await Promise.all([axios.get("https://jsonplaceholder.typicode.com/comments"),axios.get('http://cfte.mbwebportal.com/deepak/csvdata.csv',{
            responseType:"stream"
        })])
        //here above https://jsonplaceholder.typicode.com/comments gives me id and postId in integer while  other 
        //http://cfte.mbwebportal.com/deepak/csvdata.csv give me id in string and postid is undefined so saving data in in db for second api call as dataType will conflict in my entity 
        console.log("promise1111:",promise1,"promiseesss2:::::",promise2);
        

       await new Promise((resolve,reject)=>{
            promise2.data
            .pipe(csvParser())
            .on('data',(row)=>{
                result.push({
                        postId: row.postId,
                        id: row.id,
                        name: row.name,
                        email: row.email,
                        body:row.body
                })

            })
            .on('end',resolve)
            .on('error',reject)
        })
        console.log("result:::",result);
        
        await User.bulkCreate(result)
        // console.log("comments",comments);
        
    } catch (error) {
    console.log("getting error while insert data in table:",error);
            
    }
}


async function search(data){
    try {
        const {name, email, body,limit} = data
        if(!name||!email||!body||!limit){
            throw new Error("Please provide the payload ")
        }
    
           const result= await User.findOne({
                where:{
                    name,
                    email,
                    body
                },
                limit,
                raw:true
            })
            return result
    } catch (error) {
        console.log("error",error);
        
    }
}

module.exports={fetchCsv,search}