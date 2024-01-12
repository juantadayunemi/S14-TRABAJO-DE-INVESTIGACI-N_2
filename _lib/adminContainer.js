
const  cardContainer = document.getElementById("card_container");
const  gameConatiner = document.getElementById("game_container");

document.addEventListener("DOMContentLoaded", function ()
{
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            
            let page = this.getAttribute("href");
          
            //Efecto de color
            navLinks.forEach(link => {
                link.classList.remove("text-warning");
            });

            this.classList.add("text-warning");

            //carga  página parcial
            loadPartialPage(page);
        });
    });

    function loadPartialPage(page) {

        if (page === null || page === undefined) {
            cardContainer.innerHTML = null;
            gameConatiner.innerHTML  = null;
            return;
        }

    console.log(page);
     let url = `./pages/${page}.html`;
        
        fetch(url)
            .then(response => response.text())
            .then(data => {
                
                //carga las tarjetas de grupos de juego
                cardContainer.innerHTML = data;
                cardContainer.classList.remove("hide");
                gameConatiner.innerHTML  = null;
            })
            .catch(error => {
                console.log(`Error al cargar la página parcial: ${error}`);
                console.log(error);
            });

    }

});
