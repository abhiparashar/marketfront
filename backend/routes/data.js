const express = require('express')
const router = express.Router()
const axios = require('axios')

const org_id = process.env.ORGANIZATION_ID
const authorization = process.env.AUTHORIZATION

router.get('/getdata',async(req,res)=>{
        axios.get(
    `https://books.zoho.com/api/v3/organizations?organization_id=${org_id}`,
    {headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization":  `${authorization}`
            }   
        }
  )
  .then((response) => {
       let data = response.data.organizations;
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