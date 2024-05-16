// Function to retrieve expenses from local storage
function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

// Function to save expenses to local storage
function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render expenses on the page
function renderExpenses() {
    const expenses = getExpenses();
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('card', 'mb-2');

        listItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Expense: $${expense.amount}</h5>
                <p class="card-text">Description: ${expense.description}</p>
                <p class="card-text">Category: ${expense.category}</p>
                <button type="button" class="btn btn-danger mr-2" onclick="deleteExpense(${index})">Delete</button>
                <button type="button" class="btn btn-secondary" onclick="editExpense(${index})">Edit</button>
            </div>
        `;

        expenseList.appendChild(listItem);
    });
}

// Function to add expense
function addExpense(event) {
    event.preventDefault();

    const amountInput = document.getElementById('expenseAmount');
    const descriptionInput = document.getElementById('expenseDescription');
    const categoryInput = document.getElementById('expenseCategory');

    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value.trim();
    const category = categoryInput.value.trim();

    if (!amount || !description || !category) {
        alert('Please fill out all fields.');
        return;
    }

    const newExpense = { amount, description, category };

    const expenses = getExpenses();
    expenses.push(newExpense);
    saveExpenses(expenses);

    renderExpenses();

    // Reset form fields after adding expense
    amountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
}

// Function to delete expense
function deleteExpense(index) {
    const expenses = getExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    renderExpenses();
}

// Function to edit expense
function editExpense(index) {
    const expenses = getExpenses();
    const editedExpense = expenses[index];

    const newDescription = prompt('Enter the new description:', editedExpense.description);
    if (newDescription === null) {
        return; // If user cancels, do nothing
    }

    editedExpense.description = newDescription.trim();
    saveExpenses(expenses);
    renderExpenses();
}

// Event listener for form submission
document.getElementById('expenseForm').addEventListener('submit', addExpense);

// Initial rendering of expenses when the page loads
renderExpenses();
