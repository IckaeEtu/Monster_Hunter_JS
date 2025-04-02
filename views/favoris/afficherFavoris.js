import { getChasseur } from "/provider.js";
import { getFavorisChasseurs } from "../../utils/favorisChasseurs.js";

export async function afficherFavorisChasseurs() {
    const favorisIds = getFavorisChasseurs();
    const content = document.getElementById('content');

    if (!content) {
        console.error("L'élément 'content' n'a pas été trouvé.");
        return;
    }

    if (favorisIds.length === 0) {
        content.textContent = "Aucun chasseur favori.";
        return;
    }

    const chasseurs = await Promise.all(favorisIds.map(id => getChasseur(id)));

    const chasseurUl = document.createElement('ul');

    chasseurs.forEach(chasseur => {
        if (chasseur && chasseur.getNom) {
            const chasseurLi = document.createElement('li');
            chasseurLi.textContent = chasseur.getNom();
            chasseurUl.appendChild(chasseurLi);
        }
    });

    content.appendChild(chasseurUl);
}