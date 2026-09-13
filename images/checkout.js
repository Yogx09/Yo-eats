document.addEventListener("DOMContentLoaded", function() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const listCart = document.querySelector('.listCart');
    const totalQuantity = document.querySelector('.totalQuantity');
    const totalPrice = document.querySelector('.totalPrice');

    let totalQty = 0;
    let totalAmt = 0;

    cartItems.forEach(item => {
        totalQty += 1; // Assuming each entry is 1 quantity for now
        totalAmt += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<p>${item.name} - Rs ${item.price}</p>`;
        listCart.appendChild(itemDiv);
    });

    totalQuantity.innerText = totalQty;
    totalPrice.innerText = `Rs ${totalAmt}`;

    document.querySelector('.buttonCheckout').addEventListener('click', async () => {
        if (cartItems.length === 0) {
            alert('Cart is empty!');
            return;
        }

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // Get user token if logged in
        let token = localStorage.getItem('token');
        // Decode token to get userId if we had a library, but for now just send 'guest' or dummy
        let userId = token ? 'registered_user' : 'guest';

        try {
            // 1. Place the order via Order Service (proxied via Gateway)
            const orderRes = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cartItems, total: totalAmt, userId })
            });
            const orderData = await orderRes.json();
            
            if (orderRes.ok) {
                alert(`Order placed successfully! ID: ${orderData.order.id}`);
                localStorage.removeItem('cart');
                
                // 2. Fetch delivery status via Delivery Service
                checkDeliveryStatus(orderData.order.id);
            } else {
                alert('Order failed: ' + orderData.error);
            }
        } catch (e) {
            console.error(e);
            alert('Failed to connect to Order Service.');
        }
    });

    async function checkDeliveryStatus(orderId) {
        try {
            const delRes = await fetch(`http://localhost:3000/api/delivery/${orderId}`);
            const delData = await delRes.json();
            if (delRes.ok) {
                alert(`Delivery Status for ${orderId}: ${delData.status} (Driver: ${delData.driver}, ETA: ${delData.estimatedTime})`);
                window.location.href = 'index.html';
            }
        } catch (e) {
            console.error('Delivery tracking not available yet.');
            window.location.href = 'index.html';
        }
    }
});
