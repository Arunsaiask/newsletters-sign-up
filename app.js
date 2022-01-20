


const express = require('express');
const request = require("request");
const https = require("https");
const { urlToHttpOptions } = require('url');
const { METHODS } = require('http');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(express.static('public'))



app.get("/",function(req,res){

  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const mail = req.body.email;
   
    const data = {
      members: [ 
        {
       email_address : mail,
       status: "subscribed",
       merge_fields : {
         FNAME : fname,
         LNAME : lname ,
       }

      }
    ]
    };
  var jsondata = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/5bd12c9395"
  const options = {
    method :"POST",
    auth : "arunsai:40fa9e21bd311a88ea19c2b72c9907d5-us5"
  }
  const request =  https.request(url,options,function(response){
     if (response.statusCode ==200){
       res.sendFile(__dirname+"/success.html")
     }else{
       res.sendFile(__dirname+"/failure.html")
     }


    response.on("data",function(data){
    console.log(JSON.parse(data));
    });
  });

  request.write(jsondata);
  request.end();

  
});

app.post("/failure",function(req,res){
  res.redirect("/");
})





app.listen(process.env.PORT || 3000,function(){
    console.log(`server is live at http://localhost:3000`);
})




























// api key 
// 40fa9e21bd311a88ea19c2b72c9907d5-us5
// 5bd12c9395