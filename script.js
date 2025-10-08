const grid = document.getElementById('grid');
const countSpan = document.getElementById('product-count');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');
const toast = document.getElementById('toast');

let ALL_PRODUCTS = [];

async function loadProducts() {
  try {
    const res = await fetch('products.json', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status}: impossible de charger les produits`);
    }
    const data = await res.json();
    ALL_PRODUCTS = Array.isArray(data) ? data : [];
    renderProducts(ALL_PRODUCTS);
    showToast('Produits rechargés ✅');
  } catch (e) {
    console.error('Erreur de chargement des produits :', e);
    showToast('❌ ' + e.message);
    renderProducts([]);
  }
}

function renderProducts(list) {
  if (!grid) {
    console.error('Erreur : élément #grid non trouvé dans le HTML');
    return;
  }
  grid.innerHTML = '';
  countSpan.textContent = list.length;

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image || ''}" alt="${p.name || 'Produit'}" onerror="this.src='https://via.placeholder.com/200?text=Image+non+disponible'">
      <h3>${p.name || 'Nom non disponible'}</h3>
      <p>${p.description || ''}</p>
      <p class="price">${p.price || ''}</p>
      <a href="${p.link || '#'}" target="_blank" rel="noopener noreferrer">Acheter</a>
    `;
    grid.appendChild(card);
  });
}

function attachSearch() {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = ALL_PRODUCTS.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
    renderProducts(filtered);
  });
}

function showToast(msg) {
  if (toast) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.hidden = true;
    }, 2000);
  } else {
    console.warn('Toast non trouvé, message :', msg);
  }
}

// Initialisation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    attachSearch();
    loadProducts();
  });
} else {
  attachSearch();
  loadProducts();
}