

//se toman los elemnetos d ela tabla en done se deb escribir el mes y año

let mes = document.getElementById("mes")
let year = document.getElementById("yearCal")


//se toma la fecha de hoy
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
     


//se toman las fechas del calendario y se crea un array
const fechasArray = Array.from(fechaCal)

//se toman las fechas del calendario 
const fechasSemana = fechasArray.map(itemFecha => itemFecha.textContent);



//se cargan las actividades desde la API

fetch("")
    .then((response) => response.json())

    .then((data) => {
      

      
      data.forEach((tarea) => {

        //se toman las fehcas de las tareas obtenidas desde mockoon
        
        const fechaTexto = tarea.fecha_entrega;
        const [año, mes, dia] = fechaTexto.split("-");
        const fechaProcess = new Date(año, mes-1, dia);
        let dayCalendarIndex = fechaProcess.getDay()-1

        //se verifica que la fecha de las actividades cargadas exista en la semana
        //que se está presentando en el calendario
            
        for( i of fechasSemana)  {

              if(i.includes(dia)){

                //si la fecha si esta en la semana, entonces se carga el nombre
                //de la actividad en el lugar correspondiente
                    lista[dayCalendarIndex].textContent =tarea.titulo
                    
              }
        }
            
            
            

           // console.log([año, mes, dia])
            
        

        
      });
    });


