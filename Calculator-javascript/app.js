function getnumber(num){
    var result =document.getElementById("result");
    result.value += num;
}
function clearResult(){
    var result=document.getElementById("result")
    result.value=""
}

function getResult(){
    result=document.getElementById('result')
    result.value=eval(result.value)
}