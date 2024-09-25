fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "GET",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs"
    }
})
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById("list");
    data.forEach( product => {
      const il = document.createElement("li");
      const images = JSON.parse(product.images)
      // const img = document.createElement("img");
      // img.src = images[0];
      const myhtml = ` 
      <div class="card" style="width: 18rem; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); margin: 35px; border: 2.5px solid gold; margin-top: 50px; background-color: rgb(215, 211, 206)">
        <img src="${images[0]}" class="card-img-top" style="width: 100%; height: 200px; object-fit: cover; cursor: pointer;">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.value}</p>
          <a class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadProductData(${product.id})">Edit</a>
          <a onclick="deletePost(${product.id})" class="btn btn-danger">Delete</a>
        </div>
      </div>
    `; 
      il.innerHTML =  myhtml;
      il.style.display = "block"; 
      list.appendChild(il); 
    })
    
  });

  let isEditing = false; // Variable para determinar si estamos creando o editando

  // Cuando se hace clic en el botón "Agregar edificio", limpia el formulario y establece isEditing en false
  document.querySelector('.btn-primary[data-bs-target="#staticBackdrop"]').addEventListener('click', () => {
    document.getElementById("modalTitle").textContent = "Agregar Edificio";
    clearForm(); // Limpiar el formulario
    isEditing = false; // Se está creando un nuevo producto
  });
  
  // Función para limpiar el formulario
  function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("value").value = "";
    document.getElementById("image").value = "";
    document.getElementById("productId").value = "";
  }
  
  function sendForm() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const value = document.getElementById("value").value;
    const image = document.getElementById("image").value;
    const productId = document.getElementById("productId").value;
  
    // Crear el body con los campos requeridos por la API
    const body = {
      title: title,
      description: description,
      value: parseFloat(value),
      category_id: 1,  // Asegúrate de ajustar esto según corresponda
      images: [image],  // Esto es un array
      date: Date.now() // O utiliza un valor adecuado para 'date'
    };
  
    if (isEditing) {
      // Si se está editando, realiza la solicitud PATCH
      fetch(`https://fake-api-vq1l.onrender.com/posts/${productId}`, {
        method: "PATCH",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs",
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(res => {
        console.log("Producto actualizado", res);
        location.reload();  // Recargar la página para reflejar los cambios
      })
      .catch(err => console.error("Error al actualizar el producto", err));
    } else {
      // Si no se está editando, realiza la solicitud POST para crear un nuevo producto
      fetch("https://fake-api-vq1l.onrender.com/posts", {
        method: "POST",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs",
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(res => {
        console.log("Producto creado", res);
        location.reload();  // Recargar la página para reflejar los cambios
      })
      .catch(err => console.error("Error al crear el producto", err));
    }
  }
  
  function loadProductData(id) {
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs"
      }
    })
    .then(response => response.json())
    .then(product => {
      // Rellenar los campos del modal con la información del producto
      document.getElementById("modalTitle").textContent = "Editar Edificio"; // Cambiar el título del modal
      document.getElementById("title").value = product.title;
      document.getElementById("description").value = product.description;
      document.getElementById("value").value = product.value;
      document.getElementById("image").value = product.images[0];
      document.getElementById("productId").value = product.id;
      
      isEditing = true; // Cambiar el estado a "editar"
    });
  }
  
  
  

/*
function sendForm(){
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const value = document.getElementById("value");
  const image = document.getElementById("image");
  const body ={
    title: title.value,
    description: description.value,
    value: value.value,
    images: [image.value] 
  }


  fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "POST", 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs",
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then( res => res.json())
  .then( res => {
    console.log(
      "respuesta de la api", res
    )
    title.value = "";
    description.value = "";
    value.value = "";
    image.value = "";
    location.reload();
  })

}
  */

function deletePost(id){
  fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
    method: "DELETE", 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI4LCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3MjU0MjEwOTQsImV4cCI6MTc0MjcwMTA5NH0.aHg7Hq1tGOI8QCnYo1PgUym229x7_SbrCQpk_tAYITs",
    },
  })
  .then( res => res.json())
  .then( res => {
    console.log(
      "respuesta de la api", res
    )
    location.reload();
  })
}

