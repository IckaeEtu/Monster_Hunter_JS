import { getChasseurs, getArmes } from "../../provider.js";
import Chasseur from "../models/Chasseur.js";
import Arme from "../models/Arme.js";
import { ajouterObjet } from "../../utils/inventaire.js";
import { ajouterFavoriChasseur, supprimerFavoriChasseur, estFavoriChasseur } from '/utils/favorisChasseurs.js';

export async function afficherDetailChasseur(idChasseur) {
    console.log("Affichage de la liste des chasseurs");

    const chasseurMap = await getChasseurs();
    console.log(chasseurMap);
    console.log(chasseurMap instanceof Map);
    let content = document.getElementById("content");

    if (!content) {
        console.error("L'élément 'content' n'a pas été trouvé.");
        return;
    }

    console.log(idChasseur);
    let chasseur = await chasseurMap.get(idChasseur);
    console.log(chasseur);

    if (chasseur) {
        document.getElementById("titrePage").innerText = chasseur.getNom();

        let chasseurUl = document.createElement("ul");

        let rangChasseur = document.createElement("li");
        rangChasseur.innerText = `Rang de Chasseur : ${chasseur.getRang()}`;
        chasseurUl.appendChild(rangChasseur);

        let speChasseur = document.createElement("li");
        speChasseur.innerText = `Spécialisation : ${chasseur.getSpecialisation()}`;
        chasseurUl.appendChild(speChasseur);

        // Gestion affichage arme
        let armeChasseur = document.createElement("li");
        armeChasseur.innerText = "Arme équipée : ";
        
        let listesArmes = document.createElement("select");
        listesArmes.setAttribute("id", "listeArmes");
        
        let armes = await getArmes();
        
        armes.forEach(arme => {
            let option = document.createElement("option");
            option.value = arme.getId();
            option.textContent = arme.getNom();
        
            if (chasseur.getArmeEquipee() && arme.getId() === chasseur.getArmeEquipee().getId()) {
                option.selected = true;
            }
        
            listesArmes.appendChild(option);
        });
        armeChasseur.appendChild(listesArmes);
        chasseurUl.appendChild(armeChasseur);

        let armureChasseur = document.createElement("li");
        armureChasseur.innerText = `Armure équipée : ${chasseur.getArmureEquipee().getNom()}`;
        chasseurUl.appendChild(armureChasseur);

        // Gestion affichage monstres favoris
        let monstresFav = document.createElement("li");
        monstresFav.innerText = "Monstres favoris :";
        let ulMonstres = document.createElement("ul");

        // Pour chaque monstre favori, on ajoute un élément de liste
        chasseur.getMonstresFavoris().forEach(monstre => {
            let monstreLi = document.createElement("li");
            monstreLi.innerText = monstre.getNom();

            // Bouton chasser
            const chasserButton = document.createElement('button');
            chasserButton.innerText = 'Chasser';
            chasserButton.addEventListener('click', () => {
                const materiauxObtenus = genererMateriauxAleatoires(monstre);
                materiauxObtenus.forEach(objet => {
                    ajouterObjet(objet.nom, objet.qte);
                });
                //afficherDetailChasseur(idChasseur); // Recharger la vue
            })

            monstreLi.appendChild(chasserButton);
            ulMonstres.appendChild(monstreLi);
        });

        monstresFav.appendChild(ulMonstres);
        chasseurUl.appendChild(monstresFav);

        let note = document.createElement("li");
        note.innerText = `Notation : ${chasseur.getNotes()}`;
        chasseurUl.appendChild(note);

        content.innerHTML = "";
        content.appendChild(chasseurUl);

        // Gestion du bouton favori
        const boutonFavori = document.createElement('button');
        boutonFavori.textContent = estFavoriChasseur(chasseur.getId()) ? 'Supprimer des favoris' : 'Ajouter aux favoris';

        boutonFavori.addEventListener('click', () => {
            toggleFavori(chasseur.getId(), boutonFavori);
        });

        content.appendChild(boutonFavori); // Ajouter le bouton à la fin du contenu
    }
}

function toggleFavori(idChasseur, bouton) {
    if (estFavoriChasseur(idChasseur)) {
        supprimerFavoriChasseur(idChasseur);
        bouton.textContent = 'Ajouter aux favoris';
    } else {
        ajouterFavoriChasseur(idChasseur);
        bouton.textContent = 'Supprimer des favoris';
    }
}

function genererMateriauxAleatoires(monstre) {
    const materiaux = monstre.getMateriaux();
    const materiauxObtenus = [];
    materiaux.forEach(nomMateriaux => {
        const qte = Math.floor(Math.random() *3);
        materiauxObtenus.push({nom: nomMateriaux, qte});
    });
    console.log(materiauxObtenus);
    return materiauxObtenus;
}