let actividadesForm = document.getElementById("actividadesForm");

let URL = "https://68eaea3776b3362414cc7043.mockapi.io/actividad";

let actividades = [];

let divMostratActividades = document.getElementById("actividadesCargadas");

divMostratActividades.style.visibility = "hidden";
//divMostratActividades.innerHTML =""







let botonCargar = document.getElementById("btn-cargarM1");

let botonEditar = doucument.getElementById("btnEditAct")



botonCargar.addEventListener("click", async (e) => {
  await obtenerDatos();

  if (actividades.length != 0) {
    mostrarActividadesCargadas();
  } else {
    divMostratActividades.style.visibility = "visible";
    divMostratActividades.innerHTML = "";
  }
});


botonEditar.addEventListener("submit", async (e) =>{

  let id_Act = document.getElementById("")


  const res = await fetch(`${MOCKAPI_APPTS_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });





})








actividadesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("aId").value;
  const payload = {
    nombre: document.getElementById("nombreActividad").value.trim(),
    fechaEntrega: document.getElementById("fechaEntrega").value,
    ponderacion: document.getElementById("porcentajeNota").value,
  };

  try {
    //if (!MOCKAPI_APPTS_URL || MOCKAPI_APPTS_URL.trim() === '') throw new Error('MOCKAPI_APPTS_URL no configurada');

    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Error creando: ${res.status}`);
    console.log("Exito");
    resetForm();

    await obtenerDatos();
    mostrarActividadesCargadas();

    //const data = await res.json();
    //console.log(data)

    /*
    
    if (id && id.trim() !== '') {
      await updateAppt(id, payload);
    } else {
      await createAppt(payload);
    }
    resetForm();
    await loadAppts();*/
  } catch (err) {
    console.log("Error Generado: " + err.message);

    /*
    document.getElementById('formMsg').textContent = 'Error: ' + err.message;
    setTimeout(() => { document.getElementById('formMsg').textContent = ''; }, 3000);
 
      */
  }
});

async function obtenerDatos() {
  try {
    const respuesta = await fetch(URL);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    // console.log('Datos recibidos:', datos);

    actividades = Array.isArray(datos)
      ? datos.map((d) => ({
          id: Number(d.id),
          nombre: d.nombre,
          fechaEntrega: d.fechaEntrega,
          ponderacion: d.ponderacion,
        }))
      : [];
    console.log(actividades);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function resetForm() {
  actividadesForm.reset();
  document.getElementById("aId").value = "";
}

function mostrarActividadesCargadas() {
  divMostratActividades.style.visibility = "visible";
  divMostratActividades.innerHTML = "";

  actividades.forEach((act, i) => {
    divMostratActividades.innerHTML += ` <div class="profesor-card" style="margin-top: 10px">

          <div class="CRUD_btn">
            <h3 id="${String(act.id)+"_Act"}">${act.nombre}</h3>

            <div>
              <button class="btn-guardar">Editar</button>
              <button class="btn-guardar">Borrar</button>


            </div>

          </div>




          <p><span class="label"> Fecha de entrega: </span> ${act.fechaEntrega} </p>
          <p><span class="label"> Porcentaje: </span>${act.ponderacion} </p>
        </div>
    
    
    
    `;
  });
}




