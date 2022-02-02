async function renderArticles(){
    let articles = await ArticlesFetch();
    orderBooksByTitle(articles);
    addArticlesInMain(articles);
}
// GETTING JSON ARTICLES
async function ArticlesFetch(){
    try { 
        const res = await fetch("js/modules/dataBase.json");
        const json = await (res.ok ? res.json() : Promise.reject(res));
        return json;
    } catch (err) {
        return err;
    }
}
// ORDER ARTICLES BY TITLE
function orderBooksByTitle(articles){
    // order by title
    articles.sort(function(a,b){
        return (a.title).toLowerCase() > (b.title).toLowerCase()?  1 :  (a.title).toLowerCase() < (b.title).toLowerCase()?  -1 :  0;
    });
}
// ADD ARTICLES IN MAIN
function addArticlesInMain(articles){
    const $main = document.querySelector(".main"),
    $template =  document.querySelector(".template-article").content,
    fragment = document.createDocumentFragment();
    articles.forEach( article => {
        let newArticle = createArticleFromTemplate(article, $template);
        fragment.appendChild(newArticle);
    });
    $main.append(fragment);
}
// CREATE ARTICLE FROM TEMPLATE
function createArticleFromTemplate(article, $template){
    let title = article.title.split("-");
    $template.querySelector(".main-article").dataset.id = article.id;
    $template.querySelector(".main_article-picture img").src = `./img/${article.img}.svg`;
    $template.querySelector(".main_article-text .main_article-title").textContent = title[0];
    $template.querySelector(".main_article-text .main_article-subtitle").textContent = title[1];
    
    let copy = document.importNode($template, true);
    return copy;
}
// BUTTON TO SAVE OR DELETE ARTICLE
function buttonToSaveOrDeleteArticle(params){
    let { click, renderMenu, saveArticleInLocalStorage, deleteArticleFromLocalStorage } = params;
    if(click.matches(".main_art_buttons-save")){
        let id = click.parentElement.parentElement.dataset.id;
        if(click.textContent == "Guardar"){
            saveArticleInLocalStorage(id);
            click.textContent="Eliminar";
            click.classList.add("remove");
        }else{
            deleteArticleFromLocalStorage(id);
            click.textContent="Guardar";
            click.classList.remove("remove");
        }
        renderMenu();
    }
}
// BUTTON TO READ THE ARTICLE IN THE MODAL
function buttonOpenArticleInModal(params){
    let { click, renderArticleInModal, ArticlesFetch } = params;
    if(click.matches(".main .main_art_buttons-read")){
        let id = click.closest(".main-article").dataset.id;
        renderArticleInModal(id, ArticlesFetch);
    }
}

export {
    ArticlesFetch,
    renderArticles,
    buttonToSaveOrDeleteArticle,
    buttonOpenArticleInModal
}