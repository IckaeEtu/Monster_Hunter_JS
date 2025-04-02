// utils/inventaire.js

import { getFromStorage, saveToStorage } from './storage.js';

const INVENTAIRE_COMPOSANTS_KEY = 'mh_inventaire_composants';
const INVENTAIRE_OBJETS_KEY = 'mh_inventaire_objets';

// Gestion de l'inventaire des composants
export function getInventaireComposants() {
    return getFromStorage(INVENTAIRE_COMPOSANTS_KEY) || [];
}

export function ajouterObjet(objetId, quantite = 1) {
    const inventaire = getInventaireComposants();
    const objetExistant = inventaire.find(objet => objet.id === objetId);
    if (objetExistant) {
        objetExistant.quantite += quantite;
    } else {
        inventaire.push({ id: objetId, quantite });
    }
    saveToStorage(INVENTAIRE_COMPOSANTS_KEY, inventaire);
}

export function retirerObjet(objetId, quantite = 1) {
    const inventaire = getInventaireComposants();
    const objetExistant = inventaire.find(objet => objet.id === objetId);
    if (objetExistant) {
        objetExistant.quantite -= quantite;
        if (objetExistant.quantite <= 0) {
            const index = inventaire.indexOf(objetExistant);
            inventaire.splice(index, 1);
        }
        saveToStorage(INVENTAIRE_COMPOSANTS_KEY, inventaire);
    }
}

// Gestion de l'inventaire des objets fabriqués
export function getInventaireObjets() {
    return getFromStorage(INVENTAIRE_OBJETS_KEY) || [];
}

export function ajouterArmure(armureId) {
    const inventaire = getInventaireObjets();
    inventaire.push({ id: armureId, type: 'armure' });
    saveToStorage(INVENTAIRE_OBJETS_KEY, inventaire);
}

export function ajouterArme(armeId) {
    const inventaire = getInventaireObjets();
    inventaire.push({ id: armeId, type: 'arme' });
    saveToStorage(INVENTAIRE_OBJETS_KEY, inventaire);
}