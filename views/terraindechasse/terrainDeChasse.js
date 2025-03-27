// views/terrainDeChasse.js

import { getEnvironnements, getMonstres } from "/provider.js";
import { ajouterObjet } from "/utils/inventaire.js";
import { afficherPopup } from '/views/common/popup.js';


export async function afficherTerrainDeChasse() {
    const titrePage = document.getElementById("titrePage");
    titrePage.innerText = "Terrain de Chasse";

    const content = document.getElementById("content");
    content.innerHTML = "";

    const environnements = await getEnvironnements();
    const monstres = await getMonstres();

    const terrainContainer = document.createElement("div");
    terrainContainer.id = "terrain-container";
    content.appendChild(terrainContainer);

    for (const environnement of environnements) {
        // Capture de la valeur de environnement dans environnementActuel
        const environnementActuel = environnement;
        const environnementButton = document.createElement("button");
        environnementButton.innerText = environnementActuel.getNom();
        environnementButton.addEventListener("click", () => {
            const nomPourUrl = formatNomPourUrl(environnementActuel.getNom());
            window.location.hash = `#/terrain_de_chasse/${nomPourUrl}`;
        });
        terrainContainer.appendChild(environnementButton);
    }
}

function formatNomPourUrl(nom) {
    return nom
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_");
}

export async function afficherMonstresParEnvironnementRoute(nomEnvironnement) {
    const content = document.getElementById("content");
    content.innerHTML = "";

    const environnements = await getEnvironnements();
    const monstres = await getMonstres();

    // Formater le nom extrait de l'URL pour la comparaison
    const nomEnvironnementFormatte = formatNomPourUrl(nomEnvironnement);

    const environnement = Array.from(environnements.values()).find(env => {
        // Formater le nom de l'environnement avant la comparaison
        const nomEnvFormatte = formatNomPourUrl(env.getNom());
        return nomEnvFormatte === nomEnvironnementFormatte;
    });

    if (!environnement) {
        content.innerHTML = "<p>Environnement non trouvé.</p>";
        return;
    }

    afficherMonstresDeLEnvironnement(environnement, monstres, content);
}

function afficherMonstresDeLEnvironnement(environnement, monstres, container) {
    container.innerHTML = ""; // Efface les précédents éléments

    const titreEnvironnement = document.createElement("h2");
    titreEnvironnement.textContent = `Monstres de ${environnement.getNom()}`;
    container.appendChild(titreEnvironnement);

    const monstresDeLEnvironnement = Array.from(monstres.values()).filter(monstre =>
        monstre.getEnvironnement().map(env => env.getId()).includes(environnement.getId())
    );

    if (monstresDeLEnvironnement.length === 0) {
        container.innerHTML = "<p>Aucun monstre trouvé dans cet environnement.</p>";
        return;
    }

    // Bouton Retour
    const retourButton = document.createElement("button");
    retourButton.textContent = "Retour aux environnements";
    retourButton.addEventListener("click", () => {
        window.location.hash = "#/terrain_de_chasse";
    });
    container.appendChild(retourButton);

    // Création du tableau
    const table = document.createElement("table");
    table.classList.add("monstre-table");

    // Création de l'en-tête du tableau
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Nom", "Faiblesses", "Loot possible", "Action"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Création du corps du tableau
    const tbody = document.createElement("tbody");
    monstresDeLEnvironnement.forEach(monstre => {
        const tr = document.createElement("tr");

        // Colonne Nom
        const tdNom = document.createElement("td");
        tdNom.textContent = monstre.getNom();
        tr.appendChild(tdNom);

        // Colonne Faiblesses
        const tdFaiblesses = document.createElement("td");
        tdFaiblesses.textContent = monstre.getFaiblesses().join(", ");
        tr.appendChild(tdFaiblesses);

        // Colonne Loot possible
        const tdLoot = document.createElement("td");
        tdLoot.textContent = `${monstre.getMateriaux()}`;
        tr.appendChild(tdLoot);

        // Colonne Action
        const tdAction = document.createElement("td");
        const chasserButton = document.createElement("button");
        chasserButton.textContent = "Chasser";
        chasserButton.addEventListener("click", () => {
            chasserMonstre(monstre);
        });
        tdAction.appendChild(chasserButton);
        tr.appendChild(tdAction);

        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.appendChild(table);
}

function chasserMonstre(monstre) {
    const materiauxObtenus = genererMateriauxAleatoires(monstre);
    materiauxObtenus.forEach(objet => {
        ajouterObjet(objet.nom, objet.quantite);
    });
    console.log(materiauxObtenus);
    afficherPopup(`Chasse réussie ! Loot récupéré : ${materiauxObtenus.map(objet => `${objet.nom} x${objet.quantite}`).join(', ')}`);
}

function genererMateriauxAleatoires(monstre) {
    const materiaux = monstre.getMateriaux();
    const materiauxObtenus = [];
    materiaux.forEach(nomMateriaux => {
        const quantite = Math.floor(Math.random() * 3); // Nombre aléatoire de matériaux
        materiauxObtenus.push({ nom: nomMateriaux, quantite });
    });
    return materiauxObtenus;
}