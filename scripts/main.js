document.addEventListener("DOMContentLoaded", () => {
  //https://stackoverflow.com/questions/1011317/replace-a-value-if-null-or-undefined-in-javascript
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const addButton = document.getElementById("add-button");
  const form_add = document.getElementById("add-form-button");
  form_add.addEventListener("click", addTransaction);
  updateTable(transactions);
  const filterButton = document.getElementById("filter-button");
  const form = document.getElementById("transaction-form");
  const editButtons = document.querySelectorAll(".edit-button");

  filterButton.addEventListener("click", () => {
    const type = document.getElementById("type-filter").value;
    const min = document.getElementById("min-filter").value;
    const max = document.getElementById("max-filter").value;
    const date = document.getElementById("date-filter").value;
    const notes = document.getElementById("notes-filter").value;

    let filteredTransactions = transactions;
    if (type) {
      if (type != "all") {
        filteredTransactions = filteredTransactions.filter(
          (t) => t.type === type
        );
      }
    }
    if (min) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.amount >= parseFloat(min)
      );
    }
    if (max) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.amount <= parseFloat(max)
      );
    }
    if (date) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.date === date
      );
    }
    if (notes) {
      filteredTransactions = filteredTransactions.filter((t) =>
        t.notes.toLowerCase().includes(notes.toLowerCase())
      );
    }

    updateTable(filteredTransactions);
  });

  editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
    });
  });

  addButton.addEventListener("click", () => {
    form.style.display = "flex";
    form_add.style.display = "block";
  });

  function addTransaction() {
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("dates").value;
    const notes = document.getElementById("notes").value;

    const transaction = { type, amount, date, notes };
    transactions.push(transaction);
    form.reset();

    form.style.display = "none";
    form_add.style.display = "none";
    updateTable(transactions);
  }

  function updateTable(rows) {
    const table = document.getElementById("transaction-table-body");
    table.innerHTML = "";

    rows.forEach((transaction) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${transaction.type}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>${transaction.date}</td>
                    <td>${transaction.notes}</td>
                    <td>
                        <button class="edit-button" data-id="${
                          transaction.id
                        }">Edit</button>
                        <button class="delete-button"data-id="${
                          transaction.id
                        }">Delete</button>
                    </td>
                `;

      table.appendChild(row);
    });
  }
});
