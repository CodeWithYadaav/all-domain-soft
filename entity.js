const {DataTypes} =require('sequelize');
const sequelize = require('./db')


const User = sequelize.define('User',{

    postId:{
        type:DataTypes.STRING,
        defaultValue:"No",
         allowNull:false,
        },
        
        id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
    },

    name:{
        type:DataTypes.STRING,
         allowNull:true
    },
    email:{
        type:DataTypes.STRING,
         allowNull:true
    },
    body:{
        type:DataTypes.STRING,
         allowNull:true
    },
    
    },
    
    {
        tableName:"users",
        timeStamp:false
    })


sequelize.sync({alter:true}).then(()=>{
    console.log("model created");
}).catch((err)=>console.log("error while creating table:",err)
)

module.exports=User

// {
//     postId: 18,
//     id: 86,
//     name: 'suscipit est sunt vel illum sint',
//     email: 'Jacquelyn@krista.info',
//     body: 'eum culpa debitis sint\n' +
//       'eaque quia magni laudantium qui neque voluptas\n' +
//       'voluptatem qui molestiae vel earum est ratione excepturi\n' +
//       'sit aut explicabo et repudiandae ut perspiciatis'
//   },