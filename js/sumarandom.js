if(!window.num1){
  let num1 = 0
  let num2 = 0
  let respuesta = 0
  let indiceOpCorrecta = 0
  let op1 = document.getElementById("op1");
  let op2 = document.getElementById("op2");
  let op3= document.getElementById("op3");
  let txt_suma = document.getElementById("suma");
  let txt_msj = document.getElementById("msj");
  let txt_resultado = document.getElementById("resultado");

  let containerCards  = document.getElementById("card_container");
  let containerGame  = document.getElementById("game_container");
  let otherGameButton  = document.getElementById("otherGameButton");
}
num1 = 0
num2 = 0
respuesta = 0
indiceOpCorrecta = 0

txt_suma = document.getElementById("suma");
op1 = document.getElementById("op1");
op2 = document.getElementById("op2");
op3 = document.getElementById("op3");
txt_msj = document.getElementById("msj");
txt_resultado = document.getElementById("resultado");

containerCards  = document.getElementById("card_container");
containerGame  = document.getElementById("game_container");
otherGameButton  = document.getElementById("otherGameButton");


function LoadGame(){

    containerCards.classList.add("hide");
    containerGame.classList.remove("hide");

    otherGameButton.addEventListener('click' ,function(){
        containerGame.classList.add("hide");
        containerCards.classList.remove("hide");

    });

}
function stopGame(){

}
function comenzar(){
  txt_resultado.innerHTML = "?";
  txt_msj.innerHTML = "";
  num1 = Math.round(Math.random () *9);
  num2 = Math.round(Math.random () *9);
  respuesta = num1 + num2;
  txt_suma.innerHTML = num1 + " + " + num2 + " = ";
  indiceOpCorrecta = Math.round(Math.random()*2);
  if (indiceOpCorrecta == 0) {
    op1.innerHTML = respuesta;
    op2.innerHTML = respuesta + 1;
    op3.innerHTML = respuesta -1;
  }
  if (indiceOpCorrecta == 1) {
    op2.innerHTML = respuesta;
    op1.innerHTML = respuesta + 2;
    op3.innerHTML = respuesta - 1;
  }

  if (indiceOpCorrecta == 2) {
    op3.innerHTML = respuesta;
    op1.innerHTML = respuesta + 1;
    op2.innerHTML = respuesta - 1;
  }


}


function controlarRespuesta(opcionElegida) {
  txt_resultado.innerHTML = opcionElegida.innerHTML;
  if ( respuesta == opcionElegida.innerHTML) {
    txt_msj.innerHTML = "Bravisimo, el mas pilas de tu casa de seguro";
    txt_msj.style.color = "white";
    setTimeout(comenzar,1500);
  } else {
    txt_msj.innerHTML = "No pana regresa al kindergarden o intenta de nuevo";
    txt_msj.style.color = "red";
    setTimeout(limpiar, 1500);
  }
}

function limpiar() {
  txt_resultado.innerHTML = "??";
  txt_msj.innerHTML = "";
}

comenzar();