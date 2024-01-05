
let tbody= null;
let formAgregar = null;
let formUpdate  = null;
let _index = -1;
let _nameInput  = null ;
let _nameUpdate  = null ;


function LoadGame() {

    tbody = document.querySelector("tbody");
    formAgregar = document.getElementById("formAgregar");
    formUpdate = document.getElementById("formUpdate");
    _nameInput  =  document.getElementById("nombreAgregar");
    _nameUpdate  = document.getElementById("nameUpdate");


    formAgregar.addEventListener("submit", function (event) {
        event.preventDefault();
    
        // Agrega un nuevo elemento al array de datos
        data.push({
            id: data.length + 1,
            nombre: _nameInput.value,
        });

        // Cierra el modal de agregar
        let addModalElement = document.getElementById("agregarModal");
        let addModal = new bootstrap.Modal(addModalElement);
        addModal.hide();

        // Renderiza la tabla actualizada
        renderTable();
    
    
        _nameInput.value = "";

    });

    
    formUpdate.addEventListener("submit", function (event) {
        event.preventDefault();
        const name =_nameUpdate.value;
    
        // Agrega un nuevo elemento al array de datos
        data[_index]  = ({
            id: _index+1,
            nombre: name,
        });
    
        const updateModal = new bootstrap.Modal(document.getElementById("editarModal"));
        updateModal.hide();

        // Renderiza la tabla actualizada
        renderTable();
    
        // Cierra el modal de agregar
        _nameUpdate.value = "";
      
   
    });

    // Llamada inicial para renderizar la tabla
    renderTable();

}



// Mock del array de datos
const data = [
    { id: 1, nombre: "Elemento 1" },
    { id: 2, nombre: "Elemento 2" },
    // Agrega más elementos según sea necesario
];

// Función para renderizar la tabla
function renderTable() {
    tbody.innerHTML = "";
    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.nombre}</td>
          <td>
            <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="updateElemento(${item.id})">
              Editar
            </button>
            <button type="button" class="btn btn-danger btn-sm" onclick="eliminarElemento(${item.id})">
              Eliminar
            </button>
          </td>
        `;
        tbody.appendChild(tr);
    });
}



// Función para eliminar un elemento del array de datos
window.eliminarElemento = function (id) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        renderTable();
    }
};

// Función para actualizar un elemento del array de datos
window.updateElemento = function (id) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        _index  = index
        _nameUpdate.value  = data[index].nombre;

        setTimeout(function() {
            const controlFoco = document.getElementById("nameUpdate");
            controlFoco.focus();
        }, 500);

    }
};

function stopGame(){

};