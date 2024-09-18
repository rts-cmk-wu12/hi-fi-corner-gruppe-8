// Function to load products from JSON file
function loadProducts(category = null, manufacturer = null, searchTerm = null) {
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

            // Create and append product items to the product list
            filteredProducts.forEach(product => {
                const productItem = `
                    <div class="product-item" data-id="${product.name}">
                        <img src="Produktbilleder/${product.category}/${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        ${product.onSale ? `<div class="priceholder">` : ''}
                        <p class="price${product.onSale ? ' sale' : ''}">${product.price} kr</p>
                        ${product.onSale ? `<p class="sale-price">${product.salePrice} kr</p></div>` : ''}
                        <button>Add to cart</button>
                    </div>
                `;
                productList.innerHTML += productItem;
            });

            // Add click event listener to product items for showing details
            document.querySelectorAll('.product-item').forEach(item => {
                item.addEventListener('click', () => showProductDetails(item.dataset.id));
            });
        });
}
// Function to show product details
function showProductDetails(productName) {
    // Fetch product data from JSON file
    fetch('json/product.json')
        .then(response => response.json())
        .then(data => {
            // Find the product with the matching name
            const product = data.products.find(p => p.name === productName);
            if (product) {
                // Get the product list element
                const productList = document.getElementById('product-list');
                // Display detailed product information
                productList.innerHTML = `
                  <div class="product-item" data-id="${product.name}">
                  <div class="product-details">
                        <img src="Produktbilleder/${product.category}/${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        ${product.onSale ? `<div class="priceholder">` : ''}
                        <p class="price${product.onSale ? 'sale' : ''}">${product.price} kr</p>
                        ${product.onSale ? `<p class="sale-price">${product.salePrice} kr</p></div>` : ''}
                        <button>Add to cart</button>
                        </div>
                    </div>
                `;
            }
        });
}

// Event listeners for category and manufacturer filters
document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Determine filter type based on the parent element's text content
        const filterType = link.closest('ul').previousElementSibling.textContent.toLowerCase().includes('shop by') ? 'manufacturer' : 'category';
        const filterValue = link.textContent;
        // Load products based on the filter type and value
        if (filterType === 'category') {
            loadProducts(filterValue);
        } else {
            loadProducts(null, filterValue);
        }
    });
});

// Search functionality
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search products...';
// Add event listener for search input
searchInput.addEventListener('input', (e) => {
    loadProducts(null, null, e.target.value);
});
// Add search input to the sidebar
document.querySelector('.sidebar').prepend(searchInput);

// Load all products when the page loads
window.onload = () => loadProducts();
