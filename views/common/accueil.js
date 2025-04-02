export function afficherPageAccueil() {
    let titrePage = document.getElementById("titrePage");
    titrePage.innerText = "Monster Hunter JS";

    let content = document.getElementById("content");
    content.innerHTML = `
        <section id="accueil">
            <h1>Bienvenue dans Monster Hunter JS</h1>
            <p>Découvrez l'univers passionnant de Monster Hunter...</p>
            <div id="fonctionnalites">
                <h2>Fonctionnalités</h2>
                <ul>
                    <li>Liste des chasseurs</li>
                    <li>Chasser des monstres</li>
                    <li>Vos chasseurs favoris</li>
                    <li>Coffre de matériaux</li>
                </ul>
            </div>
            <div id="actualites">
                <h2>Dernières actualités</h2>
                <p>Nouvelle mise à jour : ...</p>
                <p>Événement spécial : ...</p>
            </div>
        </section>
    `;
}