const express = require('express')
const router = express.Router()
const axios = require('axios')

const{requireSign,isAuth,isAdmin} = require('../controllers/auth')
const{userById} = require('../controllers/user')

// router.get('/secret/:userId',requireSign,isAuth,isAdmin,(req,res)=>{
//     res.status(200).send({
//         user:req.body
//     })
// })

router.param("userId",userById)

router.get('/getdata',async(req,res)=>{
        axios.get(
    'https://books.zoho.com/api/v3/organizations?organization_id=10234695',
    {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization":  'db36e02a50b57e081efe533a8a0f834b'
            }   
        }
  )
  .then((response) => {
       let data = response.data;
       res.send(
           data
       )
    },
    (error) => {
      var status = error.response.status
      res.send(error)
    }
  );
})

module.exports = router