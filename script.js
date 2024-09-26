fetch("https://fake-api-vq1l.onrender.com/posts", {
  method: "GET",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZXNuZWlkZXIuY2Fsdm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNzMwODkzNiwiZXhwIjoxNzQ0NTg4OTM2fQ.2h5a3MPpaCb9NdSVD3bxGBmwwGYQ04AaqPypE2HSYJg"
  }
})
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById("list");
    data.forEach(product => {
      const il = document.createElement("li");
      const images = JSON.parse(product.images)
      const myhtml = ` 
      <div class="card" style="width: 18rem; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); margin: 35px; border: 2.5px solid gold; margin-top: 50px; background-color: rgb(215, 211, 206)">
        <img src="${images[0]}" class="card-img-top" style="width: 100%; height: 200px; object-fit: cover; cursor: pointer;">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.value}$</p>
          <p class="card-description">${product.description}</p>
          <a class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadProductData(${product.id})">Editar</a>
          <a onclick="deletePost(${product.id})" class="btn btn-danger">Eliminar</a>
        </div>
      </div>
    `;
      il.innerHTML = myhtml;
      il.style.display = "block";
      list.appendChild(il);
    })

  });

let isEditing = false;

//Solicitar el modal agregar producto
document.querySelector('.btn-primary[data-bs-target="#staticBackdrop"]').addEventListener('click', () => {
  document.getElementById("tituloModal").textContent = "Agregar NFT";
  clearForm();
  isEditing = false;
});

//Limpiar el formulario cuando no se esta editando
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("value").value = "";
  document.getElementById("image").value = "";
  document.getElementById("productId").value = "";
}

//Cuando se envía en formulario puede estar editando o creando un nuevo producto
function sendForm() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const value = document.getElementById("value").value;
  const image = document.getElementById("image").value;
  const productId = document.getElementById("productId").value;

  const body = {
    title: title,
    description: description,
    value: parseFloat(value),
    category_id: 1,
    images: [image],
    date: Date.now()
  };

  if (isEditing) {
    fetch(`https://fake-api-vq1l.onrender.com/posts/${productId}`, {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZXNuZWlkZXIuY2Fsdm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNzMwODkzNiwiZXhwIjoxNzQ0NTg4OTM2fQ.2h5a3MPpaCb9NdSVD3bxGBmwwGYQ04AaqPypE2HSYJg",
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        console.log("Producto actualizado", res);
        location.reload(); 
      })
      .catch(err => console.error("Error al actualizar el producto", err));
  } else {
    fetch("https://fake-api-vq1l.onrender.com/posts", {
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZXNuZWlkZXIuY2Fsdm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNzMwODkzNiwiZXhwIjoxNzQ0NTg4OTM2fQ.2h5a3MPpaCb9NdSVD3bxGBmwwGYQ04AaqPypE2HSYJg",
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        console.log("Producto creado", res);
        location.reload(); 
      })
      .catch(err => console.error("Error al crear el producto", err));
  }
}

//Cargar los datos del producto a editar
function loadProductData(id) {
  fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZXNuZWlkZXIuY2Fsdm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNzMwODkzNiwiZXhwIjoxNzQ0NTg4OTM2fQ.2h5a3MPpaCb9NdSVD3bxGBmwwGYQ04AaqPypE2HSYJg"
    }
  })
    .then(response => response.json())
    .then(product => {
      console.log("Producto cargado:", product);
      console.log("Imágenes:", product.images);

      // Asumimos que product.images es siempre una cadena JSON
      let images = [];
      try {
        images = JSON.parse(product.images);  // Convertir string en array
      } catch (error) {
        console.error("Error al parsear product.images:", error);
      }

      // Verificar si es un array válido y tiene al menos un elemento
      if (Array.isArray(images) && images.length > 0) {
        document.getElementById("image").value = images[0];  // Cargar la primera imagen
      } else {
        console.error("No se encontró una URL válida en product.images");
      }

      document.getElementById("tituloModal").textContent = "Editar NFT";
      document.getElementById("title").value = product.title;
      document.getElementById("description").value = product.description;
      document.getElementById("value").value = product.value;
      document.getElementById("productId").value = product.id;

      isEditing = true;
    })
    .catch(error => console.error('Error al cargar el producto:', error));
}



//Eliminar un producto
function deletePost(id) {
  fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiZXNuZWlkZXIuY2Fsdm9AdXRwLmVkdS5jbyIsImlhdCI6MTcyNzMwODkzNiwiZXhwIjoxNzQ0NTg4OTM2fQ.2h5a3MPpaCb9NdSVD3bxGBmwwGYQ04AaqPypE2HSYJg",
    },
  })
    .then(res => res.json())
    .then(res => {
      console.log(
        "respuesta de la api", res
      )
      location.reload();
    })
}

