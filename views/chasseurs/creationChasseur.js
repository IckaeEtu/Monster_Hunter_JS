import { getChasseurs, getMonstres, getArmes, getArmures, creerChasseur } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";
import Arme from "../models/Arme.js";
import Armure from "../models/Armure.js";
import Monstre from "../models/Monstre.js";

export async function afficherFormulaireCreationChasseur() {
    const content = document.getElementById("content");
    content.innerHTML = "";

    const creationChasseurForm = document.createElement("form");
    creationChasseurForm.innerHTML = `
        <h2>Créer un Chasseur</h2>
        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom" required><br><br>

        <label for="rang">Rang :</label>
        <input type="text" id="rang" name="rang" disabled="disabled" value=0><br><br>

        <label for="specialisation">Spécialisation :</label>
        <input type="text" id="specialisation" name="specialisation" required><br><br>

        <label for="notes">Notes :</label>
        <textarea id="notes" name="notes"></textarea><br><br>

        <label for="armeEquipee">Arme équipée :</label>
        <select id="armeEquipee" name="armeEquipee"></select><br><br>

        <label for="armureEquipee">Armure équipée :</label>
        <select id="armureEquipee" name="armureEquipee"></select><br><br>

        <label for="monstresFavoris">Monstres favoris :</label>
        <select id="monstresFavoris" name="monstresFavoris" multiple></select><br><br>

        <button type="submit">Créer le Chasseur</button>
    `;

    content.appendChild(creationChasseurForm);

    // Remplir les listes déroulantes avec les données du provider
    remplirListesDeroulantes();

    creationChasseurForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nom = document.getElementById("nom").value;
        const rang = 0;
        const specialisation = document.getElementById("specialisation").value;
        const notes = document.getElementById("notes").value;
        const armeEquipeeId = document.getElementById("armeEquipee").value;
        const armureEquipeeId = document.getElementById("armureEquipee").value;
        const monstresFavorisIds = Array.from(document.getElementById("monstresFavoris").selectedOptions).map(option => option.value);

        const armesMap = await getArmes();
        const armuresMap = await getArmures();
        const monstresMap = await getMonstres();

        const armeEquipee = armesMap.get(armeEquipeeId);
        const armureEquipee = armuresMap.find(armure => armure.getId() === parseInt(armureEquipeeId));
        const monstresFavoris = monstresFavorisIds.map(id => monstresMap.get(id));

        const nouveauChasseur = new Chasseur(
            null, // L'ID sera généré par le serveur
            nom,
            rang,
            specialisation,
            notes,
            armeEquipee,
            armureEquipee,
            monstresFavoris
        );

        // Créer le chasseur via l'API
        const createdChasseur = await creerChasseur(nouveauChasseur);

        if (createdChasseur) {
            // Rediriger vers la page de détails du nouveau chasseur
            window.location.hash = `#/chasseurs/${createdChasseur.id}`;
        } else {
            alert("Erreur lors de la création du chasseur.");
        }
    });
}

async function remplirListesDeroulantes() {
    const armesMap = await getArmes();
    const armuresMap = await getArmures();
    const monstresMap = await getMonstres();

    const armeEquipeeSelect = document.getElementById("armeEquipee");
    const armureEquipeeSelect = document.getElementById("armureEquipee");
    const monstresFavorisSelect = document.getElementById("monstresFavoris");

    armesMap.forEach(arme => {
        const option = document.createElement("option");
        option.value = arme.getId();
        option.textContent = arme.getNom();
        armeEquipeeSelect.appendChild(option);
    });

    armuresMap.forEach(armure => {
        const option = document.createElement("option");
        option.value = armure.getId();
        option.textContent = armure.getNom();
        armureEquipeeSelect.appendChild(option);
    });

    monstresMap.forEach(monstre => {
        const option = document.createElement("option");
        option.value = monstre.getId();
        option.textContent = monstre.getNom();
        monstresFavorisSelect.appendChild(option);
    });
}