var users = ['Javier', 'Antonio', 'Pablo', 'Alba', 'Cristina','Lidia', 'Jose Luis', 
'Marta', 'Asun', 'Aida', 'Rocio', 'Miguel', 'Miguel Angel', 'Maria', 'Enzo', 'Nacho', 'Raquel', 'Yeray'];
users.sort();
var nonValid = [];

//Generic functions

function init(){
    var i;
    for(i=0;i<document.getElementsByTagName('table').length;i++){
        var table = document.getElementsByTagName('table')[i];
        table.style.display = 'none';
    }
    document.getElementById('calCont').style.display = 'none';
    document.getElementById('optFields').style.display = 'none';
    document.getElementById('sel').style.display = 'none';
    document.getElementById('tools').style.display = 'none';
    document.getElementById('dacoin').style.display = 'none';
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
}

function showhide(arg){
    var element = document.getElementById(arg);
    if(arg === "calCont" && element.style.display==='none'){
        alert("Para poder mostrar el calendario correctamente es necesario que estés logueado en tu cuenta de Google en este navegador.")
        element.setAttribute('style', 'text-align: left;justify-content: left;margin:20px');

    }else if(arg ==="tools" && element.style.display==='none'){
        element.setAttribute('style', 'text-align: left;justify-content: space-evenly;');
    }else if(arg ==="optFields" && element.style.display==='none'){
        element.setAttribute('style', 'text-align: left;justify-content: space-evenly;display: grid;');
    }else if(arg ==="dacoin" && element.style.display==='none'){
        element.setAttribute('style', 'text-align: left;justify-content: center;display: grid;');
    }else if (element.style.display === 'none'){
        element.style.display = 'block';
        element.setAttribute('style', 'text-align: left;justify-content: space-evenly;display: flex;object-fit: scale-down;max-width: 100%;');
    }
    else{
        element.style.display = 'none';
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
    var fields2 = document.getElementById('dec');
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
    document.getElementById('dacoin').innerHTML='Clinck, clinck, clinck...';
    setTimeout(showCoin,2000);
}

function showCoin(){
    var dacoin = document.getElementById('dacoin');
    dacoin.innerHTML=side;
    dacoin.innerHTML+='<input id="throwAgain" type="button" value="New throw" onclick="coin()">';
    dacoin.style = 'justify-content: center; display: grid; text-align:center;';
}

//Function to show the calendar

function loadCal(){
    var mailAux = document.getElementById('mail').value;
    var mail = mailAux.replace("@", "%40");
    const calBox = document.getElementById('calBox');
    calBox.innerHTML ='<iframe id="calendar" src="https://calendar.google.com/calendar/embed?src='+mail+'&ctz=Europe%2FMadrid"></iframe>';
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
