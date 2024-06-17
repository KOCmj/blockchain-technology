document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('show-login');
  const signupButton = document.getElementById('show-signup');
  const popupContainer = document.getElementById('popup-container');
  const loginForm = popupContainer.querySelector('.popup .login-form');
  const signupForm = popupContainer.querySelector('.popup .signup-form');
  const closeButton = popupContainer.querySelector('.close-btn');
  const loginButton1 = document.querySelector('.L');
  const signupButton1 = document.querySelector('.S');

  const showPopup = () => {
    popupContainer.classList.add('active');
  };

  const closePopup = () => {
    popupContainer.classList.remove('active');
  };

  const showLoginForm = () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  };

  const showSignupForm = () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  };

  loginButton1.addEventListener('click', (event) => {
    event.stopPropagation();
    showPopup();
    showLoginForm();
  });

  loginButton.addEventListener('click', (event) => {
    event.stopPropagation();
    showPopup();
    showLoginForm();
  });

  signupButton1.addEventListener('click', (event) => {
    event.stopPropagation();
    showPopup();
    showSignupForm();
  });

  signupButton.addEventListener('click', (event) => {
    event.stopPropagation();
    showPopup();
    showSignupForm();
  });

  closeButton.addEventListener('click', () => {
    closePopup();
  });


  document.addEventListener('click', (event) => {
    if (!popupContainer.contains(event.target) && 
      !loginButton.contains(event.target) && 
      !signupButton.contains(event.target) && 
      !loginButton1.contains(event.target) && 
      !signupButton1.contains(event.target)) {
        closePopup()
    };
  });
});