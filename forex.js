const forexChart = document.getElementById("forex-chart");
const chart = LightweightCharts.createChart(forexChart,{
    layout:{
        background:{
            color:"#111827"
        },
    },
    grid:{
        horzlines:{
            color:"#1f2937"
        },
        vertzlines:{
            color:"#1f2937"
        }
    }
});
const candle = chart.addSeries(LightweightCharts.CandlestickSeries);
candle.setData([
    {
        time:"2026-06-01",
        open:100,
        high:600,
        low:300,
        close:200
    },
    {
        time:"2026-06-02",
        open:200,
        high:650,
        low:180,
        close:500
    },
    {
        time:"2026-06-03",
        open:500,
        high:700,
        low:180,
        close:650
    },
    {
        time:"2026-06-04",
        open:650,
        high:750,
        low:600,
        close:700
    },
    {
        time:"2026-06-05",
        open:700,
        high:800,
        low:650,
        close:750
    }
]);
chart.timeScale().fitContent();

const doughnutChart = document.getElementById("doughnut");
new Chart(doughnutChart,{
    type:"doughnut",
    data:{
        labels:["Forex","Gold","Crypto","Indices","Others"],
        datasets:[{
            label:"Total",
            data:[52.6,20.3,15.7,7.8,3.6],
            backgroungColor:[
                "#3b82f6",
                "#eab308",
                "#22c55e",
                "yellow",
                "#a855f7"
            ]
        }]
    }
});

const inputSearch = document.getElementById("search-input");
inputSearch.addEventListener("input",function(){
    console.log(inputSearch.value);
    const marketList = document.querySelectorAll(".Marketwatch-symbol P");
    marketList.forEach(function(items){
        if(items.textContent.includes(inputSearch.value)){ 
            items.style.display ="block";
        }else{
            items.style.display = "none";
        }
    })
});

const lightMode = document.getElementById("mode");
lightMode.addEventListener("click",function(){
    const page=document.querySelector("body");
    page.classList.toggle("light-mode");
    console.log(page.classList);
});

const marketSymbol = document.querySelector(".Marketwatch-symbol");
const marketPrice = document.querySelector(".Marketwatch-price");
const marketChange = document.querySelector(".Marketwatch-change");
const symbols=[
    "EUR/USD",
    "GBP/USD",
    "USD/JPY",
    "XAU/USD",
    "BTC/USD",
    "AUD/USD"
];
marketSymbol.innerHTML="";
marketPrice.innerHTML="";
marketChange.innerHTML="";

symbols.forEach(function(symbol){
    fetch("https://api.twelvedata.com/quote?symbol="+symbol+"&apikey=7ef96460c4cb43058f6a0f4532704d2e")
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            marketSymbol.innerHTML += "<p>"+ data.symbol +"</p>";
            marketPrice.innerHTML += "<p>" + data.close +"</P>";
            const change = Number(data.percent_change).toFixed(2);
            if(change < 0){
                marketChange.innerHTML += "<p style='color:red;'>"+change+"%</p>";
            }else{
                marketChange.innerHTML += "<p style='color:green;'>"+change+"%</p>";
            };
        });
});

fetch("https://api.twelvedata.com/time_series?symbol=XAU/USD&interval=1min&apikey=7ef96460c4cb43058f6a0f4532704d2e")
 .then(function(response){
    return response.json();
 })
 .then(function(data){
    console.log(data.values.length);
    console.log(data.values[0]);
    console.log(data.values[29]);
    const chartData = data.values.reverse().map(function(item){
        console.log(item.datetime);
        return{
            time:Math.floor(new
            Date(item.datetime).getTime()/1000),
            open:Number(item.open),
            high:Number(item.high),
            low:Number(item.low),
            close:Number(item.close)
        };
    });
    console.log(chartData[0]);
    console.log(chartData[29]);
    candle.setData(chartData);
    chart.timeScale().fitContent();
 });

 fetch("https://newsdata.io/api/1/market?apikey=pub_21bd4fc980af48a7b1f7dd8e5cf0b761&q=forex")
 .then(function(response){
    return response.json();
 })
 .then(function(data){
    console.log(data.results[0]);
    console.dir(data.results[0]);
    data.results.forEach(function(item){
        const news = document.querySelector(".news-content");
        news.innerHTML +="<p>"+item.title+"<br>"+item.pubDate+
        "</p>";
    })
 });
 