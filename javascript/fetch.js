// Funktion til at indlæse produkter fra JSON-fil
function loadProducts(category = null, manufacturer = null, searchTerm = null, minPrice = null, maxPrice = null) {
    // Hent produktdata fra JSON-fil
    fetch('json/product.json')
        .then(response => response.json())
        .then(data => {
            // Find produkt-listen i DOM'en
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Ryd eksisterende produkter

            // Start med alle produkter
            let filteredProducts = data.products;

            // Filtrer efter kategori, hvis angivet
            if (category) {
                filteredProducts = filteredProducts.filter(product => product.category === category);
            }

            // Filtrer efter producent, hvis angivet
            if (manufacturer) {
                filteredProducts = filteredProducts.filter(product => product.manufacturer === manufacturer);
            }

            // Filtrer efter søgeord, hvis angivet
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Filtrer efter prisinterval, hvis angivet
            if (minPrice !== null && maxPrice !== null) {
                filteredProducts = filteredProducts.filter(product => {
                    const price = product.onSale ? product.salePrice : product.price;
                    return price >= minPrice && price <= maxPrice;
                });
            }

            // Opret og tilføj produktelementer til listen
            filteredProducts.forEach(product => {
                const productItem = `
                    <div class="product-item" id="${product.name}">

                    <a class="product" href="single-shop-product.html?id=${product.name}">
                    <div class="product-picture">
                        <img src="Produktbilleder/${product.category}/${product.image}" alt="${product.name}">
                     </div>   
                        <div class="product-info">

                        <h4>${product.name}</h4>

                        ${product.onSale ? ` <div class="priceholder">` : ''}

                        <p class="price ${product.onSale ? ' sale' : ''}">${product.price} $</p>

                        ${product.onSale ? `<p class="sale-price">${product.salePrice} $</p></div>` : ''}

                        <button>View More</button>
                        </div>
                    </a>
                    </div>
                `;
                productList.innerHTML += productItem;
            });
        });
}

// Indlæs alle produkter når siden loader
window.onload = () => loadProducts();

// Tilføj event listener til søgefeltet
document.querySelector('input[name="search"]').addEventListener('input', function(e) {
    loadProducts(null, null, e.target.value);
});

// Tilføj event listeners til kategori-links
document.querySelectorAll('.sidebar ul:first-of-type a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('href').substring(1);
        loadProducts(category);
    });
});

// Tilføj event listeners til producent-links
document.querySelectorAll('.black-marker a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const manufacturer = this.textContent;
        loadProducts(null, manufacturer);
    });
});

// Tilføj event listeners til prisinterval-links
document.querySelectorAll('.sidebar ul:nth-of-type(2) a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const minPrice = parseFloat(this.getAttribute('data-min'));
        const maxPrice = parseFloat(this.getAttribute('data-max'));
        loadProducts(null, null, null, minPrice, maxPrice);
    });
});


// Kald handleUrlParams når siden indlæses
window.addEventListener('load', handleUrlParams);