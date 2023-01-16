//Packages to import
const express = require('express');
const utils = require('./utils.js');

//Variables for express
const app = express();
const port = 3500;


//Gives the Megasena results
app.get('/megasena', async (req,res)=> {
    const url = "https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx";
    //Css selectors to get the text
    const selectors = 
    [
        '.numbers.megasena>li', 
        'h2>span.ng-binding', 
        'div.next-prize.clearfix>p:first-child', 
        'div.next-prize.clearfix>.value', 
        '.content-section.with-box.column-right .description:nth-of-type(1)>span:nth-of-type(3)', 
        '.content-section.with-box.column-right .description:nth-of-type(2)>span:nth-of-type(1)',
        '.content-section.with-box.column-right .description:nth-of-type(3)>span:nth-of-type(1)'
    ];

    const texts = await utils.getElements(url, selectors);

    const numbers = texts[0];
    const date = texts[1];
    const nextDate = texts[2];
    const nextPrize = texts[3];
    const scoredSix = texts[4];
    const scoredFive = texts[5];
    const scoredFour = texts[4];

    const html = `<h1>${date}</h1>
    <p>${numbers}</p>
    <div><span>${nextDate} </span><span>${nextPrize}</span></div>
    <p>6 Acertos ${scoredSix}</p>
    <p>5 Acertos ${scoredFive}</p>
    <p>4 Acertos ${scoredFour}</p>`

    res.send(html);
});

//Weather
app.get('/tempo/sjp', async (req,res)=> {
    const url = "https://www.tempo.com/sao-jose-dos-pinhais.htm";
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

    const html = `<h1>Temperatura de SJP</h1>
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

app.listen(port, ()=> {
    console.log(`Connected to port ${port}`);
});