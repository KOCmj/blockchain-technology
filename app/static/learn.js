document.addEventListener('DOMContentLoaded', () => {
    const funFactButton = document.getElementById('funFactButton');
    const funFactPopup = document.getElementById('funFactPopup');
    const closePopupButton = document.getElementById('closePopupButton');

    funFactButton.addEventListener('click', () => {
        funFactPopup.classList.remove('hidden');
    });

    closePopupButton.addEventListener('click', () => {
        funFactPopup.classList.add('hidden');
    });
});