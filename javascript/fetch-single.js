    // Funktion til at indlæse detaljer for et enkelt produkt
    function loadSingleProduct() {
        const productId = getUrlParameter('id');

        fetch('json/product.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.name === productId);

                // Opdater produktdetaljerne i single-shop-product.html
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

                // Du skal muligvis tilføje flere elementer at opdatere baseret på din single-shop-product.html struktur
            })
    }

    // Indlæs detaljer for et enkelt produkt, når siden indlæses
    window.addEventListener('load', loadSingleProduct);
