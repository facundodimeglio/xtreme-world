// Ticket prices
const TICKET_PRICES = {
    individual: 50,
    family: 180,
    youth: 160
};

// Cart state
let cart = {
    individual: 0,
    family: 0,
    youth: 0
};

// DOM Elements
const cartIcon = document.createElement('div');
cartIcon.className = 'cart-icon';

// Create cart preview as a direct child of body for better positioning
const cartPreview = document.createElement('div');
cartPreview.className = 'cart-preview';
cartPreview.innerHTML = `
    <div class="cart-preview-header">
        <h4>Tu Carrito</h4>
        <button class="close-cart" aria-label="Cerrar carrito">×</button>
    </div>
    <div class="cart-items"></div>
    <div class="cart-total">
        <strong>Total: </strong>
        <span>$0</span>
    </div>
`;

cartIcon.innerHTML = `<span class="cart-count">0</span>`;

// Add cart icon to nav
document.querySelector('.nav-container').appendChild(cartIcon);
// Add cart preview to body
document.body.appendChild(cartPreview);

// Toggle cart preview
function toggleCart(show = null) {
    if (show === null) {
        cartPreview.classList.toggle('active');
    } else {
        cartPreview.classList[show ? 'add' : 'remove']('active');
    }
}

// Event Listeners
cartIcon.addEventListener('click', (e) => {
    toggleCart();
    e.stopPropagation();
});

// Close cart when clicking close button
cartPreview.querySelector('.close-cart').addEventListener('click', (e) => {
    toggleCart(false);
    e.stopPropagation();
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartIcon.contains(e.target) && !cartPreview.contains(e.target)) {
        toggleCart(false);
    }
});

// Update cart preview
function updateCartPreview() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    const cartCount = document.querySelector('.cart-count');
    
    let total = 0;
    let itemCount = 0;
    cartItems.innerHTML = '';

    // Add items to preview
    if (cart.individual > 0) {
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>Entrada Individual x${cart.individual}</span>
                <span>$${cart.individual * TICKET_PRICES.individual}</span>
            </div>
        `;
        total += cart.individual * TICKET_PRICES.individual;
        itemCount += cart.individual;
    }

    if (cart.family > 0) {
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>Pase Familiar x${cart.family}</span>
                <span>$${cart.family * TICKET_PRICES.family}</span>
            </div>
        `;
        total += cart.family * TICKET_PRICES.family;
        itemCount += cart.family;
    }

    if (cart.youth > 0) {
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>Pase Joven x${cart.youth}</span>
                <span>$${cart.youth * TICKET_PRICES.youth}</span>
            </div>
        `;
        total += cart.youth * TICKET_PRICES.youth;
        itemCount += cart.youth;
    }

    // Update total and count
    cartTotal.textContent = `$${total}`;
    cartCount.textContent = itemCount;
}

// Handle form submissions
document.querySelectorAll('.ticket-form').forEach((form, index) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const quantity = parseInt(e.target.querySelector('input[type="number"]').value);
        
        switch(index) {
            case 0:
                cart.individual = quantity;
                break;
            case 1:
                cart.family = quantity;
                break;
            case 2:
                cart.youth = quantity;
                break;
        }
        
        updateCartPreview();
        // Mostrar una notificación temporal de que se agregó al carrito
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        button.textContent = '¡Agregado!';
        button.style.backgroundColor = 'var(--accent-yellow)';
        button.style.color = 'var(--primary-dark)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.color = '';
        }, 1000);
    });
}); 