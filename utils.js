const puppeteer = require("puppeteer");

module.exports.getElements = async function(url, selectors){
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

module.exports.getDayWeek = () => {
    const date = new Date();
    const day = date.getDay();

    return day;
}