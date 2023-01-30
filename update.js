const utils = require('./utils.js');

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

jsonUpdate();