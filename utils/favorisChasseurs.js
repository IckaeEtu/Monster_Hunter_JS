// utils/favorisChasseurs.js

import { getFromStorage, saveToStorage } from './storage.js';

const FAVORIS_CHASSEURS_KEY = 'mh_favoris_chasseurs';

export function ajouterFavoriChasseur(idChasseur) {
  const favorisChasseurs = getFavorisChasseurs();
  if (!favorisChasseurs.includes(idChasseur)) {
    favorisChasseurs.push(idChasseur);
    saveToStorage(FAVORIS_CHASSEURS_KEY, favorisChasseurs);
  }
}

export function supprimerFavoriChasseur(idChasseur) {
  const favorisChasseurs = getFavorisChasseurs();
  const index = favorisChasseurs.indexOf(idChasseur);
  if (index !== -1) {
    favorisChasseurs.splice(index, 1);
    saveToStorage(FAVORIS_CHASSEURS_KEY, favorisChasseurs);
  }
}

export function getFavorisChasseurs() {
  return getFromStorage(FAVORIS_CHASSEURS_KEY) || [];
}

export function estFavoriChasseur(idChasseur) {
  return getFavorisChasseurs().includes(idChasseur);
}