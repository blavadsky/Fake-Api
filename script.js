fetch("https://backapi-q1wm.onrender.com/users", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5Zjc3NTFhNi1jYTZmLTQ2MzItYTgxYS1hZTc0NGNiNmVjYTEiLCJpYXQiOjE3MjkzMDUxNjV9.VotboVZbauNsLgHLyk7OswVjYoVvrgxuUIM2BL6jsVMT7f72AaM7sUlqm6YXbS0-yThNrf6IWwiv_5LMIZovCg"
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const list = document.getElementById("list");
    data.forEach(contact => {
      const il = document.createElement("li");

      const myhtml = ` 
      <div class="card" style="width: 18rem; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); margin: 35px; border: 2.5px solid gold; margin-top: 50px; background-color: rgb(215, 211, 206)">
        <img src="${contact.phone}" class="card-img-top" style="width: 100%; height: 200px; object-fit: cover; cursor: pointer;">
        <div class="card-body">
          <h5 class="card-title">${contact.first_name}</h5>
          <p class="card-text"> ${contact.last_name}</p>
          <p class="card-text"> Precio: ${contact.email}</p>
          <a class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadUserData(${contact.contact_id})">Editar</a>
          <a onclick="deleteUser(${contact.contact_id})" class="btn btn-danger">Eliminar</a>
        </div>
      </div>
    `;
      il.innerHTML = myhtml;
      il.style.display = "block";
      list.appendChild(il);
    });
  })
  .catch(err => console.error("Error al cargar los usuarios", err));

  let isEditing = false;

  //Solicitar el modal agregar producto
  document.querySelector('.btn-primary[data-bs-target="#staticBackdrop"]').addEventListener('click', () => {
    document.getElementById("tituloModal").textContent = "Agregar NFT";
    clearForm();
    isEditing = false;
  });
  
  function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("value").value = "";
    document.getElementById("image").value = "";
    document.getElementById("productId").value = "";
  }

  function sendForm() {
    // Obtener los valores del formulario
    const firstName = document.getElementById("title").value;  // Nombre del NFT (o usuario)
    const lastName = document.getElementById("description").value; // Descripción
    const email = document.getElementById("value").value;  // Precio o email
    const phone = document.getElementById("image").value;  // URL de la imagen o teléfono
    const userId = document.getElementById("productId").value; // ID del usuario (para edición)
  
    // Verificar si los campos están completos
    if (!firstName || !lastName || !email || !phone) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    // Crear el objeto que se enviará en la solicitud
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone
    };
  
    // Verificar si estamos editando o creando un nuevo usuario
    if (isEditing) {
      // Enviar la solicitud PATCH para editar un usuario
      fetch(`https://backapi-q1wm.onrender.com/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5Zjc3NTFhNi1jYTZmLTQ2MzItYTgxYS1hZTc0NGNiNmVjYTEiLCJpYXQiOjE3MjkzMDUxNjV9.VotboVZbauNsLgHLyk7OswVjYoVvrgxuUIM2BL6jsVMT7f72AaM7sUlqm6YXbS0-yThNrf6IWwiv_5LMIZovCg", // Token de autorización
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
        .then(res => res.json())
        .then(res => {
          console.log("Usuario actualizado", res);
          location.reload(); // Recargar la página después de actualizar
        })
        .catch(err => console.error("Error al actualizar el usuario", err));
    } else {
      // Enviar la solicitud POST para crear un nuevo usuario
      fetch("https://backapi-q1wm.onrender.com/users", {
        method: "POST",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5Zjc3NTFhNi1jYTZmLTQ2MzItYTgxYS1hZTc0NGNiNmVjYTEiLCJpYXQiOjE3MjkzMDUxNjV9.VotboVZbauNsLgHLyk7OswVjYoVvrgxuUIM2BL6jsVMT7f72AaM7sUlqm6YXbS0-yThNrf6IWwiv_5LMIZovCg", // Token de autorización
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
        .then(res => res.json())
        .then(res => {
          console.log("Usuario creado", res);
          location.reload(); // Recargar la página después de crear
        })
        .catch(err => console.error("Error al crear el usuario", err));
    }
  }
  
  // Esta función se utiliza para cargar los datos de un usuario para editar
  function loadUserData(contact_id) {
    console.log("ID del usuario para editar:", contact_id);
    fetch(`https://backapi-q1wm.onrender.com/users/${contact_id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5Zjc3NTFhNi1jYTZmLTQ2MzItYTgxYS1hZTc0NGNiNmVjYTEiLCJpYXQiOjE3MjkzMDUxNjV9.VotboVZbauNsLgHLyk7OswVjYoVvrgxuUIM2BL6jsVMT7f72AaM7sUlqm6YXbS0-yThNrf6IWwiv_5LMIZovCg", // Token de autorización
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Datos del usuario para editar:", data);
        // Cargar los datos en el formulario
        document.getElementById("title").value = data.first_name;
        document.getElementById("description").value = data.last_name;
        document.getElementById("value").value = data.email;
        document.getElementById("image").value = data.phone;
        document.getElementById("productId").value = data.contact_id; // Establecer el ID del producto
  
        isEditing = true; // Cambiar el estado a edición
        document.getElementById("tituloModal").textContent = "Editar Usuario"; // Cambiar el título del modal
      })
      .catch(err => console.error("Error al cargar el usuario", err));
  }
  

function deleteUser(contact_id) {
  fetch(`https://backapi-q1wm.onrender.com/users/${contact_id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5Zjc3NTFhNi1jYTZmLTQ2MzItYTgxYS1hZTc0NGNiNmVjYTEiLCJpYXQiOjE3MjkzMDUxNjV9.VotboVZbauNsLgHLyk7OswVjYoVvrgxuUIM2BL6jsVMT7f72AaM7sUlqm6YXbS0-yThNrf6IWwiv_5LMIZovCg",
    },
  })
    .then(res => res.json())
    .then(res => {
      console.log("Usuario eliminado", res);
      location.reload(); 
    })
    .catch(err => console.error("Error al eliminar el usuario", err));
}
/*
function sendForm() {
  const firstName = document.getElementById('title').value; 
  const lastName = document.getElementById('description').value; 
  const email = document.getElementById('value').value; 
  const phone = document.getElementById('image').value; 

  const userData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone
  };

  if (!firstName || !lastName || !email || !phone) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  fetch("https://backapi-q1wm.onrender.com/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5Zjc3NTFhNi1jYTZmLTQ2MzItYTgxYS1hZTc0NGNiNmVjYTEiLCJpYXQiOjE3MjkzMDUxNjV9.VotboVZbauNsLgHLyk7OswVjYoVvrgxuUIM2BL6jsVMT7f72AaM7sUlqm6YXbS0-yThNrf6IWwiv_5LMIZovCg",
  },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Usuario creado exitosamente", data);
      const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
      modal.hide();
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('value').value = '';
      document.getElementById('image').value = '';
    })
    .catch(error => {
      console.error('Error al crear el usuario:', error);
    });
}
*/