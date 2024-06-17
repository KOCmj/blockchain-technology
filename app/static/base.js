document.addEventListener("DOMContentLoaded", () => {
    const mainMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.querySelector('.user-menu');
    const closeMenuButton = document.querySelector('.close-menu');
  
    mainMenuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      userMenu.classList.toggle('hidden');
    });
  
    closeMenuButton.addEventListener('click', () => {
      userMenu.classList.add('hidden');
    });
  
    window.addEventListener('click', (event) => {
      if (!userMenu.contains(event.target) && !mainMenuButton.contains(event.target)) {
        userMenu.classList.add('hidden');
      }
    });
  });
  