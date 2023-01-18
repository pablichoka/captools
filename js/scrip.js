var users = ['Javier', 'Antonio', 'Pablo', 'Alba', 'Cristina','Lidia', 'Jose Luis', 
'Marta', 'Asun', 'Aida', 'Rocio', 'Miguel', 'Miguel Angel', 'Maria', 'Enzo', 'Nacho', 'Raquel', 'Yeray'];
users.sort();
var nonValid = [];

//Generic functions

function init(){
    var i;
    for(i=0;i<document.getElementsByClassName('tab').length;i++){
        var table = document.getElementsByClassName('tab')[i];
        table.style.display = 'none';
    }
    document.getElementById('workbench').style.display = 'none';
    document.getElementById('tools').style.display = 'none';
    document.getElementById('calendar').style.display = 'none';
    const date0 = new Date();
    var day0 = date0.getDay();
    var day1 = date0.getDate();
    if(day0 === 5){
        alert('Today is friday, remember to impute hours!');
    }
    if(day1 >= 27){
        alert('Remember to do the GTE of this month!');
    }
    fillTheList();
    fillTheDecider();
    hideTools();
}

var divs = ['tab1', 'tab2', 'calendar', 'tools'];

function showhide(arg){
    var wb = document.getElementById('workbench');

    if(document.getElementById(arg).style.display != 'none'){
        wb.style.display = 'none';
        document.getElementById(arg).style.display = 'none';
        return;
    }
    
    for(var i = 0; i<divs.length; i++){
        if(arg === divs[i]){
            document.getElementById(divs[i]).style.display = '';
            wb.style.display = 'flex';
        }else{
            document.getElementById(divs[i]).style.display = 'none';
        }
    }

    if(arg === divs[3] && document.getElementById(divs[3]).style.display != 'none'){
        document.getElementById(tools[0]).style.display = '';
        document.getElementById(tools[1]).style.display = '';
        document.getElementById(tools[2]).style.display = '';
        hideTools();
    }

}

//Functions for the surprise

var showed = false;
var container = document.querySelector('.surprise');

function surprise() {
    if(showed === false){
        alert('Latino heat, right?');
        container.style = "display: grid;";
        const img1 = document.createElement('img');
        img1.src = './media/bipbipbop1.png';
        container.appendChild(img1);
        const img2 = document.createElement('img');
        img2.src = './media/bipbipbop2.png';
        container.appendChild(img2);
        const img3 = document.createElement('img');
        img3.src = './media/bipbipbop3.png';
        container.appendChild(img3);
        const img4 = document.createElement('img');
        img4.src = './media/bipbipbop4.png';
        container.appendChild(img4);
        showed = true;
    }else{
        container.innerHTML= "";
        container.style = "display: none;";
        showed = false;
    }
}

//Functions for the decider

var numChoices;
var decided = false;

function decider(){
    var options = new Array(numChoices);
    for(var i = 0; i<numChoices;i++){
        options[i] = document.getElementById('textField'+i).value;
    }
    var number = Math.round(Math.random()*(options.length-1));
    document.getElementById('optFields').innerHTML = 'The decider...has decided...to decide...'+options[number]+'...no regrets here!';
    decided = true;
    document.getElementById('optFields').innerHTML += '<input class="button" id="resetDec" type="button" value="New decider" onclick="resetDecider()">';
}

function fillTheDecider(){
    var list = document.getElementById('numChoices');
    for(var i = 0; i<=10;i++){
        list.innerHTML += '<option value="'+i+'">'+i+'</option>';
    }
}

function showTextFields(){
    var textFields = document.getElementById('optFields');
    var options = document.getElementById('numChoices');
    numChoices = options.value;
    textFields.innerHTML += "<br>";
    for(var i = 0; i<numChoices;i++){
        textFields.innerHTML += 'Option number '+(i+1)+': <input type="text" class="textBox" id="textField'+i+'">';    
    }
    textFields.innerHTML += '<input class="button" id="decideBut" type="button" value="Decide!" onclick="decider()">';
    textFields.innerHTML += '<input class="button" id="resetDec" type="button" value="New decider" onclick="resetDecider()">';
}

function resetDecider(){
    var fields = document.getElementById('optFields');
    if(decided = false){
        fields.innerHTML = "";
        fields.innerHTML += 'Select the number of options: <select id="numChoices" onchange="showTextFields()"></select>';
        fields.innerHTML += '<input class="button" id="resetDec" type="button" value="New decider" onclick="resetDecider()">';
    }else{
        fields.innerHTML = "";
        fields.innerHTML += 'Select the number of options: <select id="numChoices" onchange="showTextFields()"></select>';
        decided = false;
    }
    fillTheDecider();
}

//Funtion for the coin

var side;

function coin(){
    var numb = Math.random();
    if(numb < 0.5){
        side = "Cara";
    }else{
        side = "Cruz";
    }
    document.getElementById('dacoin').innerHTML ='<br>'
    // document.getElementById('dacoin').innerHTML +='Clinck, clinck, clinck...';
    document.getElementById('dacoin').innerHTML += "<i id='aniCoin' class='fa fa-flip fa-circle-half-stroke'></i>";
    setTimeout(showCoin,2200);
}

function showCoin(){
    var dacoin = document.getElementById('dacoin');
    dacoin.innerHTML = '<br>'
    dacoin.innerHTML += side;
    dacoin.innerHTML += '<br>'
    dacoin.innerHTML +='<input id="throwAgain" type="button" value="New throw" onclick="coin()">';
    dacoin.style = 'justify-content: center; display: grid; text-align:center;';
}

//Function to show the calendar

function loadCal(){
    var mailAux = document.getElementById('mail').value;
    var mail = mailAux.replace("@", "%40");
    const calBox = document.getElementById('calBox');
    calBox.style.display = '';
    alert("It is required that you are logged into your Google account in this browser. Otherwise, it wont' work.")
    calBox.innerHTML ='<iframe id="gcal" src="https://calendar.google.com/calendar/embed?src='+mail+'&ctz=Europe%2FMadrid"></iframe>';
}

//Functions for Alpac@s selector

function randomPick(){
    if(users.length===0){
        return alert('You already invoked all the alpac@s!');
    }else{
        var i = Math.round(Math.random()*(users.length-1));
        var selUser = users[i];
        writeList(selUser);
        nonValid.push(selUser);
        users.splice(i,1);
    }
}

function writeList(user){
    var list = document.getElementById('toSelect');
    var li = document.createElement("li");
    li.innerText = user;
    li.setAttribute('id', user);
    list.appendChild(li);
}

function deleteList(user){
    var li = document.getElementById(user);
    li.remove();
}

function reset(){
    users = ['Javier', 'Antonio', 'Pablo', 'Alba', 'Cristina', 'Lidia', 'Jose Luis', 
    'Marta', 'Asun', 'Aida', 'Rocio', 'Miguel', 'Miguel Angel', 'Maria', 'Enzo', 'Nacho', 'Raquel', 'Yeray'];
    users.sort();
    nonValid = [];
    var list = document.getElementById('toSelect');
    list.innerHTML= "";
    var nonSelected = document.getElementById('returnList');
    nonSelected.length = 0;
    fillTheList();
}

function fillTheList(){ //este metodo rellena la lista de seleccion
    var nonSelected = document.getElementById('returnList');
    for(var i = 0; i<users.length;i++){
        var user = document.createElement("option");
        user.value= users[i];
        user.innerHTML = users[i];
        nonSelected.appendChild(user);
    }
}

function Valid2NonValid(){
    var selectBox = document.getElementById('returnList');
    var selUser = selectBox.value;
    if(users.length === 0){
        alert("There's no remaining alpac@s to add!");
    }else{
    for(var i = 0; i<users.length;i++){
        if(nonValid[i]===selUser){
            alert('This alpac@ is already added!');
        }
        else if(users[i]===selUser){
            nonValid.push(selUser);
            users.splice(i,1);
            writeList(selUser);
            break;
            }
        }
    }
}

function NonValid2Valid(){
    var selectBox = document.getElementById('returnList');
    var selUser = selectBox.value;
    if(nonValid.length === 0){
        alert("There's no alpac@s to remove!");
    }else{
    for(var i = 0; i<nonValid.length;i++){
        if(users[i]===selUser){
            alert('This alpac@ is already removed!');
        }
        else if(nonValid[i]===selUser){
            users.push(selUser);
            nonValid.splice(i,1);
            deleteList(selUser);
            break;
            }
        }
    }
}

function hideTools(){
    var alpacs = document.getElementById('sel');
    var decider = document.getElementById('optFields');
    var coin = document.getElementById('dacoin');
    var cipher = document.getElementById('wEncoder');

    alpacs.style.display = 'none';
    decider.style.display = 'none';
    coin.style.display = 'none';
    cipher.style.display = 'none';

}

var tool = ['optFields', 'sel', 'dacoin', 'wEncoder'];
var tools = ['decider', 'selector', 'coin', 'encoder'];

function showTool(arg){
    for(var i = 0; i<tool.length;i++){
        if(arg === tool[i]){
            document.getElementById(tool[i]).style.display = '';
            document.getElementById(tools[i]).style.display = '';
        }else{
            document.getElementById(tool[i]).style.display = 'none';
            document.getElementById(tools[i]).style.display = 'none';
        }
    }
}

//Cipher and decipher

var encrypted;
var decrypted;
var keyElements = new Array(20);
var key = "";

function keyGen(){
    key = "";

    for(var i = 0; i < 20; i++){
        keyElements[i] = Math.floor(Math.random()*94)+33;
        
    }
    for(var i = 0; i<keyElements.length;i++){
        key += String.fromCharCode(keyElements[i]);
    }
    document.getElementById('keygenfield').value = key;
}

function enc(msg,key){
    var mnsj = document.getElementById(msg).value;
    var k = document.getElementById(key).value;

    encrypted = CryptoJS.AES.encrypt(mnsj, k);
    document.getElementById('toCipherOut').value = encrypted.toString();
}

function dec(msg,key){
    var mnsj = document.getElementById(msg).value;
    var k = document.getElementById(key).value;

    decrypted = CryptoJS.AES.decrypt(mnsj, k).toString(CryptoJS.enc.Utf8);
    document.getElementById('toDecipherOut').value = decrypted;
}

// encrypted = CryptoJS.AES.encrypt('mensaje cifrado', 'key');
// console.log(encrypted.toString());
// decrypted = CryptoJS.AES.decrypt(encrypted, 'key').toString(CryptoJS.enc.Utf8);
// console.log(decrypted);
