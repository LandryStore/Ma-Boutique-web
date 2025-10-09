// Charger les produits depuis products.json
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image || 'https://placehold.co/280x200?text=Produit'}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description || 'Aucune description'}</p>
        <div class="price">${product.price} €</div>
        <a href="${product.amazonLink}" target="_blank" class="buy-button">Voir sur Amazon</a>
      `;
      productList.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Erreur:', error);
    document.getElementById('product-list').innerHTML = '<p>Impossible de charger les produits.</p>';
  });