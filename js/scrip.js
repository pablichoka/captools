var users = ['Javier', 'Antonio', 'Pablo', 'Alba', 'Cristina','Lidia', 'Jose Luis', 
'Marta', 'Asun', 'Aida', 'Rocio', 'Miguel', 'Miguel Angel', 'Maria', 'Enzo', 'Nacho', 'Raquel', 'Yeray'];
var nonValid = [];

function myFunction() {
    alert('Latino heat, right?');
    const img1 = document.createElement('img');
    img1.src = './media/bipbipbop1.png';
    document.querySelector('.surprise').appendChild(img1);
    const img2 = document.createElement('img');
    img2.src = './media/bipbipbop2.png';
    document.querySelector('.surprise').appendChild(img2);
    const img3 = document.createElement('img');
    img3.src = './media/bipbipbop3.png';
    document.querySelector('.surprise').appendChild(img3);
    const img4 = document.createElement('img');
    img4.src = './media/bipbipbop4.png';
    document.querySelector('.surprise').appendChild(img4);
}
function showhide(arg){
    var element = document.getElementById(arg);
    if (element.style.display === 'none'){
        element.style.display = 'block';
        element.setAttribute('style', 'text-align: center;justify-content: space-evenly;display: flex;');
    }
    else{
        element.style.display = 'none';
    }      
}
function init(){
    var i;
    for(i=0;i<document.getElementsByTagName('table').length;i++){
        var table = document.getElementsByTagName('table')[i];
        table.style.display = 'none';
    }
    document.getElementById('calendar').style.display = 'none';
    document.getElementById('selector').style.display = 'none';
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
}

function comidita(){
    const arr = ['italiano', 'chino', 'japones', 'tailandes', 'griega', 'mexicano',
        'cubano', 'hamburguesa', 'mercadona', 'turco', 'poke'];
    var rand = Math.round(Math.random()*(arr.length-1));
    var food = arr[rand];
    alert('Tu comidita de hoy es: ' + food + '.');
}

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
