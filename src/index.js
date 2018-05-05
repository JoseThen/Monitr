const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
const insertBtn = document.getElementById('insert')
const deleteBtn = document.getElementById('delete')
var price = document.getElementById('price')
var list = document.querySelector('.list')
var targetPrice = document.getElementById('targetPrice')




function addy(argument) {
	var wrapper = document.createElement('div');
  	wrapper.innerHTML = argument;
  	list.appendChild(wrapper);

}

var targetPriceVal;
var coinTicker;

var notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD
            price.innerHTML = '$' + cryptos.toLocaleString('en')

            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
                new window.Notification(notification.title, notification)
                console.log("better price!");
                console.log(targetPriceVal);
            }
        })
    console.log("found Price");

}

getBTC();
setInterval(getBTC, 15000);



notifyBtn.addEventListener('click', function(event) {
    console.log('Button is clicked')
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({
        width: 400,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true
    });
    win.on('close', function() { win = null });
    win.loadURL(modalPath);
    win.show();
});

insertBtn.addEventListener('click', function(event) {
    console.log('Button is clicked')
    const modalPath = path.join('file://', __dirname, 'insert.html')
    let win = new BrowserWindow({
        width: 400,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true
    });
    win.on('close', function() { win = null });
    win.loadURL(modalPath);
    win.show();
});

ipc.on('targetPriceVal', function(event, arg) {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
});

ipc.on('coinTicker', function(event, arg){
	coinTicker = String(arg)
	var wrapper = document.createElement('div');
  	wrapper.innerHTML = coinTicker;
  	list.appendChild(wrapper);
  	console.log("appended?");

})