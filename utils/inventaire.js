// utils/inventaire.js

import { getFromStorage, saveToStorage } from './storage.js';

const INVENTAIRE_KEY = 'mh_inventaire';

export function getInventaire() {
    return getFromStorage(INVENTAIRE_KEY) || []; // Tableau d'objet {"id":...,"quantite":...}
}

export function ajouterObjet(objetId, quantite = 1) {
    const inventaire = getInventaire();
    const objetExistant = inventaire.find(objet => objet.id === objetId);
    if (objetExistant) {
        objetExistant.quantite += quantite;
    } else {
        inventaire.push({ id: objetId, quantite });
    }
    saveToStorage(INVENTAIRE_KEY, inventaire);
}

export function retirerObjet(objetId, quantite = 1) {
    const inventaire = getInventaire();
    const objetExistant = inventaire.find(objet => objet.id === objetId);
    if (objetExistant) {
        objetExistant.quantite -= quantite;
        if (objetExistant.quantite <= 0) {
            const index = inventaire.indexOf(objetExistant);
            inventaire.splice(index, 1);
        }
        saveToStorage(INVENTAIRE_KEY, inventaire);
    }
}

export function setInventaire(inventaire) {
    saveToStorage(INVENTAIRE_KEY, inventaire);
}