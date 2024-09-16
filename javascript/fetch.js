// Function to load products from JSON file
function loadProducts() {
    // Fetch product data from JSON file
    fetch('json/product.json')
        .then(response => response.json())
        .then(data => {
            // Get the product list container element
            const productList = document.getElementById('product-list');
            // Iterate through each product in the data
            data.products.forEach(product => {
                // Create HTML for each product item
                const productItem = `
                    <div class="product-item">
                        <img src="${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        <p class="price">${product.price.toFixed(2)}</p>
                        <p class="description">${product.description}</p>
                        <p class="manufacturer">${product.manufacturer}</p>
                        <p class="category">${product.category}</p>
                        <button>Add to cart</button>
                    </div>
                `;
                // Append the product item to the product list
                productList.innerHTML += productItem;
            });
        })
       
}

// Load products when the window finishes loading
window.onload = loadProducts;
