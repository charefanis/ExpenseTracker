document.getElementById('mySubmit').onclick = function() {
    let name = document.getElementById('myName').value;
    let date = document.getElementById('myDate').value;
    let amount = document.getElementById('myAmount').value;

    // Check if any field is empty
    if (!name || !date || !amount) {
        // Create a new row for the error message
        var row = document.createElement('tr');
        var messageTd = document.createElement('td');
        messageTd.colSpan = 4; // Span across all columns
        messageTd.classList.add('error-td'); // Add the error styling

        // Create a div to hold both the message and the delete button
        var messageDiv = document.createElement('div');
        messageDiv.classList.add('error-message-container'); // To handle the alignment of the message and button

        // Add the error message
        var messageText = document.createElement('span');
        messageText.textContent = "Please enter something";
        messageDiv.appendChild(messageText);

        // Create a delete button for the error row
        var deleteErrorButton = document.createElement('button');
        deleteErrorButton.textContent = "x";
        deleteErrorButton.classList.add('error-delete-btn');
        deleteErrorButton.onclick = function() {
            row.remove(); // Remove the error row when delete button is clicked
        };

        // Append the delete button to the message div
        messageDiv.appendChild(deleteErrorButton);

        // Append the message div to the message cell
        messageTd.appendChild(messageDiv);

        // Append the message cell to the row
        row.appendChild(messageTd);

        // Get tbody and add the error row
        var tbody = document.getElementById('myTd').querySelector('tbody');

        // Remove any existing default row
        var defaultRow = document.getElementById('defaultTd');
        if (defaultRow) {
            defaultRow.remove();
        }

        tbody.appendChild(row);

        // Clear input fields so user can try again
        document.getElementById('myName').value = '';
        document.getElementById('myDate').value = '';
        document.getElementById('myAmount').value = '';

        return; // Exit the function if the user didn't enter anything
    }

    // Create a new expense object
    var expense = {
        name: name,
        date: date,
        amount: amount
    };

    // Save the expense to localStorage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Create new table row for the expense
    var row = document.createElement('tr');
    var nameTd = document.createElement('td');
    var dateTd = document.createElement('td');
    var amountTd = document.createElement('td');
    var deleteTd = document.createElement('td'); // Separate cell for delete button
    var deleteButton = document.createElement('button');

    // Set cell content
    nameTd.textContent = name;
    dateTd.textContent = date;
    amountTd.textContent = `${amount} $`;

    // Set up the delete button
    deleteButton.id = "myDelete";
    deleteButton.textContent = "x";
    deleteButton.onclick = function() {
        row.remove(); // Remove the row when delete button is clicked
        deleteExpense(expense); // Remove from localStorage
        checkDefaultRow(); // Check if we need to show the default row after deletion
    };

    // Append the delete button to the deleteTd cell
    deleteTd.appendChild(deleteButton);

    // Add class for amountTd to align the content with flexbox
    amountTd.classList.add("amount-td");

    // Append cells to the row
    row.appendChild(nameTd);
    row.appendChild(dateTd);
    row.appendChild(amountTd);
    row.appendChild(deleteTd); // Add delete cell

    // Get tbody and add the row
    var tbody = document.getElementById('myTd').querySelector('tbody');

    // Remove the "No expense added yet!" row if it exists
    var defaultRow = document.getElementById('defaultTd');
    if (defaultRow) {
        defaultRow.remove();
    }

    tbody.appendChild(row);

    // Clear input fields
    document.getElementById('myName').value = '';
    document.getElementById('myDate').value = '';
    document.getElementById('myAmount').value = '';

    // Check if the table is empty and insert the default row if necessary
    checkDefaultRow();
};

// Function to delete an expense from localStorage
function deleteExpense(expenseToDelete) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.name !== expenseToDelete.name || expense.date !== expenseToDelete.date || expense.amount !== expenseToDelete.amount);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to check if we need to insert the default row
function checkDefaultRow() {
    var tbody = document.getElementById('myTd').querySelector('tbody');
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // If there are no expenses, show the default row
    if (expenses.length === 0) {
        // Remove any existing default row before adding the new one
        var existingDefaultRow = document.getElementById('defaultTd');
        if (existingDefaultRow) {
            existingDefaultRow.remove();
        }

        var newDefaultRow = document.createElement('tr');
        newDefaultRow.id = 'defaultTd';
        newDefaultRow.innerHTML = '<td class="default-td" colspan="4">No expense added yet!</td>';
        tbody.appendChild(newDefaultRow);
    }
}

// Function to load expenses from localStorage
function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // If there are expenses, display them
    var tbody = document.getElementById('myTd').querySelector('tbody');

    // Remove the default row if it exists
    var defaultRow = document.getElementById('defaultTd');
    if (defaultRow) {
        defaultRow.remove();
    }

    expenses.forEach(expense => {
        var row = document.createElement('tr');
        var nameTd = document.createElement('td');
        var dateTd = document.createElement('td');
        var amountTd = document.createElement('td');
        var deleteTd = document.createElement('td'); // Separate cell for delete button
        var deleteButton = document.createElement('button');

        // Set cell content
        nameTd.textContent = expense.name;
        dateTd.textContent = expense.date;
        amountTd.textContent = `${expense.amount} $`;

        // Set up the delete button
        deleteButton.id = "myDelete";
        deleteButton.textContent = "x";
        deleteButton.onclick = function() {
            row.remove(); // Remove the row when delete button is clicked
            deleteExpense(expense); // Remove from localStorage
            checkDefaultRow(); // Check if we need to show the default row after deletion
        };

        // Append the delete button to the deleteTd cell
        deleteTd.appendChild(deleteButton);

        // Add class for amountTd to align the content with flexbox
        amountTd.classList.add("amount-td");

        // Append cells to the row
        row.appendChild(nameTd);
        row.appendChild(dateTd);
        row.appendChild(amountTd);
        row.appendChild(deleteTd); // Add delete cell

        tbody.appendChild(row);
    });

    // If no expenses are found, show the default row
    checkDefaultRow();
}

// Call loadExpenses() when the page is loaded
window.onload = function() {
    loadExpenses();
}
