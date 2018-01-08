// Create a js file that creates dynamic html
// including:
// * different update button id 
// * different price (updates)_id
// * different target price id


const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer




const closeBtn = document.getElementById('closeBtn')
const addBtn = document.getElementById('addBtn')

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close();
})



addBtn.addEventListener('click', function() {
    const coin = document.getElementById('coinTicker').value.toUpperCase();
    const coinHtml = `<div class="coin">\
<div id="price-container">\
<p class="subtext">Current <span id="ticker"> ${coin} </span> USD</p>\
<h4 id="${coin}price">Loading ..</h4>\
</div><div id="goal-container">\
<p>\
<img src = "../assets/images/up.svg" >\
<span id = "${coin}targetiPrice">\
 Choose a Target Price </span>\
 </p></div ><div id = "right-container">\
 <button class = "btn btn-primary btn-shadow" id="${coin}notifyBtn" >\
  Notify me when.. </button>\
  </div >\
  </div>`;
    ipc.send('update-coin-value', coinHtml)
    console.log(coinHtml)

    var window = remote.getCurrentWindow();
    window.close();
})