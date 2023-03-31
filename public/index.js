
//Function returns the color format for displayed charts
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}
//Retrieves data from api.twelvedata.com while creating a charts
async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

const response = await fetch("https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=ca4058031bc945e1960220711b557c74")

const result = await response.json()
 
//let GME = result.GME
//let MSFT = result.MSFT
//let DIS = result.DIS
//let BTNX = result.BTNX

//const stocks = [GME, MSFT, DIS, BNTX];

const { GME, MSFT, DIS, BTNX } = result;

const stocks = [GME, MSFT, DIS, BTNX];

stocks.forEach(stock => stock.values.reverse())

// Time chart is created
new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.reverse().map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
            data: stock.values.reverse().map(value => parseFloat(value.high)),
        }))
    }
});

//Bar chart is created
new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks[0].values.reverse().map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
            data: stock.values.reverse().map(value => parseFloat(value.high)),
        }))
    }
});
// Function takes data in and returns greatest value
function greatestValue(values) {
    let greatest = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > greatest) {
            greatest = value.high
        }
    })
    return greatest
}
}
main();
greatestValue()
