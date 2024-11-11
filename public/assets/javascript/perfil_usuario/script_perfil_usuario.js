const dropbuttons = document.querySelectorAll(".dropbtn");

dropbuttons.forEach(dropbtn => {
    const dropdown = dropbtn.nextElementSibling;
    dropbtn.addEventListener("mouseover", () => dropdown.classList.add("show"));
    dropbtn.addEventListener("mouseleave", () => setTimeout(() => {
        if (!dropdown.matches(':hover')) dropdown.classList.remove("show");
    }, 400));
    dropdown.addEventListener("mouseover", () => dropdown.classList.add("show"));
    dropdown.addEventListener("mouseleave", () => dropdown.classList.remove("show"));
});

document.getElementById('profileContainer').addEventListener('click', function (event) {
    event.stopPropagation(); // Evita fechar o menu ao clicar nele
    const dropdown = document.querySelector('.profile-dropdown');
    const arrowIcon = document.getElementById('profileDropdownArrow');
  
    // Alterna visibilidade do dropdown e rotação da seta
    dropdown.classList.toggle('show');
    arrowIcon.classList.toggle('arrow-up');
  });
  
  // Fecha o dropdown ao clicar fora dele
  document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.profile-dropdown');
    const arrowIcon = document.getElementById('profileDropdownArrow');
  
    if (!document.getElementById('profileContainer').contains(event.target)) {
      dropdown.classList.remove('show');
      arrowIcon.classList.remove('arrow-up');
    }
  });
  

document.getElementById("edit-icon").addEventListener("click", () => {
    document.getElementById("profileImageInput").click();
});

document.getElementById("profileImageInput").addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
           
            document.getElementById("profileImageMain").src = e.target.result;
            document.getElementById("profileImageDropdown").src = e.target.result;
            document.getElementById("profileImageMainSection").src = e.target.result; 
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleVisibility = (toggleBtn, inputField) => {
        toggleBtn.addEventListener("click", () => {
            const type = inputField.getAttribute("type") === "password" ? "text" : "password";
            inputField.setAttribute("type", type);
            toggleBtn.classList.toggle("bx-show");
            toggleBtn.classList.toggle("bx-hide");
        });
    };

    toggleVisibility(document.getElementById("togglePassword"), document.getElementById("senha"));
    toggleVisibility(document.getElementById("toggleConfirmPassword"), document.getElementById("confirmar-senha"));

    const editButton = document.querySelector(".edit-button");
    const formFields = document.querySelectorAll(".profile-form input, .profile-form select");

    editButton.addEventListener("click", () => {
        formFields.forEach(field => field.disabled = !field.disabled);
        editButton.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const validateForm = () => {
        const form = document.querySelector(".needs-validation");

        form.classList.add('was-validated');

        if (form.checkValidity()) {
            alert('Salvo com sucesso');
        } else {
            alert('Error ao salvar.');
        }
    };

    document.querySelector(".save-button").addEventListener("click", (event) => {
        event.preventDefault();
        validateForm(); 
    });
});
