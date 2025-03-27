import { getArmures, getMonstre } from "../../provider.js";
import { getInventaireComposants, retirerObjet, ajouterArmure } from "../../utils/inventaire.js";

export async function afficherArmures() {
    const titrePage = document.getElementById("titrePage");
    titrePage.innerText = "Liste des Armures";

    const content = document.getElementById("content");
    content.innerHTML = "";

    const armures = await getArmures();

    for (const armure of armures) {
        const monstre = await getMonstre(armure.getMonstreId());

        const armureCard = document.createElement("div");
        armureCard.classList.add("armure-card");
        armureCard.innerHTML = `
            <h3>${armure.getNom()}</h3>
            <p>Monstre : ${monstre.getNom()}</p>
            <h4>Composants :</h4>
            <ul>
                ${armure.getComposants().map(composant => `<li>${composant.partie} x${composant.quantité}</li>`).join("")}
            </ul>
            <p>Bonus : ${armure.getBonus()}</p>
            <button class="craft-armure" data-armure-id="${armure.getId()}">Fabriquer</button>
        `;
        content.appendChild(armureCard);
    }

    document.querySelectorAll(".craft-armure").forEach(button => {
        button.addEventListener("click", async () => {
            const armureId = parseInt(button.dataset.armureId);
            let armureTrouvee = null;

            for (const armure of armures) {
                if (parseInt(armure.getId()) === armureId) {
                    armureTrouvee = armure;
                    break;
                }
            }

            if (armureTrouvee) {
                const armure = armureTrouvee;
                const composantsManquants = [];
                const composantsDisponibles = armure.getComposants().every(composant => {
                    const objetInventaire = getInventaireComposants().find(objet => objet.id === composant.partie);
                    if (!objetInventaire || objetInventaire.quantite < composant.quantité) {
                        composantsManquants.push(`${composant.partie} x${composant.quantité}`);
                        return false;
                    }
                    return true;
                });

                if (composantsDisponibles) {
                    armure.getComposants().forEach(composant => {
                        retirerObjet(composant.partie, composant.quantité);
                    });

                    ajouterArmure(armure.getId()); // Ajoute l'ID de l'armure à l'inventaire

                    alert(`Vous avez fabriqué l'armure ${armure.getNom()} !`);
                } else {
                    alert(`Composants manquants : ${composantsManquants.join(", ")}`);
                }
            } else {
                console.error(`Armure avec l'ID ${armureId} non trouvée.`);
                alert("Armure non trouvée.");
            }
        });
    });
}