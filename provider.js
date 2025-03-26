// Contiendra les fonctions pour interagir avec l'API json-server (récupération des données, création/mise à jour, etc.).
// Sera responsable de la création des objets métiers à partir des données JSON.
import config from "./config.js";
import Chasseur from "./views/models/Chasseur.js";
import Monstre from "./views/models/Monstre.js";
import Arme from "./views/models/Arme.js";
import Armure from "./views/models/Armure.js";
import TypeMonstre from "./views/models/Type.js";
import Environnement from "./views/models/Environnement.js";

export async function getChasseurs() {
    try {
        const response = await fetch(`${config.apiUrl}/chasseurs`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const chasseursData = await response.json();
        let res = new Map();

        for (const chasseurData of chasseursData) {
            const arme = await getArme(chasseurData.armeEquipee);
            const monstresFavoris = await Promise.all(chasseurData.monstresFavoris.map(monstreId => getMonstre(monstreId)));
            const setArmureEquipee = await getArmure(chasseurData.setArmureEquipee);

            let chasseur = new Chasseur(
                chasseurData.id,
                chasseurData.nom,
                chasseurData.rang_de_chasseur,
                chasseurData.specialisation,
                arme,
                monstresFavoris,
                chasseurData.notes,
                setArmureEquipee
            );

            res.set(chasseur.getId(), chasseur);
        }

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
        const arme = await getArme(chasseurData.armeEquipee);
        const monstresFavoris = await Promise.all(chasseurData.monstresFavoris.map(monstreId => getMonstre(monstreId)));
        const setArmureEquipee = await getArmure(chasseurData.setArmureEquipee);

        let chasseur = new Chasseur(
            chasseurData.id,
            chasseurData.nom,
            chasseurData.rang_de_chasseur,
            chasseurData.specialisation,
            arme,
            monstresFavoris,
            chasseurData.notes,
            setArmureEquipee
        );

        return chasseur;
    } catch (error) {
        console.error("Erreur lors de la récupération du chasseur : ", error);
        return new Chasseur();
    }
}

export async function getMonstre(idMonstre) {
    try {
        const response = await fetch(`${config.apiUrl}/monstres/${idMonstre}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const monstreData = await response.json();
        const types = await Promise.all(monstreData.type_id.map(typeId => getTypesMonstre(typeId)));
        const environnements = await Promise.all(monstreData.environnement_id.map(environnementId => getEnvironnement(environnementId)));

        let monstre = new Monstre(
            monstreData.id,
            monstreData.nom,
            types,
            environnements,
            monstreData.faiblesses,
            monstreData.materiaux,
            monstreData.notes
        );

        return monstre;
    } catch (error) {
        console.error("Erreur lors de la récupération du monstre : ", error);
        return new Monstre();
    }
}

export async function getArme(idArme) {
    try {
        const response = await fetch(`${config.apiUrl}/armes/${idArme}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const armeData = await response.json();
        let arme = new Arme(
            armeData.id,
            armeData.nom,
            armeData.type,
            armeData.attaque,
            armeData.element
        );

        return arme;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'arme : ", error);
        return new Arme();
    }
}

export async function getArmure(idArmure) {
    try {
        const response = await fetch(`${config.apiUrl}/sets_d_armures/${idArmure}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const armureData = await response.json();
        let armure = new Armure(
            armureData.id,
            armureData.nom,
            armureData.monstre_id,
            armureData.composants,
            armureData.bonus
        );

        return armure;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'armure : ", error);
        return new Armure();
    }
}

export async function getTypesMonstre(idMonsterType) {
    try {
        const response = await fetch(`${config.apiUrl}/types_de_monstres/${idMonsterType}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const typeData = await response.json();
        let type = new TypeMonstre(
            typeData.id,
            typeData.nom
        );

        return type;
    } catch (error) {
        console.error("Erreur lors de la récupération du type de monstre : ", error);
        return new TypeMonstre();
    }
}

export async function getEnvironnement(idEnvironnement) {
    try {
        const response = await fetch(`${config.apiUrl}/environnements/${idEnvironnement}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const environnementData = await response.json();
        let environnement = new Environnement(
            environnementData.id,
            environnementData.nom,
            environnementData.zones,
            environnementData.habitats
        );

        return environnement;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'environnement : ", error);
        return new Environnement();
    }
}

export async function getMonstres() {
    try {
        const response = await fetch(`${config.apiUrl}/monstres`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const monstresData = await response.json();
        let res = new Map();

        for (const monstreData of monstresData) {
            const types = await Promise.all(monstreData.type_id.map(typeId => getTypesMonstre(typeId)));
            const environnements = await Promise.all(monstreData.environnement_id.map(environnementId => getEnvironnement(environnementId)));

            let monstre = new Monstre(
                monstreData.id,
                monstreData.nom,
                types,
                environnements,
                monstreData.faiblesses,
                monstreData.materiaux,
                monstreData.notes
            );

            res.set(monstre.getId(), monstre);
        }

        return res;
    } catch (error) {
        console.error("Erreur lors de la récupération des monstres : ", error);
        return new Map();
    }
}

export async function getEnvironnements() {
    try {
        const response = await fetch(`${config.apiUrl}/environnements`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const environnementsData = await response.json();
        let res = new Map();

        for (const environnementData of environnementsData) {
            let environnement = new Environnement(
                environnementData.id,
                environnementData.nom,
                environnementData.zones,
                environnementData.habitats
            );

            res.set(environnement.getId(), environnement);
        }

        return res;
    } catch (error) {
        console.error("Erreur lors de la récupération des environnements : ", error);
        return new Map();
    }
}

export async function getArmes() {
    try {
        const response = await fetch(`${config.apiUrl}/armes`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const armesData = await response.json();
        let res = new Map();

        for (const armeData of armesData) {
            let arme = new Arme(
                armeData.id,
                armeData.nom,
                armeData.type,
                armeData.attaque,
                armeData.element
            );

            res.set(arme.getId(), arme);
        }

        return res;
    } catch (error) {
        console.error("Erreur lors de la récupération des armes : ", error);
        return new Map();
    }
}

export async function getArmures() {
    try {
        const response = await fetch(`${config.apiUrl}/sets_d_armures`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const armuresData = await response.json();
        let armures = [];

        for (const armureData of armuresData) {
            let armure = new Armure(
                armureData.id,
                armureData.nom,
                armureData.monstre_id,
                armureData.composants,
                armureData.bonus
            );

            armures.push(armure);
        }

        return armures; 
    } catch (error) {
        console.error("Erreur lors de la récupération des armures : ", error);
        return []; 
    }
}

export async function getAllTypesMonstre() {
    try {
        const response = await fetch(`${config.apiUrl}/types_de_monstres`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, status: ${response.status}`);
        }

        const typesData = await response.json();
        let res = new Map();

        for (const typeData of typesData) {
            let type = new TypeMonstre(
                typeData.id,
                typeData.nom
            );

            res.set(type.getId(), type);
        }

        return res;
    } catch (error) {
        console.error("Erreur lors de la récupération des types de monstres : ", error);
        return new Map();
    }
}

export async function getCoffre() {
    const coffre = JSON.parse(localStorage.getItem("mh_inventaire_composants")) || [];
    return coffre;
}