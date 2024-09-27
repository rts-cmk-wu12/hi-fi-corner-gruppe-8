
  // Function to load single product details
  function loadSingleProduct() {
      const productId = getUrlParameter('id');

      fetch('json/product.json')
          .then(response => response.json())
          .then(data => {
              const product = data.products.find(p => p.name === productId);

              // Update the product details in the single-shop-product.html
              document.getElementById('single-shop-product-img').src = `Produktbilleder/${product.category}/${product.image}`;
              document.getElementById('single-shop-product-name').textContent = product.name;
              document.getElementById('single-shop-product-description').textContent = product.description;
            
              const priceElement = document.getElementById('single-shop-product-price');
              if (product.onSale) {
                  priceElement.innerHTML = `<span class="original-price">${product.price} $</span> <span class="sale-price">${product.salePrice} $</span>`;
              } else {
                  priceElement.textContent = `${product.price} $`;
              }

              document.getElementById('Manufacturer').textContent = product.manufacturer;
              document.getElementById('Manufacturer-link').textContent = product.manufacturerLink;

              // You may need to add more elements to update based on your single-shop-product.html structure
          })
  }

  // Load single product details when the page loads
  window.addEventListener('load', loadSingleProduct);
