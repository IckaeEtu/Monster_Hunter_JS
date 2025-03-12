import { getChasseur } from "../../provider";

export function afficherFavoris() {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || []

    document.getElementById('titrePage').innerText = "Liste des chasseurs favoris";
    let listeChasseurUl = document.createElement("ul");
    listeChasseurUl.id = "liste-chasseur";

    favoris.forEach(id => {
        let chasseur = getChasseur(id)
        let chasseurLi = document.createElement("li");

        chasseurLi.textContent = chasseur.getNom();

        let lienDetail = document.createElement("a");
        lienDetail.href = `#/chasseurs/${chasseur.getId()}`;
        lienDetail.textContent = "(Détails)";
        chasseurLi.appendChild(lienDetail);

        listeChasseurUl.appendChild(chasseurLi);
    });
}

/**
 * Permet d'ajouter un chasseur a sa liste de chasseur favoris
 * @param {int} idChasseur id d'un chasseur
 */
function ajouterFavori(idChasseur) {

    let favoris = JSON.parse(localStorage.getItem('favoris')) || [];

    if (!favoris.includes(idChasseur)) {
        favoris.push(idChasseur);

        localStorage.setItem('favoris', JSON.stringify(favoris));
        console.log(`Chasseur ${idChasseur} ajouté aux favoris.`);
    } else {
        console.log(`Chasseur ${idChasseur} est déjà dans les favoris.`);
    }
}