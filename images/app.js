document.addEventListener("DOMContentLoaded", async function() {
    
    // 1. Fetch menu data from our new Catalog Microservice
    const menuContainer = document.getElementById('menu-container');
    
    if (menuContainer) {
        try {
            const response = await fetch('http://localhost:3000/api/menu');
            const menuItems = await response.json();
            
            // Clear any existing content
            menuContainer.innerHTML = '';
            
            // Render the items
            menuItems.forEach(item => {
                const card = document.createElement('div');
                card.className = 'detail-card';
                card.innerHTML = `
                    <img class="detail-img" src="${item.image}" alt="${item.name} Image">
                    <div class="detail-desc">
                        <div class="detail-name">
                            <h4>${item.name}</h4>
                            <p class="detail-sub">${item.description}</p>
                            <p class="Price">Rs-${item.price}</p>
                        </div>
                        <ion-icon class="add-to-cart" name="cart"></ion-icon>
                    </div>
                `;
                menuContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching menu items:', error);
            menuContainer.innerHTML = '<p>Sorry, we could not load the menu at this time.</p>';
        }
    }

    // 2. Use Event Delegation to handle Add to Cart clicks since cards are dynamic
    document.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("add-to-cart")) {
            const button = event.target;
            const productCard = button.closest('.detail-card');
            const productName = productCard.querySelector('.detail-name h4').innerText;
            const productPrice = parseFloat(productCard.querySelector('.Price').innerText.replace("Rs-", ""));

            const cartItem = {
                name: productName,
                price: productPrice
            };

            addToCart(cartItem);
            alert("Item added to cart!");
            event.preventDefault();
        }
    });

    function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});