// Initialize cart and total
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = 0;

// Function to add items to the cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.dataset.item;
        const price = parseFloat(button.dataset.price);
        
        // Add item to cart
        cart.push({ item, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update total price
        totalPrice += price;
        updateCart();
    });
});

// Function to update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.textContent = `${item.item} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(itemDiv);
    });

    // Update total price display
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Call updateCart on page load
updateCart();

// Open order confirmation modal when 'Place Order' button is clicked
document.getElementById('place-order-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before placing an order.");
        return;
    }
    document.getElementById('order-modal').style.display = 'block'; // Show modal
});

// Handle confirm order button
document.getElementById('confirm-order-btn').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const email = document.getElementById('email').value;

    // Add any validation here if needed

    // Proceed with order placement logic
    alert("Order placed successfully!");

    // Clear the cart
    localStorage.removeItem('cart');
    cart = [];
    totalPrice = 0; // Reset total price
    updateCart(); // Update the cart display

    // Close modal
    document.getElementById('order-modal').style.display = 'none';

    // Show success modal
    document.getElementById('success-modal').style.display = 'block';
});

// Close success modal button functionality
document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('success-modal').style.display = 'none';
});
