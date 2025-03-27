// views/chasseurs/modifierChasseur.js

import { getChasseurs, getArmures, getArmes, updateChasseur } from "../../provider.js";
import { getInventaireObjets } from "../../utils/inventaire.js";
import Chasseur from "../models/Chasseur.js";

export async function afficherFormulaireModificationChasseur(idChasseur) {
    const chasseurMap = await getChasseurs();
    const chasseur = chasseurMap.get(idChasseur);
    const content = document.getElementById("content");
    const armuresArray = await getArmures();
    const armesMap = await getArmes();
    console.log(armesMap);
    const inventaireObjets = getInventaireObjets();

    if (chasseur && content) {
        content.innerHTML = "";

        const modifierChasseurForm = document.createElement("form");

        // Filtrer les armures et armes disponibles dans l'inventaire
        let armuresDisponibles = inventaireObjets
            .filter(objet => objet.type === 'armure')
            .map(objet => armuresArray.find(armure => armure.getId() === objet.id))
            .filter(armure => armure !== undefined);

        // Ajouter l'armure équipée si elle n'est pas déjà dans la liste
        if (chasseur.getArmureEquipee() && !armuresDisponibles.find(armure => armure.getId() === chasseur.getArmureEquipee().getId())) {
            armuresDisponibles.push(chasseur.getArmureEquipee());
        }

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

            <label for="armeEquipee">Arme équipée :</label>
            <select id="armeEquipee" name="armeEquipee">
                ${Array.from(armesMap.values()).map(arme => `<option value="${arme.getId()}" ${chasseur.getArmeEquipee().getId() === arme.getId() ? 'selected' : ''}>${arme.getNom()}</option>`).join('')}
            </select><br><br>

            <label for="armureEquipee">Armure équipée :</label>
            <select id="armureEquipee" name="armureEquipee">
                ${armuresDisponibles.map(armure => `<option value="${armure.getId()}" ${chasseur.getArmureEquipee().getId() === armure.getId() ? 'selected' : ''}>${armure.getNom()}</option>`).join('')}
            </select><br><br>

            <button type="submit">Enregistrer les modifications</button>
        `;

        modifierChasseurForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (chasseur instanceof Chasseur) {
                const nom = document.getElementById("nom").value;
                const rang = document.getElementById("rang").value;
                const specialisation = document.getElementById("specialisation").value;
                const notes = document.getElementById("notes").value;
                const armeEquipeeId = document.getElementById("armeEquipee").value;
                const armureEquipeeId = document.getElementById("armureEquipee").value;

                const armeEquipee = armesMap.get(armeEquipeeId);
                const armureEquipee = armuresArray.find(armure => armure.getId() === armureEquipeeId);

                chasseur.setNom(nom);
                chasseur.setRang(rang);
                chasseur.setSpecialisation(specialisation);
                chasseur.setNotes(notes);
                chasseur.setArmeEquipee(armeEquipee);
                
                console.log(armureEquipee);
                chasseur.setArmureEquipee(armureEquipee);

                chasseurMap.set(idChasseur, chasseur);

                const success = await updateChasseur(chasseur);
                if (success) {
                    localStorage.setItem("chasseurs", JSON.stringify(Array.from(chasseurMap.entries())));
                    afficherDetailChasseur(idChasseur);
                } else {
                    alert("Erreur lors de la mise à jour du chasseur.");
                }
            } else {
                console.error("L'objet chasseur n'est pas une instance de la classe Chasseur.");
            }
        });

        content.appendChild(modifierChasseurForm);
    }
}