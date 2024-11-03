document.addEventListener("DOMContentLoaded", () => {
  //https://stackoverflow.com/questions/1011317/replace-a-value-if-null-or-undefined-in-javascript
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const addButton = document.getElementById("add-button");
  const form_add = document.getElementById("add-form-button");
  const filterButton = document.getElementById("filter-button");
  const form = document.getElementById("transaction-form");
  const editButtons = document.querySelectorAll(".edit-button");

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
    updateTable();
  }

  function updateTable() {
    const table = document.getElementById("transaction-table-body");

    transactions.forEach((transaction) => {
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
