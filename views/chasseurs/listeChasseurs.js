import { getChasseurs } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";
import {
    getFavorisChasseurs,
    estFavoriChasseur,
    ajouterFavoriChasseur,
    supprimerFavoriChasseur,
} from "../../utils/favorisChasseurs.js";

export async function afficherListeChasseurs() {
    console.log("Affichage de la liste des chasseurs");
    const chasseurMap = await getChasseurs();
    const content = document.getElementById("content");

    if (!content) {
        console.error("L'élément 'content' n'a pas été trouvé.");
        return;
    }

    document.getElementById("titrePage").innerText = "Liste des chasseurs";
    content.innerHTML = "";

    // Conteneur principal pour la grille et la sidebar
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    content.appendChild(mainContainer);

    // Conteneur pour la grille des chasseurs
    const listeChasseursDiv = document.createElement("div");
    listeChasseursDiv.id = "liste-chasseurs";
    listeChasseursDiv.classList.add("liste-chasseurs");
    mainContainer.appendChild(listeChasseursDiv);

    // Conteneur pour les favoris
    const favorisContainer = document.createElement("div");
    favorisContainer.id = "favoris-container";
    favorisContainer.classList.add("favoris-container");
    mainContainer.appendChild(favorisContainer);

    const titreFavoris = document.createElement("h2");
    titreFavoris.textContent = "Favoris";
    favorisContainer.appendChild(titreFavoris);

    const favorisList = document.createElement("ul");
    favorisContainer.appendChild(favorisList);

    // Ajout de la div pour les boutons de pagination
    const paginationDiv = document.createElement("div");
    paginationDiv.id = "pagination-container";
    content.appendChild(paginationDiv);

    $(paginationDiv).pagination({
        dataSource: Array.from(chasseurMap.values()),
        pageSize: 6,
        callback: function (data, pagination) {
            listeChasseursDiv.innerHTML = "";

            // Mise à jour des favoris
            favorisList.innerHTML = "";
            const favorisIds = getFavorisChasseurs();
            if (favorisIds.length > 0) {
                favorisIds.forEach((id) => {
                    const chasseur = chasseurMap.get(id);
                    if (chasseur) {
                        // Création d'un lien vers la page de détails
                        const favoriItem = document.createElement("li");
                        favorisList.appendChild(favoriItem);

                        const favoriLink = document.createElement("a");
                        favoriLink.textContent = chasseur.getNom();
                        favoriLink.href = `#/chasseurs/${chasseur.getId()}`;
                        favoriLink.classList.add("favori-lien-details");
                        favoriItem.appendChild(favoriLink);

                        // Bouton "Supprimer des favoris"
                        const supprimerFavoriBtn = document.createElement("button");
                        supprimerFavoriBtn.textContent = "Supprimer";
                        supprimerFavoriBtn.classList.add("supprimer-favori-btn");
                        supprimerFavoriBtn.addEventListener("click", (e) => {
                            e.preventDefault(); // Empêcher la navigation
                            supprimerFavoriChasseur(chasseur.getId());
                            afficherListeChasseurs(); // Recharger la liste pour mettre à jour l'affichage
                        });
                        favoriLink.appendChild(supprimerFavoriBtn);
                    }
                });
            } else {
                favorisList.innerHTML = "Aucun favori.";
            }

            data.forEach((chasseur) => {
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

                // Bouton "Ajouter aux favoris"
                const ajouterFavoriBtn = document.createElement("button");
                ajouterFavoriBtn.textContent = "Ajouter favori";
                ajouterFavoriBtn.classList.add("ajouter-favori-btn");
                ajouterFavoriBtn.addEventListener("click", () => {
                    ajouterFavoriChasseur(chasseur.getId());
                    afficherListeChasseurs(); // Recharger la liste pour mettre à jour l'affichage
                });
                chasseurCard.appendChild(ajouterFavoriBtn);

                listeChasseursDiv.appendChild(chasseurCard);
            });
        },
    });
}