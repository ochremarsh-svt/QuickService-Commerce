/**
 * BaryaBites - Interactive Filter Tag Matrix Operations Engine
 * ThemeForest Code Quality Standard Compliant
 */

class MenuFilterMatrix {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.menuCards = document.querySelectorAll('.menu-card');
        this.bindFilterEvents();
    }

    bindFilterEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Clear out current target highlights
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Active highlight capture
                const targetTag = e.currentTarget.getAttribute('data-target');
                e.currentTarget.classList.add('active');

                this.executeDomMatrixAnimation(targetTag);
            });
        });
    }

    executeDomMatrixAnimation(targetClass) {
        this.menuCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (targetClass === 'all' || cardCategory === targetClass) {
                card.classList.remove('hidden');
                // Subtle scale animation hook trigger
                card.style.opacity = '0';
                setTimeout(() => { card.style.opacity = '1'; }, 50);
            } else {
                card.classList.add('hidden');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MenuFilterMatrix();
});