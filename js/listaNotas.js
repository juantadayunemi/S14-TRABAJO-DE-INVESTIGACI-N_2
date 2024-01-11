if (!window.tbody) {
    let tbody= null;
    let formAgregar = null;
    let formUpdate  = null;
    let _index = -1;
    let _nameAdd  = null ;
    let _nameUpdate  = null ;
    let _califAdd  = null ;
    let _califUpdate  = null ;
    let data  = null;
}

 tbody= null;
 formAgregar = null;
 formUpdate  = null;
 _index = -1;
 _nameAdd  = null ;
 _nameUpdate  = null ;
 _califAdd  = null ;
data = null;

function LoadGame() {

    //load data 
    loadData();

    //read then controls
    {
        tbody = document.querySelector("tbody");
        formAgregar = document.getElementById("formAgregar");
        formUpdate = document.getElementById("btnUpdate");
        _nameAdd  =  document.getElementById("nameAdd");
        _nameUpdate  = document.getElementById("nameUpdate");
        _califAdd  =  document.getElementById("califAdd");
        _califUpdate  = document.getElementById("califUpdate");

    }
    
    // add event handler
    formAgregar.addEventListener("submit", function (event) {
        event.preventDefault();
    
        // Agrega un nuevo elemento al array de datos
        data.push({
            id: data.length + 1,
            nombre: _nameAdd.value,
            calificacion: _califAdd.value,
        });

        // Cierra el modal de agregar
        let addModalElement = document.getElementById("agregarModal");
        let addModal = new bootstrap.Modal(addModalElement);
        addModal.hide();

        // Renderiza la tabla actualizada
        renderTable();

        _nameAdd.value = "";
        _califAdd.value = 0;

    });

     // update event handler
    formUpdate.addEventListener("click", function (event) {

        event.preventDefault();

        const name =_nameUpdate.value;
        const calif =_califUpdate.value;
    
        console.log(name, calif);

        // Agrega un nuevo elemento al array de datos
        data[_index]  = ({
            id: _index+1,
            nombre: name,
            calificacion: calif
        });
    

        const updateModal = new bootstrap.Modal(document.getElementById("editarModal"));
        updateModal.hide();

        // Renderiza la tabla actualizada
        renderTable();
    
        // Cierra el modal de agregar
        _nameUpdate.value = "";
        _califUpdate.value = 0;
   
    });

    // Load the data defaul...
    renderTable()

}


// Mock del array de datos
function loadData(){
    data = [
        { id: 1, nombre: "Carlo Samaniego", calificacion  : 9.3},
        { id: 2, nombre: "Luis Verdezoto",  calificacion : 8.58 },
        { id: 3, nombre: "David Gavilanez",  calificacion : 5.63 },
        { id: 4, nombre: "Edwar Montenegro",  calificacion : 8.63 },
        { id: 5, nombre: "Karla Salazar",  calificacion : 8.63 },
        { id: 6, nombre: "Scarleth Cadena",  calificacion : 5.63 },
        { id: 7, nombre: "Patricio Cadena",  calificacion : 9.63 },
        { id: 8, nombre: "Luis Montero",  calificacion : 6.63 },
        { id: 9, nombre: "Luisa Montoya",  calificacion : 8.63 },
        { id: 10, nombre: "Cristian Veltran",  calificacion : 3.63 },
        // Agrega más elementos según sea necesario
    ];
}



// Función para renderizar la tabla
function renderTable() {
    tbody.innerHTML = "";

    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${item.id}</td>
          <td>${item.nombre}</td>
          <td>${item.calificacion}</td>
          <td>
            <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="updateElemento(${item.id})">
            Editar</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="eliminarElemento(${item.id})">
              Eliminar
            </button>
          </td>
        `;
        tbody.appendChild(tr);
    });

    //read table
    let califColumn = document.querySelectorAll('tbody td:nth-child(3)');;
    let totalCalif = 0;

    califColumn.forEach(td => {
        totalCalif += parseFloat(td.textContent) || 0;
    });

    const promedioCalif = totalCalif / califColumn.length;

    // Actualiza los valores en la fila del pie de página
    document.getElementById('totalCalif').textContent = totalCalif.toFixed(2);
    document.getElementById('numList').textContent =  califColumn.length.toFixed(0);
    document.getElementById('promedioCalif').textContent = promedioCalif.toFixed(2); 
 

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

        renderTable();

        _index  = index
        _nameUpdate.value  = data[index].nombre;
        _califUpdate.value  = data[index].calificacion;

        setTimeout(function() {
            const controlFoco = document.getElementById("nameUpdate");
            controlFoco.focus();
        }, 500);

    }
};

function stopGame(){

};