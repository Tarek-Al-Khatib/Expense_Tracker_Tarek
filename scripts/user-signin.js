document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("signin-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("signin-username").value;
      const password = document.getElementById("signin-password").value;

      axios
        .post(
          "http://localhost:8080/expense-tracker/user/signin.php",
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
          window.location.href = "index.html";
        })
        .catch((error) => console.error("Error:", error));
    });

  const takeme = document.getElementById("take-me");

  takeme.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
});
