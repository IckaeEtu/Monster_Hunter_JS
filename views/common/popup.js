export function afficherPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.innerText = message;
    popup.style.display = "block";

    // Masquer la pop-up après 3 secondes
    setTimeout(() => {
        popup.style.display = "none";
    }, 6000);
}