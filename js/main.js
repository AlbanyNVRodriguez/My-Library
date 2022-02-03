// NAVBAR
import { effectNavbarScroll, buttonChangeThemePage, buttonToShowOrHideTheMenu, themeDark, themeLight} from "./modules/navbar.js"; 
// MENU
import { renderMenu, buttonToRemoveMenuItem, openModalFromMenuItem } from "./modules/menu.js"; 
// ARTICLES
import { renderArticles, articlesFetch, buttonToSaveOrDeleteArticle, changeArticleButtonStateToSaved, buttonOpenModalFromArticle } from "./modules/articles.js"; 
// MODAL
import { renderArticleInModal, disableScrollingWhenOpeningModal, buttonToCloseTheModal, buttonToSaveOrDeleteTheReadingStatusOfTheArticle, closeModalOnClick } from "./modules/modal.js"; 
// LOCAL STORAGE
import { loadArticlesFromLocalStorage, loadThemeFromLocalStorage, saveArticleInLocalStorage, deleteArticleInLocalStorage,  saveArticleReadInLocalStorage, deleteArticleReadInLocalStorage} from "./modules/localStorage.js"; 

document.addEventListener("DOMContentLoaded",  async e=>{
    Promise.all([await renderArticles(), loadArticlesFromLocalStorage(), loadThemeFromLocalStorage(themeDark, themeLight), renderMenu(), effectNavbarScroll()]);
});
// CLICK EVENTS
document.addEventListener("click", e=> {
    let click = e.target;
    // navbar
    buttonChangeThemePage(click);
    buttonToShowOrHideTheMenu(click);
    // menu
    buttonToRemoveMenuItem( {click, deleteArticleInLocalStorage, changeArticleButtonStateToSaved} );
    openModalFromMenuItem({click, renderArticleInModal, articlesFetch});
    // article
    buttonToSaveOrDeleteArticle( {click, renderMenu, saveArticleInLocalStorage, deleteArticleInLocalStorage} );
    buttonOpenModalFromArticle({click, renderArticleInModal});
    // Modal
    buttonToCloseTheModal(click);
    buttonToSaveOrDeleteTheReadingStatusOfTheArticle({ click, saveArticleReadInLocalStorage, deleteArticleReadInLocalStorage });
    closeModalOnClick(e);
});
// SCROLL EVENT
document.addEventListener("scroll", e=>{
    disableScrollingWhenOpeningModal();
    effectNavbarScroll();
});