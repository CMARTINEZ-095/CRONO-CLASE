const contenido = document.getElementById("actividadAPI");

async function obtenerUsuarios() {
  const contenido = document.getElementById("actividadAPI");

  fetch("")
    .then((response) => response.json())

    .then((data) => {
      const lista = document.getElementById("actividadAPI");
      data.forEach((tarea) => {
        //contenido.innerHTML += `<p>${tarea.titulo} - entrega: ${tarea.fecha_entrega}</p>`

        contenido.innerHTML += `<div class="actividad">
         
                  <strong> ${tarea.titulo} <img src="img/quizas.png" alt=""></strong>
                  <p>Fecha: ${tarea.fecha_entrega}</p>
                  <div class="estado-info">
                    <span class="estado pendiente">Pendiente</span>
                  </div>`;
      });
    });
}
