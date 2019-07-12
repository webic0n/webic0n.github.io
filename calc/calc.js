
function getValue(){
    var check = document.getElementById('calc')
    var ch = check.querySelectorAll(':checked')
    var amount = 0;
for(var i = 0; i < ch.length; i++){
    amount += +ch[i].value;
    document.getElementById('summ').innerHTML = amount; 
}
}
