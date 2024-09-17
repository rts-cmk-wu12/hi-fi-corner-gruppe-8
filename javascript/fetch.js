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
                        <img src="Produktbilleder/${product.category}/${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                           <p class="manufacturer">${product.manufacturer}</p>
                        <p class="price">${product.price}$</p>
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
