
const  contentContainer = document.getElementById("content-container");

function cargarContenido(page) {
    const url = `./pages/${page}.html`;

    fetch(url)
        .then(response => response.text())
        .then(data => {
            contentContainer.innerHTML = data;
            LoadJuego();
        })
        .catch(error => {
            console.log(`Error al cargar la página parcial: ${error}`);
            console.log(error);
        });
}

