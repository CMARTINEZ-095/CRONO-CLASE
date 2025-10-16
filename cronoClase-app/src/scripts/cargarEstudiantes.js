async function obtenerUsuariosPlayground() {
  try {
    const respuesta = await fetch('http://localhost:3000/Estudiantes');
    if (!respuesta.ok) {
      throw new Error(Error HTTP: ${respuesta.status});
    }
    const usuarios = await respuesta.json();
    console.log('Usuarios obtenidos desde Mockoon Playground:', usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
  }
}

obtenerUsuariosPlayground();