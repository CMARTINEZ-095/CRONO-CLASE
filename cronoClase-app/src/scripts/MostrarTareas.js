const contenido = document.getElementById("actividadAPI");

async function obtenerUsuarios() {
  const contenido = document.getElementById("actividadAPI");

    const cont = document.getElementById('actividadAPI');
    if (!cont) return;
    const ENDPOINT = 'https://68df2db0898434f41356f070.mockapi.io/tarea';
    if (!ENDPOINT) {
      cont.innerHTML = '<p class="error">Endpoint no configurado para tareas</p>';
      return;
    }
    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      cont.innerHTML = '';
      data.forEach((tarea) => {
        const titulo = tarea.titulo || tarea.nombre || 'Actividad';
        const fecha = tarea.fecha_entrega || tarea.fechaEntrega || '';
        cont.innerHTML += `
          <div class="actividad">
            <strong>${escapeHtml(titulo)} <img src="../src/assets/img/quizas.png" alt=""></strong>
            <p>Fecha: ${escapeHtml(fecha)}</p>
            <div class="estado-info"><span class="estado pendiente">Pendiente</span></div>
          </div>`;
      });
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      cont.innerHTML = '<p class="error">No se pudieron cargar las tareas. Intenta nuevamente más tarde.</p>';
    }
}



async function obtenerTareasMat3(contenedorId) {
  const contenido = document.getElementById(contenedorId);

    const cont = document.getElementById(contenedorId);
    if (!cont) return;
    const ENDPOINT = 'http://localhost:3001/mat3';
    if (!ENDPOINT) return;
    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      cont.innerHTML = '';
      data.forEach((tarea) => {
        const titulo = tarea.titulo || tarea.nombre || 'Actividad';
        const fecha = tarea.fecha_entrega || tarea.fechaEntrega || '';
        cont.innerHTML += `
          <div class="actividad">
            <strong>${escapeHtml(titulo)} <img src="../src/assets/img/quizas.png" alt=""></strong>
            <p>Fecha: ${escapeHtml(fecha)}</p>
            <div class="estado-info"><span class="estado pendiente">Pendiente</span></div>
          </div>`;
      });
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      cont.innerHTML = '<p class="error">No se pudieron cargar las tareas. Intenta nuevamente más tarde.</p>';
    }

function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, (c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }
}
