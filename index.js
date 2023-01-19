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
    const json = utils.getJSON(megasena);

    //Set to client
    res.send(json);
});

//Weather
app.get('/api/tempo/:local', async (req,res)=> {
    const {local} = req.params;
    const url = "https://www.tempo.com/"+local+".htm";
    //Css selectors to get the text
    const selectors = [
        "span.dato-temperatura", 
        "span.descripcion strong",
        ".dia:nth-of-type(1)>.temperatura>.maxima",
        ".dia:nth-of-type(1)>.temperatura>.minima",
        ".dia:nth-of-type(2)>.prediccion img",
        ".dia:nth-of-type(2)>.temperatura>.maxima",
        ".dia:nth-of-type(2)>.temperatura>.minima",
        ".dia:nth-of-type(3)>.prediccion img",
        ".dia:nth-of-type(3)>.temperatura>.maxima",
        ".dia:nth-of-type(3)>.temperatura>.minima",
        ".dia:nth-of-type(4)>.prediccion img",
        ".dia:nth-of-type(4)>.temperatura>.maxima",
        ".dia:nth-of-type(4)>.temperatura>.minima",
        ".dia:nth-of-type(5)>.prediccion img",
        ".dia:nth-of-type(5)>.temperatura>.maxima",
        ".dia:nth-of-type(5)>.temperatura>.minima"
    ]

    const texts = await utils.getElements(url, selectors);

    const daysWeek = ['Domingo', 'Segunda', "Terça", "Quarta", 'Quinta', 'Sexta', 'Sábado'];
    const currentDay = utils.getDayWeek();

    const temperature = texts[0];
    const desc = texts[1];
    const tempMax = texts[2];
    const tempMin = texts[3];

    const descDay2 = texts[4];
    const tempMaxDay2 = texts[5];
    const tempMinDay2 = texts[6];

    const nameDay3 = daysWeek[currentDay+2%6]
    const descDay3 = texts[7];
    const tempMaxDay3 = texts[8];
    const tempMinDay3 = texts[9];

    const nameDay4 = daysWeek[currentDay+3%6]
    const descDay4 = texts[10];
    const tempMaxDay4 = texts[11];
    const tempMinDay4 = texts[12];

    const nameDay5 = daysWeek[currentDay+4%6]
    const descDay5 = texts[13];
    const tempMaxDay5 = texts[14];
    const tempMinDay5 = texts[15];

    const html = `<h1>Temperatura de ${local}</h1>
    <h2>Hoje</h2>
    <p>${temperature}</p>

    <span>${tempMax} - ${tempMin}</span>

    <p>${desc}</p>

    <h2>Amanhã</h2>
    <span>${tempMaxDay2} - ${tempMinDay2}</span>

    <p>${descDay2}</p>

    <h2>${nameDay3}</h2>
    <span>${tempMaxDay3} - ${tempMinDay3}</span>

    <p>${descDay3}</p>

    <h2>${nameDay4}</h2>
    <span>${tempMaxDay4} - ${tempMinDay4}</span>

    <p>${descDay4}</p>

    <h2>${nameDay5}</h2>
    <span>${tempMaxDay5} - ${tempMinDay5}</span>

    <p>${descDay5}</p>
    `

    res.send(html);
});

app.get('/api/cotacao', async (req,res)=>{
    const url = 'https://economia.uol.com.br/cotacoes/';
    
    const selectors = [
        'div[name="grafico"] .hidden-xs a.subtituloGrafico.subtituloGraficoValor',
        'div[name="graficoEuro"] .hidden-xs a.subtituloGrafico.subtituloGraficoValor'
    ]

    const texts = await utils.getElements(url,selectors);

    const dolar = texts[0];
    const euro = texts[1];

    const html = `
    <h1>Cotação</h1>
    <h2>Dolar: ${dolar}</h2>
    <h2>Euro: ${euro}</h2>
    `

    res.send(html)

})

app.get('/api/horoscopo', async (req,res) => {
    const url = "https://www.oguru.com.br/horoscopododia";

    const selectors = [
        '.container .row:nth-of-type(2) .col-md-6:nth-of-type(1) p:nth-of-type(1)',
        '.container .row:nth-of-type(2) .col-md-6:nth-of-type(2) p:nth-of-type(1)',
        '.container .row:nth-of-type(3) .col-md-6:nth-of-type(1) p:nth-of-type(1)',
        '.container .row:nth-of-type(3) .col-md-6:nth-of-type(2) p:nth-of-type(1)',
        '.container .row:nth-of-type(4) .col-md-6:nth-of-type(1) p:nth-of-type(1)',
        '.container .row:nth-of-type(4) .col-md-6:nth-of-type(2) p:nth-of-type(1)',
        '.container .row:nth-of-type(5) .col-md-6:nth-of-type(2) p:nth-of-type(1)',
        '.container .row:nth-of-type(5) .col-md-6:nth-of-type(3) p:nth-of-type(1)',
        '.container .row:nth-of-type(6) .col-md-6:nth-of-type(1) p:nth-of-type(1)',
        '.container .row:nth-of-type(6) .col-md-6:nth-of-type(2) p:nth-of-type(1)',
        '.container .row:nth-of-type(7) .col-md-6:nth-of-type(1) p:nth-of-type(1)',
        '.container .row:nth-of-type(7) .col-md-6:nth-of-type(2) p:nth-of-type(1)',
    ]

    const texts = await utils.getElements(url,selectors)

    const aries = texts[0];
    const touro = texts[1];
    const gemeos = texts[2];
    const cancer = texts[3];
    const leao = texts[4];
    const virgem = texts[5];

    const libra = texts[6];
    const escorpiao = texts[7];
    const sagitario = texts[8];
    const capricornio = texts[9];
    const aquario = texts[10];
    const peixes = texts[11];

    const html = `
        <h1>SIGNOS</h1>

        <div><h2>Aries:</h2> ${aries}</div><br>
        <div><h2>Touro:</h2> ${touro}</div><br>
        <div><h2>Gemêos:</h2> ${gemeos}</div><br>
        <div><h2>Câncer:</h2> ${cancer}</div><br>
        <div><h2>Leão:</h2> ${leao}</div><br>
        <div><h2>Virgem:</h2> ${virgem}</div><br>

        <div><h2>Libra:</h2> ${libra}</div><br>
        <div><h2>Escorpião:</h2> ${escorpiao}</div><br>
        <div><h2>Sagitário:</h2> ${sagitario}</div><br>
        <div><h2>Capricornio:</h2> ${capricornio}</div><br>
        <div><h2>Aquário:</h2> ${aquario}</div><br>
        <div><h2>Peixes:</h2> ${peixes}</div><br>
    `

    res.send(html);
});

app.listen(port, ()=> {
    console.log(`Connected to port ${port}`);
});

cron.schedule('0 * * * *', async () =>{
    
});