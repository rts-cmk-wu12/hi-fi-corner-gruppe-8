// Function to load products from JSON file
function loadProducts(category = null, manufacturer = null, searchTerm = null, minPrice = null, maxPrice = null) {
    // Fetch product data from JSON file
    fetch('json/product.json')
        .then(response => response.json())
        .then(data => {
            // Get the product list element
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Clear existing products

            // Initialize filtered products with all products
            let filteredProducts = data.products;

            // Filter products by category if specified
            if (category) {
                filteredProducts = filteredProducts.filter(product => product.category === category);
            }

            // Filter products by manufacturer if specified
            if (manufacturer) {
                filteredProducts = filteredProducts.filter(product => product.manufacturer === manufacturer);
            }

            // Filter products by search term if specified
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Filter products by price range if specified
            if (minPrice !== null && maxPrice !== null) {
                filteredProducts = filteredProducts.filter(product => {
                    const price = product.onSale ? product.salePrice : product.price;
                    return price >= minPrice && price <= maxPrice;
                });
            }

            // Create and append product items to the product list
            filteredProducts.forEach(product => {
                const productItem = `
                    <div class="product-item" id="${product.name}">

                    <a class="product" href="products.html?id=${product.name}">

                        <img src="Produktbilleder/${product.category}/${product.image}" alt="${product.name}">
                        
                        <div class="product-info">

                        <h4>${product.name}</h4>

                        ${product.onSale ? ` <div class="priceholder">` : ''}

                        <p class="price ${product.onSale ? ' sale' : ''}">${product.price} kr</p>

                        ${product.onSale ? `<p class="sale-price">${product.salePrice} kr</p></div>` : ''}

                        <button>Add to cart</button>
                        </div>
                    </a>
                    </div>
                `;
                productList.innerHTML += productItem;
            });
        });
}

// Load all products when the page loads
window.onload = () => loadProducts();

// Add event listener for search input
document.querySelector('input[name="search"]').addEventListener('input', function(e) {
    loadProducts(null, null, e.target.value);
});

// Add event listeners for category links
document.querySelectorAll('.sidebar ul:first-of-type a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('href').substring(1);
        loadProducts(category);
    });
});

// Add event listeners for manufacturer links
document.querySelectorAll('.black-marker a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const manufacturer = this.textContent;
        loadProducts(null, manufacturer);
    });
});

// Add event listeners for price range links
document.querySelectorAll('.sidebar ul:nth-of-type(2) a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const minPrice = parseFloat(this.getAttribute('data-min'));
        const maxPrice = parseFloat(this.getAttribute('data-max'));
        loadProducts(null, null, null, minPrice, maxPrice);
    });
});

// Function to handle URL parameters for single product view
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        fetch('json/product.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.name === productId);
                if (product) {
                    const productList = document.getElementById('product-list');
                    productList.innerHTML = `
                        <div class="product-item" id="${product.name}">
                            <img src="Produktbilleder/${product.category}/${product.image}" alt="${product.name}">
                            <h4>${product.name}</h4>
                            ${product.onSale ? `<div class="priceholder">` : ''}
                            <p class="price${product.onSale ? ' sale' : ''}">${product.price} kr</p>
                            ${product.onSale ? `<p class="sale-price">${product.salePrice} kr</p></div>` : ''}
                            <p>${product.description}</p>
                            <button>Add to cart</button>
                        </div>
                    `;
                }
            });
    }
}

// Call handleUrlParams when the page loads
window.addEventListener('load', handleUrlParams);
