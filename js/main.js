const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  if (checkInputs()) {
    createUser(formData);
  }
});

function createUser(data) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Ocorreu algum erro ao submeter o formulário!");
    })
    .then(() => {
      showSnackbar({
        message: "O formulário foi submetido com sucesso!",
        type: "success",
      });
    })
    .catch(({ message }) => {
      showSnackbar({
        message,
        type: "danger",
      });
    });
}

function showSnackbar({ message, type }) {
  const snack = document.getElementById("snackbar");
  snack.className = "show";
  snack.innerText = message;

  const types = {
    danger: (snack.style.backgroundColor = "red"),
    success: (snack.style.backgroundColor = "green"),
  };

  types[type];

  setTimeout(() => {
    snack.className = snack.className.replace("show", "");
  }, 3000);
}

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const confirmPasswordValue = confirmPassword.value;

  if (usernameValue === "") {
    setError(username, "O nome de usuário é obrigatório.");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "O email é obrigatório.");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Por favor, insira um email válido.");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "A senha é obrigatória.");
  } else if (passwordValue.length < 7) {
    setError(password, "A senha precisa ter no mínimo 7 caracteres.");
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPassword, "A confirmação de senha é obrigatória.");
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, "As senhas não conferem.");
  } else {
    setSuccess(confirmPassword);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  return formIsValid;
}

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isValidEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
