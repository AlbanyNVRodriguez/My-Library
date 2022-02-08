// NAVBAR
import { effectNavbarScroll, buttonChangeThemePage, buttonToShowOrHideTheMenu, themeDark, themeLight} from "./modules/navbar.js"; 
// MENU
import { renderMenu, buttonToRemoveMenuItem, openModalFromMenuItem } from "./modules/menu.js"; 
// ARTICLES
import { renderArticles, articlesFetch, buttonToSaveOrDeleteArticle, changeArticleButtonStateToSaved, changeArticleButtonStateToDelete, buttonOpenModalFromArticle } from "./modules/articles.js"; 
// MODAL
import { openModal, renderArticleInModal, disableScrollingWhenOpeningModal, buttonToCloseTheModal, buttonToSavedArticleTheModal, buttonToSaveOrDeleteTheReadingStatusOfTheArticle, closeModalOnClick } from "./modules/modal.js"; 
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
    openModalFromMenuItem({click, renderArticleInModal, articlesFetch, openModal});
    // article
    buttonToSaveOrDeleteArticle( {click, renderMenu, saveArticleInLocalStorage, deleteArticleInLocalStorage} );
    buttonOpenModalFromArticle({click, renderArticleInModal, articlesFetch, openModal});
    // Modal
    buttonToCloseTheModal(click);
    buttonToSavedArticleTheModal({ click, renderMenu, saveArticleInLocalStorage, deleteArticleInLocalStorage, changeArticleButtonStateToDelete, changeArticleButtonStateToSaved });
    buttonToSaveOrDeleteTheReadingStatusOfTheArticle({ click, saveArticleReadInLocalStorage, deleteArticleReadInLocalStorage });
    closeModalOnClick(e);
});
// SCROLL EVENT
document.addEventListener("scroll", e=>{
    disableScrollingWhenOpeningModal();
    effectNavbarScroll();
});