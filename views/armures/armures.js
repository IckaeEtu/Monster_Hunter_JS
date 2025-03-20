// views/armures/armures.js

import { getArmures, getMonstre } from "../../provider.js";
import Armure from "../models/Armure.js";

export async function afficherArmures() {
    const titrePage = document.getElementById("titrePage");
    titrePage.innerText = "Liste des Armures";

    const content = document.getElementById("content");
    content.innerHTML = "";

    const armures = await getArmures();
    console.log(armures);

    for (const armure of armures) {
        const monstre = await getMonstre(armure.monstre_id); // Récupère le monstre associé

        const armureCard = document.createElement("div");
        armureCard.classList.add("armure-card");
        armureCard.innerHTML = `
            <h3>${armure.nom}</h3>
            <p>Monstre : ${monstre.getNom()}</p> 
            <h4>Composants :</h4>
            <ul>
                ${armure.getComposants().map(composant => `<li>${composant.partie} x${composant.quantité}</li>`).join("")}
            </ul>
            <p>Bonus : ${armure.bonus}</p>
        `;
        content.appendChild(armureCard);
    };
}