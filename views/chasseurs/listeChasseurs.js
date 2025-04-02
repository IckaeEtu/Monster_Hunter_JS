import { getChasseurs } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";
import {
    getFavorisChasseurs,
    estFavoriChasseur,
    ajouterFavoriChasseur,
    supprimerFavoriChasseur,
} from "../../utils/favorisChasseurs.js";
import { afficherFormulaireCreationChasseur } from "./creationChasseur.js";

export async function afficherListeChasseurs() {
    console.log("Affichage de la liste des chasseurs");
    const chasseurMap = await getChasseurs();
    const content = document.getElementById("content");

    if (!content) {
        console.error("L'élément 'content' n'a pas été trouvé.");
        return;
    }

    // Vérification de la page actuelle
    if (window.location.hash === "#/chasseurs") {
        document.getElementById("titrePage").innerText = "Liste des chasseurs";
        content.innerHTML = "";

        // Ajout de la barre de recherche
        const rechercheContainer = document.createElement("div");
        rechercheContainer.id = "recherche-container";
        content.appendChild(rechercheContainer);

        const rechercheInput = document.createElement("input");
        rechercheInput.type = "text";
        rechercheInput.id = "recherche-chasseur";
        rechercheInput.placeholder = "Rechercher un chasseur...";
        rechercheContainer.appendChild(rechercheInput);

        // Conteneur principal pour la grille et la sidebar
        const mainContainer = document.createElement("div");
        mainContainer.id = "main-container";
        content.appendChild(mainContainer);

        // Bouton pour afficher le formulaire de création
        const boutonCreerChasseur = document.createElement("button");
        boutonCreerChasseur.textContent = "Créer un Chasseur";
        boutonCreerChasseur.addEventListener("click", () => {
            afficherFormulaireCreationChasseur();
        });
        content.appendChild(boutonCreerChasseur);

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

        const chasseurs = Array.from(chasseurMap.values());
        let filteredChasseurs = chasseurs; // Initialise avec tous les chasseurs

        $(paginationDiv).pagination({
            dataSource: filteredChasseurs,
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

                            // Icône "Supprimer des favoris" (croix)
                            const supprimerFavoriIcon = document.createElement("i");
                            supprimerFavoriIcon.classList.add("fas", "fa-times", "supprimer-favori-icon"); // Icône de croix de Font Awesome
                            supprimerFavoriIcon.addEventListener("click", (e) => {
                                e.preventDefault();
                                supprimerFavoriChasseur(chasseur.getId());
                                afficherListeChasseurs();
                            });
                            favoriLink.appendChild(supprimerFavoriIcon);
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

                    // Icône "Ajouter aux favoris" (cœur)
                    const ajouterFavoriIcon = document.createElement("i");
                    ajouterFavoriIcon.classList.add("far", "fa-heart", "ajouter-favori-icon"); // Icône de cœur vide
                    ajouterFavoriIcon.addEventListener("click", () => {
                        if (estFavoriChasseur(chasseur.getId())) {
                            supprimerFavoriChasseur(chasseur.getId());
                            ajouterFavoriIcon.classList.remove("fas");
                            ajouterFavoriIcon.classList.add("far");
                        } else {
                            ajouterFavoriChasseur(chasseur.getId());
                            ajouterFavoriIcon.classList.remove("far");
                            ajouterFavoriIcon.classList.add("fas");
                        }
                        afficherListeChasseurs();
                    });
                    chasseurCard.appendChild(ajouterFavoriIcon);

                    // Mettre à jour l'icône en fonction de l'état de favori
                    if (estFavoriChasseur(chasseur.getId())) {
                        ajouterFavoriIcon.classList.remove("far");
                        ajouterFavoriIcon.classList.add("fas");
                    }

                    listeChasseursDiv.appendChild(chasseurCard);
                });
            },
        });

        rechercheInput.addEventListener("input", function () {
            const rechercheTerme = rechercheInput.value.toLowerCase();
            filteredChasseurs = chasseurs.filter(chasseur =>
                chasseur.getNom().toLowerCase().includes(rechercheTerme)
            );

            $(paginationDiv).pagination('destroy');
            $(paginationDiv).pagination({
                dataSource: filteredChasseurs,
                pageSize: 6,
                callback: function (data, pagination) {
                    listeChasseursDiv.innerHTML = "";
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

                                // Icône "Supprimer des favoris" (croix)
                                const supprimerFavoriIcon = document.createElement("i");
                                supprimerFavoriIcon.classList.add("fas", "fa-times", "supprimer-favori-icon"); // Icône de croix de Font Awesome
                                supprimerFavoriIcon.addEventListener("click", (e) => {
                                    e.preventDefault();
                                    supprimerFavoriChasseur(chasseur.getId());
                                    afficherListeChasseurs();
                                });
                                favoriLink.appendChild(supprimerFavoriIcon);
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

                        // Icône "Ajouter aux favoris" (cœur)
                        const ajouterFavoriIcon = document.createElement("i");
                        ajouterFavoriIcon.classList.add("far", "fa-heart", "ajouter-favori-icon"); // Icône de cœur vide
                        ajouterFavoriIcon.addEventListener("click", () => {
                            if (estFavoriChasseur(chasseur.getId())) {
                                supprimerFavoriChasseur(chasseur.getId());
                                ajouterFavoriIcon.classList.remove("fas");
                                ajouterFavoriIcon.classList.add("far");
                            } else {
                                ajouterFavoriChasseur(chasseur.getId());
                                ajouterFavoriIcon.classList.remove("far");
                                ajouterFavoriIcon.classList.add("fas");
                            }
                            afficherListeChasseurs();
                        });
                        chasseurCard.appendChild(ajouterFavoriIcon);

                        // Mettre à jour l'icône en fonction de l'état de favori
                        if (estFavoriChasseur(chasseur.getId())) {
                            ajouterFavoriIcon.classList.remove("far");
                            ajouterFavoriIcon.classList.add("fas");
                        }

                        listeChasseursDiv.appendChild(chasseurCard);
                    });
                },
            });
        });
    } else {
        console.log("Ce n'est pas la page de la liste des chasseurs.");
    }
}