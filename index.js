document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('main section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active');
                // Reset opacity and transform to re-trigger the transition
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            });

            const targetSection = document.getElementById(button.dataset.target);
            targetSection.classList.add('active');
            // Apply styles after a short delay to ensure transition triggers from the reset state
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 50); // Small delay to allow display:block to render before transition
        });
    });

    // --- Checklist Generator ---
    const eventTypeSelect = document.getElementById('eventType');
    const generateChecklistBtn = document.getElementById('generateChecklist');
    const checklistOutput = document.getElementById('checklistOutput');

    const checklists = {
        wedding: [
            "Set a budget", "Choose a wedding date", "Book venue", "Send out invitations",
            "Choose wedding dress/suit", "Hire caterer", "Arrange flowers", "Plan honeymoon"
        ],
        birthday: [
            "Choose a theme", "Send out invitations", "Book venue (if applicable)",
            "Order cake", "Plan activities/games", "Buy decorations", "Prepare party favors"
        ],
        conference: [
            "Define conference goals", "Set date and location", "Develop agenda",
            "Secure speakers", "Start marketing", "Handle registrations",
            "Arrange AV equipment", "Plan catering"
        ],
        custom: [] // For user to add their own items
    };

    generateChecklistBtn.addEventListener('click', () => {
        const selectedType = eventTypeSelect.value;
        let items = checklists[selectedType];

        checklistOutput.innerHTML = ''; // Clear previous checklist
        const ul = document.createElement('ul');

        if (items.length > 0) {
            items.forEach(itemText => {
                const li = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.addEventListener('change', () => {
                    li.classList.toggle('completed', checkbox.checked);
                });

                const span = document.createElement('span');
                span.textContent = itemText;

                li.appendChild(checkbox);
                li.appendChild(span);
                ul.appendChild(li);
            });
        } else if (selectedType === 'custom') {
            const li = document.createElement('li');
            li.textContent = "Start by adding your custom tasks!";
            ul.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.textContent = "No checklist items defined for this type yet.";
            ul.appendChild(li);
        }
        checklistOutput.appendChild(ul);
    });

    // Generate initial checklist on load
    generateChecklistBtn.click(); // Trigger it once to show content on load


    // --- Guest List Planner ---
    const addGuestForm = document.getElementById('addGuestForm');
    const guestNameInput = document.getElementById('guestName');
    const guestEmailInput = document.getElementById('guestEmail');
    const guestPlusOneInput = document.getElementById('guestPlusOne');
    const guestListUl = document.getElementById('guestList');
    const totalGuestsSpan = document.getElementById('totalGuests');
    const totalRSVPsSpan = document.getElementById('totalRSVPs');

    let guests = [];

    function updateGuestSummary() {
        // Correctly count guests including their +1s
        const totalPhysicalGuests = guests.reduce((sum, guest) => sum + (guest.plusOne ? 2 : 1), 0);
        const totalConfirmedRSVPs = guests.filter(guest => guest.rsvp).reduce((sum, guest) => sum + (guest.plusOne ? 2 : 1), 0);

        totalGuestsSpan.textContent = totalPhysicalGuests;
        totalRSVPsSpan.textContent = totalConfirmedRSVPs;
    }

    function renderGuestList() {
        guestListUl.innerHTML = '';
        guests.forEach((guest, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>
                    <strong>${guest.name}</strong> 
                    ${guest.email ? `(<a href="mailto:${guest.email}">${guest.email}</a>)` : ''}
                    ${guest.plusOne ? ' <span style="color: var(--accent-color); font-weight: bold;">+1</span>' : ''}
                </span>
                <div class="guest-actions">
                    <button class="rsvp-btn ${guest.rsvp ? 'confirmed' : ''}" data-index="${index}">
                        ${guest.rsvp ? 'RSVP Confirmed' : 'Confirm RSVP'}
                    </button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            guestListUl.appendChild(li);
        });
        updateGuestSummary();
    }

    addGuestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newGuest = {
            name: guestNameInput.value.trim(),
            email: guestEmailInput.value.trim(),
            plusOne: parseInt(guestPlusOneInput.value) === 1,
            rsvp: false
        };
        if (newGuest.name) {
            guests.push(newGuest);
            renderGuestList();
            addGuestForm.reset();
        } else {
            alert('Guest name cannot be empty!');
        }
    });

    guestListUl.addEventListener('click', (e) => {
        if (e.target.classList.contains('rsvp-btn')) {
            const index = parseInt(e.target.dataset.index);
            guests[index].rsvp = !guests[index].rsvp; // Toggle RSVP status
            renderGuestList();
        } else if (e.target.classList.contains('delete-btn')) {
            const index = parseInt(e.target.dataset.index);
            if (confirm(`Are you sure you want to delete ${guests[index].name}?`)) {
                guests.splice(index, 1); // Remove guest from array
                renderGuestList();
            }
        }
    });

    // --- Budget Planner ---
    const addBudgetItemForm = document.getElementById('addBudgetItemForm');
    const budgetItemNameInput = document.getElementById('budgetItemName');
    const budgetItemCostInput = document.getElementById('budgetItemCost');
    const budgetListUl = document.getElementById('budgetList');
    const totalBudgetSpan = document.getElementById('totalBudget');

    let budgetItems = [];

    function updateBudgetSummary() {
        const totalCost = budgetItems.reduce((sum, item) => sum + item.cost, 0);
        totalBudgetSpan.textContent = totalCost.toFixed(2);
    }

    function renderBudgetList() {
        budgetListUl.innerHTML = '';
        budgetItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span class="cost">$${item.cost.toFixed(2)}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            budgetListUl.appendChild(li);
        });
        updateBudgetSummary();
    }

    addBudgetItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newItem = {
            name: budgetItemNameInput.value.trim(),
            cost: parseFloat(budgetItemCostInput.value)
        };
        if (newItem.name && !isNaN(newItem.cost) && newItem.cost >= 0) {
            budgetItems.push(newItem);
            renderBudgetList();
            addBudgetItemForm.reset();
        } else {
            alert('Please enter a valid item description and a non-negative cost.');
        }
    });

    budgetListUl.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = parseInt(e.target.dataset.index);
            if (confirm(`Are you sure you want to delete "${budgetItems[index].name}"?`)) {
                budgetItems.splice(index, 1); // Remove item from array
                renderBudgetList();
            }
        }
    });
});
