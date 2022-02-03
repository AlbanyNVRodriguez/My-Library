// RENDER ATICLES
async function renderArticles(){
    let articles = await articlesFetch();
    orderBooksByTitle(articles);
    addArticlesInMain(articles);
}
// GETTING ARTICLES FROM JSON
async function articlesFetch(){
    try { 
        const res = await fetch("js/modules/dataBase.json"),
        json = await (res.ok ? res.json() : Promise.reject(res));
        return json;
    } catch (err) {
        return console.log("error al obtener los articulos del json");
    }
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
    const $main = document.querySelector(".main"),
    $template =  document.querySelector(".template-article").content,
    fragment = document.createDocumentFragment();

    articles.forEach( art => {
        let $article = createArticleFromTemplate(art, $template);
        fragment.appendChild($article);
    });
    $main.append(fragment);
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
        let { click, renderArticleInModal } = params;
        let id = click.closest(".main-article").dataset.id;
        renderArticleInModal(id, articlesFetch);
    }
}
// ------------------------------------------------
// BUTTON TO SAVE OR DELETE ARTICLE
function buttonToSaveOrDeleteArticle(params){
    if(params.click.matches(".main_art_buttons-save")){
        let { click, renderMenu, saveArticleInLocalStorage, deleteArticleInLocalStorage } = params;
        let article = click.closest(".main-article"),
        id = article.dataset.id;
        if(click.textContent == "Guardar"){
            saveArticleInLocalStorage(id);
            changeArticleButtonStateToDelete(id);
        }else{
            deleteArticleInLocalStorage(id);
            changeArticleButtonStateToSaved(id);
        }
        renderMenu();
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
    btnArticle.textContent="Guardar";
    btnArticle.classList.remove("remove");
}
// ------------------------------------------------
export {
    articlesFetch,
    renderArticles,
    buttonToSaveOrDeleteArticle,
    changeArticleButtonStateToSaved,
    changeArticleButtonStateToDelete,
    buttonOpenModalFromArticle
}