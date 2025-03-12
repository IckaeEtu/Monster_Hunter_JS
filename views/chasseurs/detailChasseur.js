import { getChasseurs } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";

export async function afficherDetailChasseur(idChasseur) {
    console.log("Affichage de la liste des chasseurs")
    const chasseurMap = await getChasseurs();
    console.log(chasseurMap);
    console.log(chasseurMap instanceof Map)
    content = document.getElementById("content");

    if (!content) {
        console.error("L'élément 'content' n'a pas été trouvé.");
        return;
    }

    console.log(idChasseur);
    let chasseur = await chasseurMap.get(idChasseur);
    console.log(chasseur);

    if (chasseur) {
        document.getElementById("titrePage").innerText = chasseur.getNom();

        let chasseurUl = document.createElement("ul");

        let rangChasseur = document.createElement("li");
        rangChasseur.innerText = `Rang de Chasseur : ${chasseur.getRang()}`;
        chasseurUl.appendChild(rangChasseur);

        let speChasseur = document.createElement("li");
        speChasseur.innerText = `Spécialisation : ${chasseur.getSpecialisation()}`;
        chasseurUl.appendChild(speChasseur);

        // Gestion affichage arme

        // Gestion affichage monstres fav

        let note = document.createElement("li");
        note.innerText = `Notation : ${chasseur.getNotes()}`;
        chasseurUl.appendChild(note);
    
        content.innerHTML = "";
        content.appendChild(chasseurUl);

    }

}


