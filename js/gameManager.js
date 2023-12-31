
const  gameManager = document.getElementById("game-manager");

let scriptElement; // Variable para almacenar el elemento del script actual


function loadDynamicScript(nombreArchivo) {
    const ruta = `/js/${nombreArchivo}.js`;

    // Elimina el script anterior si existe
    if (scriptElement) {
        document.head.removeChild(scriptElement);
    }

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

    fetch(url)
        .then(response => response.text())
        .then(data => {
            console.log(page);
            gameManager.innerHTML = data;
            switch (page)
            {
                case "mentales/memoriaMaestra":
                    loadScrip('menteMaestra');
                    break;
                case "mentales/adivinanzaVisual":
                    loadScrip('adivinanzaVisual');
                    break
                
            }
       
        })
        .catch(error => {
            console.log(`Error al cargar la página parcial: ${error}`);
            console.log(error);
        });
}


