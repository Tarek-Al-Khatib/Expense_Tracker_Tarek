document.addEventListener("DOMContentLoaded", () => {
  //https://stackoverflow.com/questions/1011317/replace-a-value-if-null-or-undefined-in-javascript
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

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
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                `;

      table.appendChild(row);
    });
  }
});
