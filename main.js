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
            checkDefaultRow();
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

    // Create new table row (if fields are filled)
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
        checkDefaultRow(); // Check if we need to show the default row after deletion
    };

    // Append the delete button to the deleteTd cell
    deleteTd.appendChild(deleteButton);

    // Add class for amountTd to align the content with flexbox
    amountTd.classList.add("amount-td");

    // Append cells to the row
    row.appendChild(nameTd);
    row.appendChild(dateTd);
    row.appendChild(amountTd).appendChild(deleteTd); // Add delete cell
    

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

// Function to check if we need to insert the default row
function checkDefaultRow() {
    var tbody = document.getElementById('myTd').querySelector('tbody');
    if (tbody.children.length === 0) {
        var newDefaultRow = document.createElement('tr');
        newDefaultRow.id = 'defaultTd';
        newDefaultRow.innerHTML = '<td class="default-td" colspan="4">No expense added yet!</td>';
        tbody.appendChild(newDefaultRow);
    }
}
