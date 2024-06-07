document.addEventListener('DOMContentLoaded', function () {
    const articleForm = document.getElementById('article-form');
    const articleIdInput = document.getElementById('article-id');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const articlesContainer = document.getElementById('articles-container');

    const initialArticles = [
        { id: 1, title: "Efeitos do Mercúrio na Saúde Humana", content: "O mercúrio é um metal pesado altamente tóxico que pode causar sérios danos ao sistema nervoso central e aos rins. A exposição prolongada pode levar a problemas neurológicos graves e comprometimento cognitivo." },
        { id: 2, title: "Ameaças dos Compostos Orgânicos Voláteis", content: "Compostos orgânicos voláteis (COVs) são substâncias químicas que se evaporam facilmente e podem causar irritação nos olhos, nariz e garganta, além de problemas respiratórios e até câncer em exposições prolongadas." },
        { id: 3, title: "Impactos do Chumbo na Saúde Infantil", content: "A exposição ao chumbo pode resultar em danos graves ao desenvolvimento cognitivo e neurológico em crianças. Mesmo baixos níveis de exposição podem afetar a inteligência, a capacidade de atenção e o comportamento." },
        { id: 4, title: "Perigos do Benzeno na Indústria", content: "O benzeno é amplamente utilizado na indústria química, mas é um carcinógeno conhecido. A exposição ao benzeno pode causar leucemia e outros distúrbios hematológicos." },
        { id: 5, title: "Toxidade dos Pesticidas Organofosforados", content: "Pesticidas organofosforados são conhecidos por sua alta toxicidade. Eles afetam o sistema nervoso dos insetos e podem ter efeitos neurológicos graves em humanos, incluindo fraqueza muscular, convulsões e até a morte." },
        { id: 6, title: "Riscos Associados ao Amianto", content: "O amianto é um mineral fibroso que, quando inalado, pode causar doenças pulmonares graves, incluindo asbestose, câncer de pulmão e mesotelioma. A exposição ocupacional continua sendo uma preocupação significativa." }
    ];

    // Carregar artigos do localStorage ou usar artigos iniciais
    function loadArticles() {
        let articles = JSON.parse(localStorage.getItem('articles'));
        if (!articles || articles.length === 0) {
            articles = initialArticles;
            localStorage.setItem('articles', JSON.stringify(articles));
        }
        articlesContainer.innerHTML = '';
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('grid-item');
            articleElement.innerHTML = `
                <div class="thumbnail"></div>
                <div class="description">
                    <h2><a href="#" onclick="editArticle(${article.id})">&nbsp;${article.title}</a></h2>
                    <p>${article.content}</p>
                    <button onclick="editArticle(${article.id})">Editar</button>
                    <button onclick="deleteArticle(${article.id})">Excluir</button>
                </div>
            `;
            articlesContainer.appendChild(articleElement);
        });
    }

    // Salvar artigo
    articleForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const id = articleIdInput.value ? parseInt(articleIdInput.value) : Date.now();
        const title = titleInput.value;
        const content = contentInput.value;

        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        const existingArticleIndex = articles.findIndex(article => article.id === id);

        if (existingArticleIndex > -1) {
            articles[existingArticleIndex] = { id, title, content };
        } else {
            articles.push({ id, title, content });
        }

        localStorage.setItem('articles', JSON.stringify(articles));
        loadArticles();
        articleForm.reset();
    });

    // Editar artigo
    window.editArticle = function (id) {
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        const article = articles.find(article => article.id === id);
        if (article) {
            articleIdInput.value = article.id;
            titleInput.value = article.title;
            contentInput.value = article.content;
        }
    };

    // Excluir artigo
    window.deleteArticle = function (id) {
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles = articles.filter(article => article.id !== id);
        localStorage.setItem('articles', JSON.stringify(articles));
        loadArticles();
    };

    // Inicializar
    loadArticles();
});
