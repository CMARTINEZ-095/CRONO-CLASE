const API_URL = "https://68df1237898434f41356ae93.mockapi.io/formularioRegistro";

  export function initRegistro() {
  const form = document.getElementById("formRegistro");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los valores del formulario
    const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const genero = document.getElementById("genero").value;
    const rol = document.getElementById("rol").value;
    const correo = document.getElementById("emailRegistro").value.trim();
    const contrasena = document.getElementById("passwordRegistro").value;
    const confirmarContrasena = document.getElementById("confirmarPassword").value;

     // Validaciones básicas
    if (!nombreCompleto || !cedula || !telefono || !correo || !contrasena) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
   
    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
        // Traer todos los usuarios y verificar si el correo ya existe
      const respuestaUsuarios = await fetch(API_URL);
      const usuarios = await respuestaUsuarios.json();

      const existeCorreo = usuarios.some(
        (u) => u.correo?.toLowerCase() === correo
      );

      if (existeCorreo) {
        alert("⚠️ Este correo ya está registrado. Intenta iniciar sesión.");
        return;
      }

      // 📝 Crear objeto con los datos del usuario
      const nuevoUsuario = {
        nombreCompleto,
        cedula,
        telefono,
        fechaNacimiento,
        genero,
        rol,
        correo,
        contrasena,
        confirmarContrasena
      };

      // 🚀 Enviar los datos a la API
      const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();
        alert(`Error: ${error.message || "No se pudo registrar el usuario"}`);
        return;
      }

      // const resultado = await respuesta.json();
      alert(" Registro exitoso");

      form.reset(); 

      // 🔹 Cierra el modal de Bootstrap
      const modalRegistro = bootstrap.Modal.getInstance(document.getElementById("modalRegistro"));
      if (modalRegistro) {
        modalRegistro.hide();
      }

      // 🔹 Redirige al login después de un breve retraso
      setTimeout(() => {
        window.location.href = "/index.html"; 
      }, 800);

    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert(" Ocurrió un error al enviar los datos. Revisa la consola.");
    }
  });
  }


