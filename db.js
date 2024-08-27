const {Sequelize}=require('sequelize')

const sequelize = new Sequelize('assignment','root','admin123',{
    host:"localhost",
    dialect:'mysql'
})



sequelize.authenticate()
.then(()=>{
    console.log("conection successful");    
})
.catch(err=>{
    console.log("some error while connect to database::",err);
})


module.exports=sequelize