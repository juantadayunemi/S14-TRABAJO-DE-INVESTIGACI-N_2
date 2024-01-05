
const gameConatiner = document.getElementById("game_container");
let scriptElement; // Variable para almacenar el elemento del script actual

function cargarContenido(page) {
    const url = `./pages/${page}.html`;

    deleteOldPage();
console.log(page);
    fetch(url)
        .then(response => response.text())
        .then(data => {

            //carga página de juegos
            gameConatiner.innerHTML = data;

            //Elimina y carga archivos de js para cada juego
            switch (page) {
                case "mentales/memoriaMaestra":
                    loadScrip('menteMaestra');
                    break;
                case "mentales/adivinanzaVisual":
                    loadScrip('adivinanzaVisual');
                    break;
                case "mentales/memoriaSecuencial":
                    loadScrip('memoriaSecuencial');
                    break;
                case "reflejos/numerosCayendo":
                    loadScrip('numerosCayendo');
                    break;
                case "tablas/listaNotas":
                    loadScrip('listaNotas');
                    break;
            }
        })
        .catch(error => {
            console.log(`Error al cargar la página parcial: ${error}`);
            console.log(error);
        });
}

//Function that loads the js file and starts the game
function loadScrip(nameFile) {
 
    loadDynamicScript(nameFile)
        .then(() => {
            console.log(`${nameFile} cargado exitosamente`);
            LoadGame();
        })
        .catch(error => {
            console.log(`Error al cargar ${nameFile}`, error);
        });
}


function loadDynamicScript(nombreArchivo) {

    if (document.querySelector(`script[src="${nombreArchivo}.js"]`)) {
        return Promise.resolve();
    }

    const ruta = `/js/${nombreArchivo}.js`;

    // Crea un nuevo script y asigna la ruta
    scriptElement = document.createElement('script');
    scriptElement.src = ruta;

    return new Promise((resolve, reject) => {
        scriptElement.onload = () => {
            // Resuelve la promesa después de cargar el nuevo script
            resolve();

        };
        scriptElement.onerror = reject;
        document.head.appendChild(scriptElement);
    });
}

// Elimina el script anterior si existe
function deleteOldPage() {

    if (scriptElement) {
        stopGame(); // stop old gamer 
        document.head.removeChild(scriptElement);
        console.log("Script anterior eliminado.");
    }
    gameConatiner.innerHTML = '';
}