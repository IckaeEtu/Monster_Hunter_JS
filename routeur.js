/**
 * Routeur
 * Il faut importer toute les fonctions d'affichages des vues
 */
import { afficherDetailChasseur } from "./views/chasseurs/detailChasseur.js";
import { afficherListeChasseurs } from "./views/chasseurs/listeChasseurs.js";
import { afficherPageAccueil } from "./views/common/accueil.js";
import { afficherFavorisChasseurs } from "./views/favoris/afficherFavoris.js";
import { afficherCoffre } from "./views/coffres/coffres.js";
import { afficherArmures } from "./views/armures/armures.js";
import { afficherTerrainDeChasse } from "./views/terraindechasse/terrainDeChasse.js";
import { afficherMonstresParEnvironnementRoute } from "./views/terraindechasse/terrainDeChasse.js";
import { afficherFormulaireModificationChasseur } from "./views/chasseurs/modifierChasseur.js";

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
                if (segments.length === 2) {
                    afficherListeChasseurs();
                } else if (segments.length === 3) {
                    const id = String(segments[2]);
                    if (!isNaN(id)) {
                        afficherDetailChasseur(id);
                    } else {
                        console.error("ID de chasseur invalide.");
                        afficherPageAccueil();
                    }
                } else if (segments.length === 4 && segments[3] === "modifier") { 
                    const id = String(segments[2]);
                    if (!isNaN(id)) {
                        afficherFormulaireModificationChasseur(id);
                    } else {
                        console.error("ID de chasseur invalide.");
                        afficherPageAccueil();
                    }
                }
                break;
        case "favoris":
            afficherFavorisChasseurs();
            break;
        case "coffres":
            afficherCoffre();
            break;
        case "armures":
            afficherArmures();
            break;
        case "terrain_de_chasse":
            if (segments.length === 2) {
                afficherTerrainDeChasse();
            } else if (segments.length === 3) {
                const nomEnvironnement = segments[2];
                afficherMonstresParEnvironnementRoute(nomEnvironnement);
            }
            break;
        default:
            afficherPageAccueil();
            break;
    }
}

window.addEventListener("hashchange", router);

router();