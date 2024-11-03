document.addEventListener("DOMContentLoaded", () => {
  //https://stackoverflow.com/questions/1011317/replace-a-value-if-null-or-undefined-in-javascript
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const addButton = document.getElementById("add-button");
  const form_add = document.getElementById("add-form-button");
  const form_edit = document.getElementById("edit-form-button");
  form_add.addEventListener("click", addTransaction);
  form_edit.addEventListener("click", editTransaction);
  const filterButton = document.getElementById("filter-button");
  const form = document.getElementById("transaction-form");

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

  addButton.addEventListener("click", () => {
    form.style.display = "flex";
    form_add.style.display = "block";
    form.reset();
  });

  function editTransaction() {
    const id = document.getElementById("transaction-id").value;
    console.log(id);
    const transaction = transactions.find((t) => t.id == id);
    transaction.type = document.getElementById("type").value;
    transaction.amount = document.getElementById("amount").value;
    transaction.date = document.getElementById("date").value;
    transaction.notes = document.getElementById("notes").value;

    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTable(transactions);
    form.style.display = "none";
    form_edit.style.display = "none";
    form.reset();
  }
  function addTransaction() {
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value;

    const transaction = {
      id: Date.now(),
      type: type,
      amount: amount,
      date: date,
      notes: notes,
    };
    transactions.push(transaction);
    form.reset();

    form.style.display = "none";
    form_add.style.display = "none";
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTable(transactions);
  }

  function updateTable(elements) {
    const table = document.getElementById("transaction-table-body");
    table.innerHTML = "";

    elements.forEach((transaction) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${transaction.type}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.date}</td>
                    <td>${transaction.notes}</td>
                    <td>
                        <button class="edit-button" data-id="${transaction.id}">Edit</button>
                        <button class="delete-button" data-id="${transaction.id}">Delete</button>
                    </td>
                `;

      table.appendChild(row);

      const editButtons = document.querySelectorAll(".edit-button");
      const deleteButtons = document.querySelectorAll(".delete-button");
      editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          const transaction = transactions.find((t) => t.id == id);
          console.log(transaction);
          document.getElementById("transaction-id").value = transaction.id;
          document.getElementById("type").value = transaction.type;
          document.getElementById("amount").value = transaction.amount;
          document.getElementById("date").value = transaction.date;
          document.getElementById("notes").value = transaction.notes;
          form.style.display = "flex";
          form_edit.style.display = "block";
        });
      });

      deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          transactions = transactions.filter((t) => t.id != id);
          localStorage.setItem("transactions", JSON.stringify(transactions));
          updateTable(transactions);
        });
      });
    });
  }

  updateTable(transactions);
});
