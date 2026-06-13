/**
 * BaryaBites - State Management Global Cart Engine
 * ThemeForest Quality Standard Compliant (Vanilla JS)
 */

class CartEngine {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('bb_cart_state')) || [];
        this.initDOMEventListeners();
        this.updateBadgeUI();
    }

    initDOMEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('btn-add-cart')) {
                const button = e.target;
                const product = {
                    id: button.getAttribute('data-id'),
                    name: button.getAttribute('data-name'),
                    price: parseFloat(button.getAttribute('data-price')),
                    quantity: 1
                };
                this.addItem(product);
            }
        });
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push(product);
        }

        this.commitState();
    }

    // Proactive Method: Decrements item quantity, removes completely if balance reaches 0
    decrementItem(id) {
        const targetItem = this.items.find(item => item.id === id);
        if (!targetItem) return;

        targetItem.quantity -= 1;
        
        if (targetItem.quantity <= 0) {
            this.removeItem(id);
        } else {
            this.commitState();
        }
    }

    // Proactive Method: Immediate surgical removal of an item from the state array
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.commitState();
    }

    commitState() {
        localStorage.setItem('bb_cart_state', JSON.stringify(this.items));
        this.updateBadgeUI();
    }

    updateBadgeUI() {
        const badge = document.getElementById('cartCountBadge');
        if (badge) {
            const totalQuantity = this.items.reduce((total, item) => total + item.quantity, 0);
            badge.textContent = totalQuantity;
        }
    }
}

// Global window exposure context mapping pattern
window.BaryaCart = new CartEngine();