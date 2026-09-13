document.addEventListener("DOMContentLoaded", function() {
    // Retrieve cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Select elements
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const cartCountElement = document.getElementById('cart-count');

    // Function to render the cart
    function renderCart() {
        // Clear previous items
        cartContainer.innerHTML = '';

        // Reset total
        let total = 0;

        // Loop through each item in the cart
        cartItems.forEach((item, index) => {
            // Calculate total price for each item
            const totalPrice = item.price * item.quantity;
            total += totalPrice;

            // Create cart item HTML
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img class="item-image" src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <p>${item.name} - Rs ${item.price}</p>
                    <p>Total: Rs ${totalPrice}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>`;
            cartContainer.appendChild(itemElement);
        });

        // Display total price
        totalElement.textContent = `Total: Rs ${total.toFixed(2)}`;

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update cart count
        renderCartCount();

        // Set event listeners for remove buttons
        setEventListeners();
    }

    // Function to set event listeners for remove buttons
    function setEventListeners() {
        // Select all remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(button.dataset.index);
                // Remove item from cart
                cartItems.splice(index, 1);
                renderCart();
            });
        });
    }

    // Function to render the cart count
    function renderCartCount() {
        // Calculate total number of items in the cart
        const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

        // Update cart count element
        cartCountElement.textContent = totalCount;
    }

    // Initial rendering of the cart
    renderCart();
});
