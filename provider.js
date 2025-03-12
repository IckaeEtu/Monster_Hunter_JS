//Contiendra les fonctions pour interagir avec l'API json-server (récupération des données, création/mise à jour, etc.).
//Sera responsable de la création des objets métiers à partir des données JSON.
import config from "./config.js";
import Chasseur from "./views/models/Chasseur.js"

export async function getChasseurs() {
    try {
        const response = await fetch(`${config.apiUrl}/chasseurs`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const chasseursData = await response.json();
        let res = new Map();

        chasseursData.forEach(chasseurData => {
            let chasseur = new Chasseur(
                chasseurData.id,
                chasseurData.nom,
                chasseurData.rang_de_chasseur,
                chasseurData.specialisation,
                chasseurData.armeEquipee,
                chasseurData.monstresFavoris,
                chasseurData.notes,
                chasseurData.setArmureEquipee
            );

            res.set(chasseur.getId(), chasseur);
        });

        return res;
    } catch (error) {
        console.error("Erreur lors de la récupération des chasseurs : ", error);
        return new Map();
    }
}

export async function getChasseur(idChasseur) {
    try {
        const response = await fetch(`${config.apiUrl}/chasseurs/${idChasseur}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const chasseurData = await response.json();
        let chasseur = new Chasseur(
            chasseurData.id,
            chasseurData.nom,
            chasseurData.rang_de_chasseur,
            chasseurData.specialisation,
            chasseurData.armeEquipee,
            chasseurData.monstresFavoris,
            chasseurData.notes,
            chasseurData.setArmureEquipee
        );

        res.set(chasseur.getId(), chasseur);
        
        return chasseur;
    } catch (error) {
        console.error("Erreur lors de la récupération des chasseurs : ", error);
        return new chasseur();
    }
}