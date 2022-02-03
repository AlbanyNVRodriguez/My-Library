// RENDER MENU
function renderMenu(){
    document.querySelector(".menu").innerHTML="";
    if(localStorage.getItem("ArticlesLocalStorage") !== null && localStorage.getItem("ArticlesLocalStorage") !== "") addItemsInMenu();
}
// ADD ITEMS IN MENU
function addItemsInMenu(){
    let articlesInLocalStorage = localStorage.getItem("ArticlesLocalStorage").split(",");
    const $ul = document.querySelector(".menu"),
    $template = document.querySelector(".template-item").content,
    fragment = document.createDocumentFragment();
    articlesInLocalStorage.forEach(idArticle => {
        let itemMenu = createItemFromTemplate(idArticle, $template);
        fragment.appendChild(itemMenu);
    });
    $ul.append(fragment);
}
// CREATE ITEM FROM TEMPLATE
function createItemFromTemplate(id, $template){
    let img = document.querySelector(`.main-article[data-id="${id}"] img`).src;
    let title = document.querySelector(`.main-article[data-id="${id}"] .main_article-title`).textContent;
    $template.querySelector(".menu-item").dataset.id = id;
    $template.querySelector(".menu-item").dataset.title = title;
    $template.querySelector(".menu_item-picture img").src = img;
    $template.querySelector(".menu_item-picture img").alt = title;
    let copy = document.importNode($template, true);
    return copy;
}
// ------------------------------------------------
// BUTTON TO REMOVE MENU ITEM
function buttonToRemoveMenuItem(params){
    if(params.click.matches(".menu-item .menu_item-btn")){
        let { click, deleteArticleInLocalStorage, changeArticleButtonStateToSaved} = params;
        let id = click.parentElement.dataset.id;
        deleteArticleInLocalStorage(id);
        changeArticleButtonStateToSaved(id);
        renderMenu();
    }
}
// ------------------------------------------------
// OPEN MODAL FROM MENU ITEM
function openModalFromMenuItem(params){
    if(params.click.matches(".menu .menu-item")){
        let { click, renderArticleInModal, articlesFetch } = params;
        let id = click.dataset.id;
        renderArticleInModal(id, articlesFetch);
    } 
}
// ------------------------------------------------
export {
    renderMenu,
    buttonToRemoveMenuItem,
    openModalFromMenuItem
}