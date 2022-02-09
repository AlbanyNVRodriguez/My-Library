// RENDER MENU
async function renderMenu(articles){
    document.querySelector(".menu").innerHTML="";
    if(localStorage.getItem("ArticlesLocalStorage") !== null && localStorage.getItem("ArticlesLocalStorage") !== "") addMenuItems(articles);
}
// ADD MENU ITEMS
function addMenuItems(articles){
    let articlesInLocalStorage = localStorage.getItem("ArticlesLocalStorage").split(",");
    const $menu = document.querySelector(".menu"),
    $template = document.querySelector(".template-item").content,
    fragment = document.createDocumentFragment();

    articlesInLocalStorage.forEach(idArticle => {
        let $menuItem = createItemFromTemplate(idArticle, $template, articles);
        fragment.appendChild($menuItem);
    });
    $menu.append(fragment);
}
// CREATE ITEM FROM TEMPLATE
function createItemFromTemplate(id, $template, articles){
    let article = articles.filter(art=> art.id==id)[0];

    $template.querySelector(".menu-item").dataset.id = article.id;
    $template.querySelector(".menu-item").dataset.title = article.title.split("-")[1];
    $template.querySelector(".menu_item-picture img").src = `img/${article.img}.svg`;
    $template.querySelector(".menu_item-picture img").alt = article.title;
    
    let copy = document.importNode($template, true);
    return copy;
}
// ------------------------------------------------
// BUTTON TO REMOVE MENU ITEM
function buttonToRemoveMenuItem(params){
    if(params.click.matches(".menu-item .menu_item-btn")){
        let { click, deleteArticleInLocalStorage, changeArticleButtonStateToSaved, articles} = params;
        let id = click.parentElement.dataset.id;
        deleteArticleInLocalStorage(id);
        changeArticleButtonStateToSaved(id);
        renderMenu(articles);
    }
}
// ------------------------------------------------
// OPEN MODAL FROM MENU ITEM
function openModalFromMenuItem(params){
    if(params.click.matches(".menu .menu-item")){
        let { click, renderArticleInModal, articles, openModal } = params;
        let id = click.dataset.id;
        openModal({ id, renderArticleInModal, articles });
    } 
}
// ------------------------------------------------
export {
    renderMenu,
    buttonToRemoveMenuItem,
    openModalFromMenuItem
}