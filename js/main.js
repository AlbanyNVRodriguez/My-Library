import { navbarScroll, buttonChangeTheme, buttonMenu } from "./modules/navbar.js"; // NAVBAR
import { renderMenu, buttonToDeleteItem, openModalFromMenuItem } from "./modules/menu.js"; // MENU
import { ArticlesFetch, renderArticles, buttonToSaveOrDeleteArticle, buttonOpenArticleInModal } from "./modules/articles.js"; // ARTICLES
import { buttonCloseModal, buttonToSaveOrDeleteStatusArticleFromModal, closeModalOnClick, renderArticleInModal, disableScrollForModal} from "./modules/modal.js"; // MODAL
import { loadLocalStorage, saveArticleInLocalStorage, deleteArticleFromLocalStorage, themeDark, themeLight, saveStatusArticleFromModalInLocalStorage, deleteStatusArticleFromModalInLocalStorage} from "./modules/localStorage.js"; // LOCAL STORAGE

document.addEventListener("DOMContentLoaded",  async e=>{
    Promise.all([await renderArticles(),await loadLocalStorage(), renderMenu(), navbarScroll()]);
});
// CLICK EVENTS
document.addEventListener("click", e=> {
    let click = e.target;
    // // theme
    buttonChangeTheme( {click, themeDark, themeLight} );
    // // menu
    buttonMenu(click);
    buttonToDeleteItem( {click, renderMenu, deleteArticleFromLocalStorage} );
    openModalFromMenuItem({click, renderArticleInModal, ArticlesFetch});
    // // article
    buttonToSaveOrDeleteArticle( {click, renderMenu, saveArticleInLocalStorage, deleteArticleFromLocalStorage} );
    buttonOpenArticleInModal({click, renderArticleInModal, ArticlesFetch});
    // // Modal
    buttonCloseModal(click);
    buttonToSaveOrDeleteStatusArticleFromModal({ click, saveStatusArticleFromModalInLocalStorage, deleteStatusArticleFromModalInLocalStorage });
    closeModalOnClick(e);
});
// SCROLL EVENT
document.addEventListener("scroll", e=>{
    disableScrollForModal();
    navbarScroll();
});