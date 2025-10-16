//este script muestra los datos de 3 materias UNICAMENTE!!

let URL = 'http://localhost:3001/materia'

//en infoMateria se guara ca uno de los objetos materia
//que vienen desde el Mockoon

let infoMateria = []


function renderAppts(){

  //Lo que hace esta funcion es mostrar los datos de las materias obtenidos
  //desde el Mockoon

  let cardMateriaError = document.getElementById("showError")
  let showConetido = document.querySelector(".profesores-container")
 

    if (!Array.isArray(infoMateria) || infoMateria.length === 0) {

      //si no hay datos, es decir el Json traido desde el Mockoon
      //está vacio, entonces se escribe en la pagina que no hay materias
      //para mostrar
     
       cardMateriaError.textContent = `No se encontraron materias`;
      showConetido.style.visibility = "hidden";
      
    return;
  }

  //En caso de que el JSON tenga datos, se hace visible el panel
  //de las materias y se muestran los datos de las materias

   
  cardMateriaError.textContent = `Materias del semestre`;
   
  showConetido.style.visibility = "visible";

  

  

  for(let materia of infoMateria ){

    //se ubica la materia, segun su ID, y se compara con el ID contenido en el JSON
    //para esto se usa la manipulacion del DOM
    

    let cardMateria =document.getElementById(materia.id)
     console.log(cardMateria)

     //se inserta la informacion en los campos correspondientes. Los campos proviene del div
    // llamado cardMateria
   
    
    cardMateria.querySelector("h3").textContent = materia.nombre
    console.log(cardMateria.querySelector(".NPM"))
    cardMateria.querySelector(".NPM").innerHTML = `<p class="NPM"><span class="label" >Pofesor:</span> ${materia.nombre_profesor}</p>`
    cardMateria.querySelector(".CPM").innerHTML = `<p class="CPM"><span class="label ">Correo:</span> ${materia.correo_profesor}</p>`
    
    cardMateria.querySelector(".DHM").innerHTML =  `<p class="DHM">${materia.dias_horario}</p>`
    cardMateria.querySelector(".HHM").innerHTML =  `<p class="DHM">${materia.horas_horario}</p>`
    
  }


  
}




async function loadAppts() {
  if (!URL || URL.trim() === '') {
    
    
    return;
  }
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    infoMateria = Array.isArray(data) ? data.map(d => ({ id: d.ID, nombre: d.nombre, nombre_profesor: d.nombre_profesor, correo_profesor: d.correo_profesor, dias_horario: d.dias_horario, horas_horario: d.horas_horario })) : [];
   
    
    renderAppts();
  } catch (err) {
    let cardMateriaError = document.getElementById("showError")
    let showConetido = document.querySelector(".profesores-container")
   
   
    cardMateriaError.textContent = `Error cargando materias: ${err.message}`;
    showConetido.style.visibility = "hidden"
    
  }
}

loadAppts()












