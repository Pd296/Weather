
const bodyParser = require("body-parser");
const express=require("express");
const app=express();
const https=require("https");


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

    
    const query=req.body.cityName;
const apiKey="6607bdcbde36869f8010bf7b557ea0dd";
    url="https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+apiKey+"&units=metric"
    https.get(url,function(response){

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            var temp=weatherData.main.temp;
            var feels_like = weatherData.main.feels_like;
            var description = weatherData.weather[0].description;
            const icon= weatherData.weather[0].icon;
            const img_url= "https://api.openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<P>The weather is current "+"<em>"+description+"</em></p>");
            res.write("<h1>The temp in"+ query+ "is "+"<em>"+ temp +"</em>"+", but it feel like "+"<em>" +feels_like+"</em>" +"</h1>");
            res.write("<img src="+img_url+">");
            res.send(); 
        })


    })
});

app.listen(3000,function(){
    console.log("server is listeing on port 3000.");
});