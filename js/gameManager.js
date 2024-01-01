
const  gameManager = document.getElementById("game-manager");

let scriptElement; // Variable para almacenar el elemento del script actual

function deleteOldPage() {
    // Elimina el script anterior si existe
    if (scriptElement) {
        stopGame(); // stop old gamer 
        document.head.removeChild(scriptElement);
        console.log("Script anterior eliminado.");
    }
    gameManager.innerHTML = '';
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

//Function that loads the js file and starts the game
function loadScrip(nameFile){
    loadDynamicScript(nameFile)
    .then(() => {
        console.log(`${nameFile} cargado exitosamente`);
        LoadGame();
    })
    .catch(error => {
        console.log(`Error al cargar ${nameFile}`, error);
    });
}

function cargarContenido(page) {
    const url = `./pages/${page}.html`;

    deleteOldPage();

    fetch(url)
        .then(response => response.text())
        .then(data => {
            gameManager.innerHTML = data;
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
            }
        })
        .catch(error => {
            console.log(`Error al cargar la página parcial: ${error}`);
            console.log(error);
        });
}
