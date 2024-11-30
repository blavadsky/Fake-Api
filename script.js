function apiRequest(endpoint, method, data = null) {
  const token = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5Zjc3NTFhNi1jYTZmLTQ2MzItYTgxYS1hZTc0NGNiNmVjYTEiLCJpYXQiOjE3MjkzMDUxNjV9.VotboVZbauNsLgHLyk7OswVjYoVvrgxuUIM2BL6jsVMT7f72AaM7sUlqm6YXbS0-yThNrf6IWwiv_5LMIZovCg';

  const options = {
    method: method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(`https://backapi-q1wm.onrender.com/users${endpoint}`, options)
    .then(response => response.json())
    .catch(err => console.error('Error de red:', err));
}


fetch("https://backapi-q1wm.onrender.com/users/", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5Zjc3NTFhNi1jYTZmLTQ2MzItYTgxYS1hZTc0NGNiNmVjYTEiLCJpYXQiOjE3MjkzMDUxNjV9.VotboVZbauNsLgHLyk7OswVjYoVvrgxuUIM2BL6jsVMT7f72AaM7sUlqm6YXbS0-yThNrf6IWwiv_5LMIZovCg", // Token de autorización
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
      console.log(contact);
      il.innerHTML = myhtml;
      il.style.display = "block";
      list.appendChild(il);
    });
  })
  .catch(err => console.error("Error al cargar los usuarios", err));

let isEditing = false;

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
  const nftData = {
    first_name: document.getElementById('title').value,
    last_name: document.getElementById('description').value,
    email: document.getElementById('value').value,
    phone: document.getElementById('image').value,
  };

  const productId = document.getElementById('productId').value;

  if (!nftData.first_name || !nftData.last_name || !nftData.email || !nftData.phone) {
    alert('Por favor, completa todos los campos.');
    return;
  }
  const endpoint = isEditing ? `/${productId}` : '';
  const method = isEditing ? 'PATCH' : 'POST';

  apiRequest(endpoint, method, nftData)
    .then(response => {
      console.log(`${isEditing ? 'Editado' : 'Creado'} exitosamente`, response);
      location.reload(); 
    });
}

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
      document.getElementById("title").value = data.first_name;
      document.getElementById("description").value = data.last_name;
      document.getElementById("value").value = data.email;
      document.getElementById("image").value = data.phone;
      document.getElementById("productId").value = data.contact_id;

      isEditing = true;
      document.getElementById("tituloModal").textContent = "Editar NFT";
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

