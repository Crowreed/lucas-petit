// Fonction pour obtenir les paramètres de l'URL
function getPageParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('page'); // Retourne le paramètre 'page' ou null
}

// Fonction pour charger et afficher le Markdown
async function loadArticle(page) {
    const articleFile = `/articles/article${page}.md`; // Crée le nom du fichier à partir du paramètre

    fetch(articleFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier');
            }
            return response.text();
        })
        .then(text => {
            const html = marked(text);
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier Markdown:', error);
        });
}

async function loadArticles() {
    try {
        // Charger le fichier articles.json
        const response = await fetch('articles/articles.json');
        const articles = await response.json();

        // Sélectionner l'élément où afficher la liste des articles
        const articleList = document.getElementById('articleList');

        // Boucler sur chaque article et créer l'élément HTML correspondant
        articles.forEach(article => {
            // Créer l'élément de la liste
            const li = document.createElement('li');

            // Créer un lien vers l'article
            const a = document.createElement('a');
            a.href = article.link; // Lien vers l'article
            a.textContent = article.title; // Titre de l'article

            // Ajouter une description sous le lien
            const description = document.createElement('p');
            description.textContent = article.description;
            description.classList.add('article-description');

            // Ajouter le lien et la description à l'élément de la liste
            li.appendChild(a);
            li.appendChild(description);

            // Ajouter l'élément à la liste des articles
            articleList.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
    }
}

// Récupère le numéro de page et charge l'article correspondant
const page = getPageParam(); // Récupérer le numéro de page
if (page) { // Si un paramètre 'page' est présent
    loadArticle(page);
} else {
    // Ne rien faire si aucun paramètre n'est trouvé
    document.getElementById('content').innerHTML = ''; // Optionnel : Assurer que la section de contenu est vide
}


window.onload = loadArticles;

// Charger les articles lorsque la page est chargée
