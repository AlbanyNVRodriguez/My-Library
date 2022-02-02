function renderMenu(){
    document.querySelector(".menu").innerHTML="";
    if(localStorage.getItem("ArticlesLocalStorage") !== null && localStorage.getItem("ArticlesLocalStorage") !== "") addItemsInMenu();
}
// ADD ITEMS IN MENU
function addItemsInMenu(){
    let BooksLocalStorage = localStorage.getItem("ArticlesLocalStorage").split(",");
    const $ul = document.querySelector(".menu"),
    $template = document.querySelector(".template-item").content,
    fragment = document.createDocumentFragment();
    BooksLocalStorage.forEach(book => {
        let itemMenu = createItemFromTemplate(book, $template);
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
// BUTTON TO DELETE ITEM
function buttonToDeleteItem(params){
    let { click, renderMenu, deleteArticleFromLocalStorage } = params;
    if(click.matches(".menu-item .menu_item-btn")){
        let id = click.parentElement.dataset.id;
        let btnItem = document.querySelector(`.main-article[data-id="${id}"`).querySelector(".main_art_buttons-save");
        btnItem.textContent="Guardar";
        btnItem.classList.remove("remove");
        deleteArticleFromLocalStorage(id);
        renderMenu();
    }
}
// OPEN MODAL FROM MENU ITEM
function openModalFromMenuItem(params){
    let { click, renderArticleInModal, ArticlesFetch } = params;
    if(click.matches(".menu .menu-item")) renderArticleInModal(click.dataset.id, ArticlesFetch)
}
export {
    renderMenu,
    buttonToDeleteItem,
    openModalFromMenuItem
}