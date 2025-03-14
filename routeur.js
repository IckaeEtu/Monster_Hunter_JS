/**
 * Routeur
 * Il faut importer toute les fonctions d'affichages des vues
 */
import { afficherDetailChasseur } from "./views/chasseurs/detailChasseur.js";
import { afficherListeChasseurs } from "./views/chasseurs/listeChasseurs.js";
import { afficherPageAccueil } from "./views/common/accueil.js";

function router() {
    console.log(window.location);
    const hash = window.location.hash;
    const segments = hash.slice(1).split('/'); // Supprimer le '#' et diviser
    console.log(segments);

    switch (segments[1]) { // Utiliser segments[0]
        case "":
            afficherPageAccueil();
            break;
        case "chasseurs":
            if (segments.length === 2) { // Vérifier la longueur
                afficherListeChasseurs();
            } else if (segments.length === 3) {
                const id = String(segments[2]);
                if (!isNaN(id)) {
                    afficherDetailChasseur(id);
                } else {
                    console.error("ID de chasseur invalide.");
                    afficherPageAccueil();
                }
            }
            break;
        default:
            afficherPageAccueil();
            break;
    }
}

window.addEventListener("hashchange", router);

router();