const puppeteer = require("puppeteer");
const fs = require('fs');
const { METHODS } = require("http");

//Get all texts from URL using selectors
const getElements = async function(url, selectors){
    const texts = [];
    //Start Browser
    const browser = await puppeteer.launch();
    //Open new tab
    const page = await browser.newPage();
    //Go to location selected on param
    await page.goto(url);

    //Get every element
    for(let selector of selectors){   
        //Wait for html elements to load
        await page.waitForSelector(selector); 

        //get all elements
        const elements = await page.$$(selector)

        //extract all text wanted, if theres no text tries to get alt
        const arrayText = await Promise.all(elements.map(item => item.evaluate(item => item.innerText ? item.innerText : item.alt)));

        //add extracted texts to the array 
        texts.push(arrayText);
    }

    return texts;
}

//Used to get current day
module.exports.getDayWeek = () => {
    const date = new Date();
    const day = date.getDay();

    return day;
}

//Saves all scrapped info to a json
function saveJSON(obj, fileName){
    const json = JSON.stringify(obj);

    fs.writeFile(`./public/${filename}.json`, json, (err) => {
        if (err){
            throw err
        }
    });
}

//Get saved JSON
module.exports.getJSON = (filename) =>{
    fs.readFile(`./public/${filename}.json`, 'utf-8', (err, data)=>{
        if(err){
            throw err;
        }
        return data;
    });
}

//Get Megasena winning numbers, amount of winners and prize
module.exports.getMegasena = async () =>{
    //Url to get
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

    const texts = await getElements(url, selectors);

    const megasenaResults = {
        numbers:  texts[0],
        date:  texts[1],
        nextDate:  texts[2],
        nextPrize:  texts[3],
        scoredSix:  texts[4],
        scoredFive:  texts[5],
        scoredFour:  texts[6]
    }

    saveJSON(megasenaResults, 'megasena');
}

module.exports.getWeather = async () => {

}