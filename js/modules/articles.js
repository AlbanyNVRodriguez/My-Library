// RENDER ATICLES
async function renderArticles(articles){
    orderBooksByTitle(articles);
    addArticlesInMain(articles);
}
// ORDER ARTICLES BY TITLE
function orderBooksByTitle(articles){
    // order by title
    articles.sort(function(a,b){
        return (a.title).toLowerCase() > (b.title).toLowerCase()?  1 :  (a.title).toLowerCase() < (b.title).toLowerCase()?  -1 :  0;
    });
}
// ------------------------------------------------
// ADD ARTICLES IN MAIN
function addArticlesInMain(articles){
    const $mainArticles = document.querySelector(".main-articles"),
    $template =  document.querySelector(".template-article").content,
    fragment = document.createDocumentFragment();
    $mainArticles.innerHTML="";
    articles.forEach( art => {
        let $article = createArticleFromTemplate(art, $template);
        fragment.appendChild($article);
    });
    $mainArticles.append(fragment);
}
// CREATE ARTICLE FROM TEMPLATE
function createArticleFromTemplate(article, $template){
    $template.querySelector(".main-article").dataset.id = article.id;
    $template.querySelector(".main_article-picture img").src = `./img/${article.img}.svg`;
    $template.querySelector(".main_article-text .main_article-title").textContent = article.title.split("-")[0];
    $template.querySelector(".main_article-text .main_article-subtitle").textContent = article.title.split("-")[1];
    
    let copy = document.importNode($template, true);
    return copy;
}
// ------------------------------------------------
// BUTTON TO OPEN MODAL FROM ARTICLE
function buttonOpenModalFromArticle(params){
    if(params.click.matches(".main .main_art_buttons-read")){
        let { click, renderArticleInModal, openModal, articles } = params;
        let id = click.closest(".main-article").dataset.id;
        openModal({ id, renderArticleInModal, articles });
    }
}
// ------------------------------------------------
// BUTTON TO SAVE OR DELETE ARTICLE
function buttonToSaveOrDeleteArticle(params){
    if(params.click.matches(".main_art_buttons-save")){
        let { click, renderMenu, saveArticleInLocalStorage, deleteArticleInLocalStorage, articles } = params;
        let article = click.closest(".main-article"),
        id = article.dataset.id;
        if(click.textContent == "Guardar"){
            saveArticleInLocalStorage(id);
            changeArticleButtonStateToDelete(id);
        }else{
            deleteArticleInLocalStorage(id);
            changeArticleButtonStateToSaved(id);
        }
        renderMenu(articles);
    }
}
// CHANGE ARTICLE BUTTON STATE TO DELETE
function changeArticleButtonStateToDelete(id){
    let btnArticle = document.querySelector(`.main-article[data-id="${id}"] .main_art_buttons-save`);
    btnArticle.textContent="Eliminar";
    btnArticle.classList.add("remove");
}
// CHANGE ARTICLE BUTTON STATE TO SAVED
function changeArticleButtonStateToSaved(id){
    let btnArticle = document.querySelector(`.main-article[data-id="${id}"] .main_art_buttons-save`);
    if(btnArticle){
        btnArticle.textContent="Guardar";
        btnArticle.classList.remove("remove");
    }
}
// ------------------------------------------------
// FILTERS
function filter(click, loadArticlesFromLocalStorage, articles){
    if(click.matches(".main-filters .filters-filter")){
        removeFilters(click);
        renderFilteredArticles(click.dataset.value, loadArticlesFromLocalStorage, articles);
    }
}
async function renderFilteredArticles(filter, loadArticlesFromLocalStorage, articles){
    let articlesFilter = [];
    articles.forEach(art => {
        if(art.title.includes(filter)) articlesFilter.push(art);
    });
    orderBooksByTitle(articlesFilter);
    document.querySelector(".main-articles").innerHTML="";
    if(articlesFilter.length == 0){
        document.querySelector(".main-articles").innerHTML = `<h2>No hay articulos`;
        if(!document.querySelector(".filters-filter.active")){
        addArticlesInMain(articles);
            loadArticlesFromLocalStorage();
        }
    }else{
        if(document.querySelector(".filters-filter.active")){
            addArticlesInMain(articlesFilter);
            loadArticlesFromLocalStorage();
        }else{
            addArticlesInMain(articles);
            loadArticlesFromLocalStorage();
        }
    }
}
function removeFilters(click){
    if(click.className.includes("active")){
        click.classList.remove("active");
    }else{
        let filters = document.querySelectorAll(".main-filters .filters-filter");
        filters.forEach(filter => {
            filter.classList.remove("active");
        });
        addFilter(click);
    }
}
function addFilter(click){
    click.classList.add("active");
}
// ------------------------------------------------
export {
    renderArticles,
    buttonToSaveOrDeleteArticle,
    changeArticleButtonStateToSaved,
    changeArticleButtonStateToDelete,
    buttonOpenModalFromArticle,
    orderBooksByTitle,
    addArticlesInMain,
    filter
}