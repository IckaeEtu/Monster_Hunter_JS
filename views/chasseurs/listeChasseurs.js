import { getChasseurs } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";

export async function afficherListeChasseurs() {
    console.log("Affichage de la liste des chasseurs");
    const chasseurMap = await getChasseurs();
    const content = document.getElementById("content");

    if (!content) {
        console.error("L'élément 'content' n'a pas été trouvé.");
        return;
    }

    document.getElementById('titrePage').innerText = "Liste des chasseurs";
    content.innerHTML = ""; // Efface le contenu existant

    const listeChasseursDiv = document.createElement("div");
    listeChasseursDiv.id = "liste-chasseurs";
    listeChasseursDiv.classList.add("liste-chasseurs");
    content.appendChild(listeChasseursDiv); // Ajoute le conteneur des chasseurs

    // Ajout de la div pour les boutons de pagination
    const paginationDiv = document.createElement("div");
    paginationDiv.id = "pagination-container";
    content.appendChild(paginationDiv); // Ajoute le conteneur de pagination

    $(paginationDiv).pagination({ // Utilise paginationDiv comme conteneur
        dataSource: Array.from(chasseurMap.values()),
        pageSize: 5,
        callback: function (data, pagination) {
            listeChasseursDiv.innerHTML = "";
            console.log(data);

            data.forEach(chasseur => {
                const chasseurCard = document.createElement("div");
                chasseurCard.classList.add("chasseur-card");
                const imageChasseur = document.createElement("img");
                imageChasseur.src = `/style/images/chasseurs/chasseur.webp`;
                imageChasseur.alt = `Image de ${chasseur.getNom()}`;
                imageChasseur.classList.add("chasseur-image");
                chasseurCard.appendChild(imageChasseur);

                const nomChasseur = document.createElement("h3");
                nomChasseur.textContent = chasseur.getNom();
                chasseurCard.appendChild(nomChasseur);

                const lienDetail = document.createElement("a");
                lienDetail.href = `#/chasseurs/${chasseur.getId()}`;
                lienDetail.textContent = "Détails";
                lienDetail.classList.add("chasseur-lien-details");
                chasseurCard.appendChild(lienDetail);

                listeChasseursDiv.appendChild(chasseurCard);
            });
        }
    });
}