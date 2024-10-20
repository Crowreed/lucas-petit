function loadHTML(url, containerId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du fichier');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
        })
        .catch(error => {
            console.error('Erreur lors du chargement:', error);
            document.getElementById(containerId).innerHTML = '<p>Erreur de chargement.</p>';
        });
}

function loadCSS(filename) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filename;

    document.head.appendChild(link);
}

loadHTML('assets/html/header.html', 'header-container');
loadHTML('assets/html/footer.html', 'footer-container');

loadCSS('assets/css/header.css');
loadCSS('assets/css/footer.css');