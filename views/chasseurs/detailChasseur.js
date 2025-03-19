// views/chasseurs/detailChasseur.js

import { getChasseurs, getMonstres, getArmes, getMonstre } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";
import Arme from "../models/Arme.js";
import Type from "../models/Type.js";
import { ajouterObjet } from "../../utils/inventaire.js";
import { ajouterFavoriChasseur, supprimerFavoriChasseur, estFavoriChasseur } from '/utils/favorisChasseurs.js';

export async function afficherDetailChasseur(idChasseur) {
    console.log("Affichage de la liste des chasseurs");

    const chasseurMap = await getChasseurs();
    console.log(chasseurMap);
    console.log(chasseurMap instanceof Map);
    let content = document.getElementById("content");

    if (!content) {
        console.error("L'élément 'content' n'a pas été trouvé.");
        return;
    }

    console.log(idChasseur);
    let chasseur = await chasseurMap.get(idChasseur);
    console.log(chasseur);

    if (chasseur) {
        document.getElementById("titrePage").innerText = chasseur.getNom();

        const chasseurDetails = document.createElement("div");
        chasseurDetails.classList.add("chasseur-details");

        // Carte pour les informations générales
        const infoCard = document.createElement("div");
        infoCard.classList.add("info-card");
        infoCard.innerHTML = `
            <h2>Informations Générales</h2>
            <p><strong>Rang de Chasseur :</strong> ${chasseur.getRang()}</p>
            <p><strong>Spécialisation :</strong> ${chasseur.getSpecialisation()}</p>
            <p><strong>Notation :</strong> ${chasseur.getNotes()}</p>
        `;
        chasseurDetails.appendChild(infoCard);

        // Carte pour l'équipement
        const equipementCard = document.createElement("div");
        equipementCard.classList.add("equipement-card");
        equipementCard.innerHTML = `
            <h2>Équipement</h2>
            <p><strong>Arme équipée :</strong> ${chasseur.getArmeEquipee().getNom()}</p>
            <p><strong>Armure équipée :</strong> ${chasseur.getArmureEquipee().getNom()}</p>
        `;
        chasseurDetails.appendChild(equipementCard);

        // Carte pour les monstres favoris
        const monstresCard = document.createElement("div");
        monstresCard.classList.add("monstres-card");
        monstresCard.innerHTML = `
            <h2>Monstres Favoris</h2>
            <div id="monstres-favoris-container"></div>
        `;
        chasseurDetails.appendChild(monstresCard);

        content.innerHTML = "";
        content.appendChild(chasseurDetails);

        // Affichage des monstres favoris
        const monstresFavorisContainer = document.getElementById("monstres-favoris-container");
        chasseur.getMonstresFavoris().forEach(monstre => {
            const monstreCard = document.createElement("div");
            monstreCard.classList.add("monstre-card");
            let types = monstre.getType();
            monstreCard.innerHTML = `
                <h3>${monstre.getNom()}</h3>
                <img src="" alt="image_${monstre.getNom()}" />
                <p><strong>Types :</strong> ${types.map(type => type.getNom()).join(", ")}</p>
            `;
            const chasserButton = document.createElement('button');
            chasserButton.innerText = 'Chasser';
            chasserButton.addEventListener('click', () => {
                const materiauxObtenus = genererMateriauxAleatoires(monstre);
                materiauxObtenus.forEach(objet => {
                    ajouterObjet(objet.id, objet.quantite);
                });
                // afficherDetailChasseur(idChasseur); // Recharger la vue
            })

            monstreCard.appendChild(chasserButton);
            monstresFavorisContainer.appendChild(monstreCard);
        });

        // Gestion du bouton favori
        const boutonFavori = document.createElement('button');
        boutonFavori.textContent = estFavoriChasseur(chasseur.getId()) ? 'Supprimer des favoris' : 'Ajouter aux favoris';

        boutonFavori.addEventListener('click', () => {
            toggleFavori(chasseur.getId(), boutonFavori);
        });

        content.appendChild(boutonFavori);
    }
}

function toggleFavori(idChasseur, bouton) {
    if (estFavoriChasseur(idChasseur)) {
        supprimerFavoriChasseur(idChasseur);
        bouton.textContent = 'Ajouter aux favoris';
    } else {
        ajouterFavoriChasseur(idChasseur);
        bouton.textContent = 'Supprimer des favoris';
    }
}

function genererMateriauxAleatoires(monstre) {
    const materiaux = monstre.getMateriaux();
    const materiauxObtenus = [];
    materiaux.forEach(nomMateriaux => {
        const qte = Math.floor(Math.random() * 3);
        materiauxObtenus.push({ nom: nomMateriaux, qte });
    });
    return materiauxObtenus;
}