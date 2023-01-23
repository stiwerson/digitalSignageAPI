//Packages to import
const cron = require('node-cron');
const express = require('express');
const utils = require('./utils.js');

//Variables for express
const app = express();
const port = 3500;

//Gives the Megasena results
app.get('/api/megasena', async (req,res)=> {
    //Get data saved
    const json = await utils.getJSON("megasena");

    //Set to client
    res.send(json);
});

//Weather
app.get('/api/tempo/:local', async (req,res)=> {
    //Used to get the city dynamically from url
    const {local} = req.params;

    const json = await utils.getJSON(local);

    console.log(json);

    res.send(json);
});

app.get('/api/cotacao', async (req,res)=>{
    const json = await utils.getJSON('currency');

    res.send(json)
})

app.get('/api/horoscopo', async (req,res) => {
    const json = await utils.getJSON("horoscope");

    res.send(json);
});

app.listen(port, ()=> {
    console.log(`Server is now running. The port is ${port}`);
});

cron.schedule('0 * * * *', async () =>{
    jsonUpdate();
});

async function jsonUpdate(){
    await utils.getCurrency();
    await utils.getHoroscope();
    await utils.getMegasena();

    //all location to get the weather
    const cities = ['sao-jose-dos-pinhais','quatro-barras','carambei','coronel-vivida','paranagua','pinhais'];

    //loop to get all weathers from the cities array
    for(let city of cities){
        await utils.getWeather(city);
    }
}