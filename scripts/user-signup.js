document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("signup-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("signup-username").value;
      const password = document.getElementById("signup-password").value;

      axios
        .post(
          "http://localhost:8080/expense-tracker/user/signup.php",
          new URLSearchParams({
            username: username,
            password: password,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("userid", response.data.userid);
          //window.location.href = "index.html";
        })
        .catch((error) => console.error("Error:", error));
    });
});
