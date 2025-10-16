

//se toman los elemnetos d ela tabla en done se deb escribir el mes y año

let mes = document.getElementById("mes")
let year = document.getElementById("yearCal")


//se toma la fecha de hoY
const hoy = new Date();
const mesCal = hoy.getMonth() ; 
const yearCal = hoy.getFullYear() ;// +1 porque enero = 0


let meses = ["Ene", "Feb", "Mar", "Abr","May", "Jun", "Jul", "Ags", "Sep", "Oct", "Nov", "Dec"]

//se toma el inidice del mes actual y se busca en la lista de meses
//se escribe en la casilla correspondiente
mes.textContent = meses[mesCal]

//se toma el año y se escribe en la casilla cosrrespondiente
year.textContent = yearCal

/************************************/
//esto hace el calculo para identificar el lunes
const diaSemana = hoy.getDay();
console.log(diaSemana);


const lunes = new Date(hoy);
lunes.setDate(hoy.getDate() - ((diaSemana + 6) % 7));
/************************************/

//con esto se llenan las fechas de la semana presente

const diasSemana = [];

for (let i = 0; i < 5; i++) {
  const dia = new Date(lunes);
  dia.setDate(lunes.getDate() + i);
  diasSemana.push(dia.getDate()); // formato YYYY-MM-DD
}


//Con esto se escribe en las casillas correspondientes las fechas
//de acuerso a la semana presente
const strDiaSemana = ["Lu", "Ma","Mi","Ju","Vi"]
let fechaCal = document.querySelectorAll("#fechaCal")

//aqui se escribe en el calendario los dias de acuerdo con el presente
fechaCal.forEach((diaEle, i) => {diaEle.innerHTML += `${diasSemana[i]} <br> ${strDiaSemana[i]} `})


/***************carga de actividades en el calendario*****************/
const lista = document.querySelectorAll("#mat1");
const listaMat2 = document.querySelectorAll("#mat2");     
const listaMat3 = document.querySelectorAll("#mat3");     


//se toman las fechas del calendario y se crea un array
const fechasArray = Array.from(fechaCal)

//se toman las fechas del calendario 
const fechasSemana = fechasArray.map(itemFecha => itemFecha.textContent);

8
//se cargan las actividades desde la API

function cargarDesde(ruta, listaTarget) {
  if (!ruta || ruta.trim() === '') {
    console.warn('ruta vacía para cargar actividades, se omite');
    return Promise.resolve();
  }
  return fetch(ruta)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((tarea) => {
        const fechaTexto = tarea.fechaEntrega;
        const [año, mes, dia] = fechaTexto.split("-");
        const fechaProcess = new Date(año, mes-1, dia);
        let dayCalendarIndex = fechaProcess.getDay()-1;

        for (const i of fechasSemana) {
          if (i.includes(dia)) {
            listaTarget[dayCalendarIndex].textContent = tarea.nombre;
          }
        }
      });
    })
  .catch((err) => console.error(`Error cargando ${ruta}:`, err));
}

// llamadas de ejemplo (descomenta y ajusta endpoints según tu mock/server)
// cargarDesde('tareas', lista);
// cargarDesde('mat2', listaMat2);
// cargarDesde('mat3', listaMat3);
// cargarDesde('http://localhost:8080/api/activity', lista);

// ejemplo activo (ajusta si no quieres hacer la petición)
cargarDesde('https://68eaea3776b3362414cc7043.mockapi.io/actividad', lista);



