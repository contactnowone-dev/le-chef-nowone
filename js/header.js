async function chargerConfiguration() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();

        // 1. Remplissage précis du Header (uniquement les éléments dans la balise .header)
        const header = document.querySelector('.header');
        if (header) {
            const nameEl = header.querySelector('.site-name');
            const sloganEl = header.querySelector('.site-slogan');
            if (nameEl) nameEl.textContent = config.nomSite;
            if (sloganEl) sloganEl.textContent = config.slogan;
        }

        // 2. Gestion du Menu de navigation
        const menuList = document.getElementById('menu-list');
        if (menuList) {
            menuList.innerHTML = '';
            config.menu.forEach(item => {
                const li = document.createElement('li');
                li.className = "menu-item";
                const a = document.createElement('a');
                a.href = item.lien;
                a.textContent = item.nom;
                a.style.backgroundImage = `url('${item.image}')`;
                li.appendChild(a);
                menuList.appendChild(li);
            });
        }

        // 3. Gestion de la Grille de Produits (Mangas)
        const grid = document.getElementById('grid-produits');
        if (grid) {
            // On récupère le nom du fichier actuel pour savoir quelle catégorie afficher
            const pagePath = window.location.pathname.split("/").pop() || "index.html";
            const categorie = pagePath.replace(".html", "");

            // Si on est sur une page de catégorie (ex: mangas.html)
            if (categorie !== "index" && config.produits[categorie]) {
                grid.innerHTML = '';
                config.produits[categorie].forEach(prod => {
                    grid.innerHTML += `
                        <article class="produit-card">
                            <img src="${prod.image}" class="produit-image">
                            <div class="produit-info">
                                <h3>${prod.titre}</h3>
                                <p>${prod.prix}</p>
                                <a href="${prod.link}" class="btn-affiliation" target="_blank">Acheter sur Amazon</a>
                            </div>
                        </article>`;
                });
            }
        }

        // 4. Mise à jour de l'année dans le footer
        const yearEl = document.getElementById('footer-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }

    } catch (e) {
        console.error("Erreur lors du chargement de la config :", e);
    }
}

// Lancement de la fonction
chargerConfiguration();