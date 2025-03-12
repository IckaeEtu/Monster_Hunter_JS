import { getChasseurs } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";

export async function afficherListeChasseurs() {
    console.log("Affichage de la liste des chasseurs")
    const chasseurMap = await getChasseurs();
    content = document.getElementById("content");

    if (!content) {
        console.error("L'élément 'content' n'a pas été trouvé.");
        return;
    }

    document.getElementById('titrePage').innerText = "Liste des chasseurs";
    let listeChasseurUl = document.createElement("ul");
    listeChasseurUl.id = "liste-chasseur";

    chasseurMap.forEach(chasseur => {
        let chasseurLi = document.createElement("li");

        chasseurLi.textContent = chasseur.getNom();

        let lienDetail = document.createElement("a");
        lienDetail.href = `#/chasseurs/${chasseur.getId()}`;
        lienDetail.textContent = "(Détails)";
        chasseurLi.appendChild(lienDetail);

        listeChasseurUl.appendChild(chasseurLi);
    });

    content.innerHTML=""; // On efface le contenu précédent
    content.appendChild(listeChasseurUl);
}


