// views/chasseurs/detailChasseur.js

import { getChasseurs, getMonstres, getArmes, getMonstre } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";
import Arme from "../models/Arme.js";
import Type from "../models/Type.js";
import { ajouterObjet } from "../../utils/inventaire.js";
import { ajouterFavoriChasseur, supprimerFavoriChasseur, estFavoriChasseur } from '/utils/favorisChasseurs.js';
import { afficherPopup } from '/views/common/popup.js';

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
                    <img src="/data/icons/${monstre.getLienImage()}" alt="image_${monstre.getNom()}" />
                    <p><strong>Types :</strong> ${types.map(type => type.getNom()).join(", ")}</p>
                `;
            const chasserButton = document.createElement('button');
            chasserButton.innerText = 'Chasser';
            chasserButton.addEventListener('click', () => {
                const materiauxObtenus = genererMateriauxAleatoires(monstre);

                console.log(materiauxObtenus);
                materiauxObtenus.forEach(objet => {
                    console.log(objet);
                    ajouterObjet(objet.nom, objet.quantite);
                });
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

        const boutonModifierChasseur = document.createElement("button");
        boutonModifierChasseur.textContent = "Modifier le Chasseur";
        boutonModifierChasseur.addEventListener("click", () => {
            window.location.hash = `/chasseurs/${idChasseur}/modifier`;
        });
        content.appendChild(boutonModifierChasseur);
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
    afficherPopup(`Chasse réussie ! Loot récupéré : ${materiauxObtenus.map(objet => `${objet.nom} x${objet.qte}`).join(', ')}`);
    return materiauxObtenus;
}

async function afficherFormulaireModificationChasseur(idChasseur) {
    const chasseurMap = await getChasseurs();
    const chasseur = chasseurMap.get(idChasseur);
    const content = document.getElementById("content");

    if (chasseur && content) {
        content.innerHTML = ""; // Efface le contenu existant

        const modifierChasseurForm = document.createElement("form");
        modifierChasseurForm.innerHTML = `
            <h2>Modifier le Chasseur</h2>
            <label for="nom">Nom :</label>
            <input type="text" id="nom" name="nom" value="${chasseur.getNom()}"><br><br>

            <label for="rang">Rang :</label>
            <input type="text" id="rang" name="rang" value="${chasseur.getRang()}"><br><br>

            <label for="specialisation">Spécialisation :</label>
            <input type="text" id="specialisation" name="specialisation" value="${chasseur.getSpecialisation()}"><br><br>

            <label for="notes">Notes :</label>
            <textarea id="notes" name="notes">${chasseur.getNotes()}</textarea><br><br>

            <button type="submit">Enregistrer les modifications</button>
        `;

        modifierChasseurForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nom = document.getElementById("nom").value;
            const rang = document.getElementById("rang").value;
            const specialisation = document.getElementById("specialisation").value;
            const notes = document.getElementById("notes").value;

            chasseur.setNom(nom);
            chasseur.setRang(rang);
            chasseur.setSpecialisation(specialisation);
            chasseur.setNotes(notes);

            chasseurMap.set(idChasseur, chasseur);

            localStorage.setItem("chasseurs", JSON.stringify(Array.from(chasseurMap.entries())));

            afficherDetailChasseur(idChasseur); // Recharger la vue des détails
        });

        content.appendChild(modifierChasseurForm);
    }
}