let products = JSON.parse(localStorage.getItem('myMenu')) || [];
let isAdmin = false;

// Admin panelini açmaq və parol yoxlamaq (Parol: 1234)
function openAdminPanel() {
  const password = prompt("Admin parolunu daxil edin:");
  if (password === "1234") {
    isAdmin = true;
    document.getElementById("adminPanel").classList.remove("hidden");
    alert("Giriş uğurludur!");
    renderProducts();
  } else {
    alert("Yanlış parol!");
  }
}

function renderProducts() {
  document.getElementById('ickiler').innerHTML = '';
  document.getElementById('yemekler').innerHTML = '';
  document.getElementById('desertler').innerHTML = '';

  products.forEach((prod, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <h4>${prod.name}</h4>
      <p>${prod.price}</p>
      ${isAdmin ? `<button class="delete-btn" onclick="deleteProduct(${index})">Sil</button>` : ''}
    `;
    
    const catContainer = document.getElementById(prod.category);
    if (catContainer) {
      catContainer.appendChild(card);
    }
  });
}

function addProduct() {
  const name = document.getElementById('pName').value;
  const price = document.getElementById('pPrice').value;
  const category = document.getElementById('pCategory').value;
  const imageInput = document.getElementById('pImage');

  if (!name || !price || !imageInput.files[0]) {
    alert('Zəhmət olmasa bütün xanaları doldurun!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const newProduct = { name, price, category, image: e.target.result };
    products.push(newProduct);
    localStorage.setItem('myMenu', JSON.stringify(products));
    renderProducts();
  };
  reader.readAsDataURL(imageInput.files[0]);
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem('myMenu', JSON.stringify(products));
  renderProducts();
}

renderProducts();
