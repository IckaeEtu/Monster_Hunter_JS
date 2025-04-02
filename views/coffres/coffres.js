// views/coffres/coffre.js

import { getCoffre } from "../../provider.js";

export async function afficherCoffre() {
    const titrePage = document.getElementById("titrePage");
    titrePage.innerText = "Coffre Partagé";

    const content = document.getElementById("content");
    content.innerHTML = `
        <div id="coffre-container" class="coffre-container"></div>
    `;

    const coffreContainer = document.getElementById("coffre-container");
    const coffre = await getCoffre();
    console.log(coffre);

    coffre.forEach(objet => {
        const objetCard = document.createElement("div");
        objetCard.classList.add("objet-card");
        objetCard.innerHTML = `
            <p>${objet.id} x${objet.quantite}</p>
        `;
        coffreContainer.appendChild(objetCard);
    });
}