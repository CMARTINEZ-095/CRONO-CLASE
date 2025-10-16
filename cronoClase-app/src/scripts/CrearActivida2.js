let actividadesForm = document.getElementById("actividadesForm");

//let URL_init = "http://localhost:8080/api/activity";

let URL_init = "https://68eaea3776b3362414cc7043.mockapi.io/actividad";

let actividades = [];

// if user clicks edit, isEditing = true
// if user clicks cancel, isEditing = false
let isEditing = false;

let divMostratActividades = document.getElementById("actividadesCargadas");

divMostratActividades.style.visibility = "hidden";
//divMostratActividades.innerHTML =""

let EditFomularios = [];

let botonCargar = document.getElementById("btn-cargarM1");

botonCargar.addEventListener("click", async (e) => {
  await obtenerDatos();

  if (actividades.length != 0) {
    mostrarActividadesCargadas();
    console.log(EditFomularios);
    EditActivity(EditFomularios);
    DeleteActivites(EditFomularios);
  } else {
    divMostratActividades.style.visibility = "visible";
    divMostratActividades.innerHTML = "";
  }
});

actividadesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("aId").value;
  const payload = {
    //ID:id,
    nombre: document.getElementById("nombreActividad").value.trim(),
    fechaEntrega: document.getElementById("fechaEntrega").value,
    ponderacion: document.getElementById("porcentajeNota").value,
  };

  try {
    if (isEditing) {
      await updateAppt(id, payload);
    } else {
      await createAppt(payload);
    }

    // always set isEditing = false after submitting
    isEditing = false;

    console.log("Exito");
    resetForm();

    await obtenerDatos();
    mostrarActividadesCargadas();

    EditActivity(EditFomularios);
    DeleteActivites(EditFomularios);
  } catch (err) {
    console.log("Error Generado: " + err.message);
    isEditing = false;

    /*
    document.getElementById('formMsg').textContent = 'Error: ' + err.message;
    setTimeout(() => { document.getElementById('formMsg').textContent = ''; }, 3000);
 
      */
  }
});

async function obtenerDatos(URL = URL_init) {
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
    //console.log(actividades);
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

  if(actividades.length == 0){ divMostratActividades.innerHTML =""

  }

  actividades.forEach((act, i) => {
    divMostratActividades.innerHTML += `
    
    <div class="profesor-card" style="margin-top: 10px" id="${
      String(act.id) + "_divEditDelete"
    }">

          <div class="CRUD_btn">
            <h3>${act.nombre.charAt(0).toUpperCase() + act.nombre.slice(1)}</h3>

            <div>
              <button class="btn-guardar" id="${
                String(act.id) + "_btnEdit"
              }">Editar</button>



              <button class="btn-guardar" id="${
                String(act.id) + "_dltEdit"
              }">Borrar</button>


            </div>

          </div>


          <p><span class="label"> Fecha de entrega: </span> ${
            act.fechaEntrega
          } </p>
          <p><span class="label"> Porcentaje: </span>${act.ponderacion} </p>
    </div>

  

    
    `;
  });

  let EditFomularios2 = Array.from(divMostratActividades.children);

  EditFomularios2.forEach((form, i) => {
    EditFomularios.push(form);
  });
  //console.log(EditFomularios)
}

async function createAppt(payload) {
  const res = await fetch(URL_init, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error creando: ${res.status}`);
  return await res.json();
}

async function updateAppt(id, payload) {
  const res = await fetch(`${URL_init}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error actualizando: ${res.status}`);
   // show edit button
      document.getElementById("guardarMainForm").value = "Guardar";
      // show cancel button
      document.getElementById("CancelMainForm").hidden = true;


 
  return await res.json();
}

async function deleteAppt(id) {
  const res = await fetch(`${URL_init}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error borrando: ${res.status}`);
  // remove the item from the array
  // call the rerender (mostrar)
  
  actividades = actividades.filter(Act => Act.id!=id)
  mostrarActividadesCargadas()
  EditActivity(EditFomularios)
  DeleteActivites(EditFomularios)
  return true;
}

function EditActivity(EditFomulariosF) {
  let allBtnEdit = EditFomulariosF.map(
    (divID) =>
      Array.from(divID.getElementsByTagName("button")).filter(
        (B) => B.id == `${divID.id[0] + "_btnEdit"}`
      )[0]
  );
  console.log(allBtnEdit);

  allBtnEdit.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      console.log("ID clickeado:", event.target.id);

      // set global variable editing = true
      isEditing = true;

      // show edit button
      document.getElementById("guardarMainForm").value = "Guardar cambios";
      // show cancel button
      document.getElementById("CancelMainForm").hidden = false;

      // get id, set to document
      const id = event.target.id[0];
      // set the id for editing
      document.getElementById("aId").value = id;
      // set fields
    });
  });
}

const btnCancelEdit = document.getElementById("CancelMainForm");
btnCancelEdit.addEventListener("click", () => {
  isEditing = False;
});

function DeleteActivites(EditFomulariosF) {
  //_dltEdit

  let allBtnDel = EditFomulariosF.map(
    (divID) =>
      Array.from(divID.getElementsByTagName("button")).filter(
        (B) => B.id == `${divID.id[0] + "_dltEdit"}`
      )[0]
  );

  console.log(allBtnDel);

  allBtnDel.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const idDelAct = event.target.id[0];
      console.log("to delete: " + idDelAct);
      deleteAppt(idDelAct);
    });
  });
}





