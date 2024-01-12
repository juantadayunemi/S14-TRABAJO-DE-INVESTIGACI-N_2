if (!window.npreguntas) {
  let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

let pregunta;
let posibles_respuestas;
let npreguntas = []
let preguntas_hechas = 0;
let preguntas_correctas = 0;
let suspender_botones = false;
let interprete_bp = null
}
preguntas_aleatorias = true;
mostrar_pantalla_juego_términado = true;
reiniciar_puntos_al_reiniciar_el_juego = true;
interprete_bp = [
  {
      "categoria": "Cultura general",
      "pregunta": "¿Quién escribio La Odisea?",
      "respuesta": "Homero",
      "incorrecta1": "Donday del combo amarillo",
      "incorrecta2": "Walter White",
      "incorrecta3": "Orlando Herrera",
      "imagen": "https://i.ibb.co/JCs9sHG/homero.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿Cómo se llama la Reina del Reino Unido?",
      "respuesta": "Isabel II",
      "incorrecta1": "Isabella de Phineas y Ferb",
      "incorrecta2": "Lain",
      "incorrecta3": "Selina Kyle",
      "imagen": "https://i.ibb.co/wyrbrfc/Isabella-phineas.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿Quién pintó “la última cena”?",
      "respuesta": "Leonardo Da Vinci",
      "incorrecta1": "Leonardo Di Caprio",
      "incorrecta2": "Lionel Messi",
      "incorrecta3": "Michelangelo Caravaggio",
      "imagen": "https://i.ibb.co/zQNTyQS/Dise-o-sin-t-tulo.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿Cómo se llama la estación espacial rusa?",
      "respuesta": "Estacion Mir",
      "incorrecta1": "Estrella de la muerte",
      "incorrecta2": "Estacion Cooper",
      "incorrecta3": "Estacion Espacio Profundo",
      "imagen": "https://i.ibb.co/1KyNsZ9/estacion-espacial.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿A quién le crecia la nariz cuando mentia?",
      "respuesta": "Pinocho",
      "incorrecta1": "Tony Bola",
      "incorrecta2": "Abogado Agapito",
      "incorrecta3": "Pitufina",
      "imagen": "https://i.ibb.co/s9drvNd/pinochin.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿De qué lengua proviene el español?",
      "respuesta": "Latin",
      "incorrecta1": "Mandarin",
      "incorrecta2": "Ingles",
      "incorrecta3": "Arabico",
      "imagen": "https://i.ibb.co/vwhmJ6P/idiomas.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿Quién “sabía que no sabía nada”?",
      "respuesta": "Socrates",
      "incorrecta1": "Platon",
      "incorrecta2": "Pedrito, el de la Milagro School",
      "incorrecta3": "Isaac Newton",
      "imagen": "https://i.ibb.co/86yzzdD/socrates.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿Como se llama el mar de Bolivia donde se encontraron restos fosiles?",
      "respuesta": "Bolivia no tiene mar",
      "incorrecta1": "Persian Gulf",
      "incorrecta2": "Black sea",
      "incorrecta3": "Baltic",
      "imagen": "https://i.ibb.co/LQF0Zs6/mar-b.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿Cuánto vale el número pi?",
      "respuesta": "3.14",
      "incorrecta1": "2.14516",
      "incorrecta2": "9.81",
      "incorrecta3": "5x10^5657",
      "imagen": "https://i.ibb.co/KqfvGGk/pi.jpg",
      "objectFit": "contain"
  },
  {
      "categoria": "Cultura general",
      "pregunta": "¿Quién fue el padre de las computadoras?",
      "respuesta": "Charles Babbage",
      "incorrecta1": "Spopovich",
      "incorrecta2": "Benjamin K. Tennyson",
      "incorrecta3": "Victor Vance",
      "imagen": "https://i.ibb.co/FH6mssp/babbage.jpg",
      "objectFit": "contain"
  }

]

pregunta= 0;
posibles_respuestas = 0;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
npreguntas = [];

preguntas_hechas = 0;
preguntas_correctas = 0;

function LoadGame(){
  escogerPreguntaAleatoria();
}
function stopGame(){

}
function escogerPreguntaAleatoria() {
  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= interprete_bp.length) {
      n = 0;
    }
    if (npreguntas.length == interprete_bp.length) {
      //Aquí es donde el juego se reinicia
      if (mostrar_pantalla_juego_términado) {
        swal.fire({
          title: "Juego finalizado",
          text:
            "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas - 1),
          icon: "success"
        });
      }
      if (reiniciar_puntos_al_reiniciar_el_juego) {
        preguntas_correctas = 0
        preguntas_hechas = 0
      }
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "lightgreen";
  } else {
    btn_correspondiente[i].style.background = "pink";
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
}

// let p = prompt("numero")

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "grey";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

