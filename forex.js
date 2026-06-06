const ctx = document.getElementById("forex-chart");
new Chart(ctx,{
    type:"line",

    data: {
        labels:["mon","tue","wed","thu","fri"],

        datasets:[{
            label:"XAU/USD",
            data:[20,30,40,50,60],
        }]
    }
});

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


const update = document.getElementById("notification");
update.addEventListener("click",function(){
    update.toggle("info");
})
