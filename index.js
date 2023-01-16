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
        "span.descripcion strong"
    ]

    const texts = await utils.getElements(url, selectors);

    const temperature = texts[0];
    const desc = texts[1];

    const html = `<h1>Temperatura de SJP</h1>
    <p>${temperature}</p>

    <p>${desc}</p>
    `

    res.send(html);
});

app.listen(port, ()=> {
    console.log(`Connected to port ${port}`);
});