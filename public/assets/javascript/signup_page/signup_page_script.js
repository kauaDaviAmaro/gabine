const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("bx-show");
  this.classList.toggle("bx-hide");
});

const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
const confirmPassword = document.querySelector("#confirmPassword");

toggleConfirmPassword.addEventListener("click", function () {
  const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
  confirmPassword.setAttribute("type", type);
  this.classList.toggle("bx-show");
  this.classList.toggle("bx-hide");
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.registration-form');

  form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
          event.preventDefault(); 
          event.stopPropagation(); 
      }

      form.classList.add('was-validated');
  });
});

let photoCaptured = null; 
const defaultProfileImage = "assets/img/user.png"; 

document.getElementById('openCameraBtn').addEventListener('click', async function () {
    const video = document.getElementById('video');
    const cameraModal = document.getElementById('cameraModal');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
        cameraModal.style.display = 'block'; 
    } catch (err) {
        console.error('Erro ao acessar a câmera: ', err);
        alert('Erro ao acessar a câmera. Tente novamente =( .');
    }
});

document.getElementById('takePhotoBtn').addEventListener('click', function () {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    photoCaptured = canvas.toDataURL('image/png');

    alert('Foto capturada! Agora você pode salvar a imagem :D .');
});

document.getElementById('savePhotoBtn').addEventListener('click', function () {
    if (photoCaptured) {
        document.getElementById('profileImage').src = photoCaptured;
        alert('Foto de perfil atualizada!');
    } else {
        alert('Nenhuma foto capturada para salvar =(');
    }
});

document.getElementById('closeCameraIcon').addEventListener('click', function () {
    const video = document.getElementById('video');
    const stream = video.srcObject;

    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }

    video.srcObject = null;
    document.getElementById('cameraModal').style.display = 'none';
});


document.querySelector('.delete-btn').addEventListener('click', function () {
    photoCaptured = null; 
    document.getElementById('profileImage').src = defaultProfileImage; 
    alert('Foto de perfil excluída.');
});


