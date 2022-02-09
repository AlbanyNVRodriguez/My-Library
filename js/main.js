// NAVBAR
import { effectNavbarScroll, buttonChangeThemePage, buttonToShowOrHideTheMenu, themeDark, themeLight} from "./modules/navbar.js"; 
// MENU
import { renderMenu, buttonToRemoveMenuItem, openModalFromMenuItem } from "./modules/menu.js"; 
// ARTICLES
import { renderArticles, buttonToSaveOrDeleteArticle, changeArticleButtonStateToSaved, changeArticleButtonStateToDelete, buttonOpenModalFromArticle, orderBooksByTitle, addArticlesInMain, filter } from "./modules/articles.js"; 
// MODAL
import { openModal, renderArticleInModal, disableScrollingWhenOpeningModal, buttonToCloseTheModal, buttonToSavedArticleTheModal, buttonToSaveOrDeleteTheReadingStatusOfTheArticle, closeModalOnClick } from "./modules/modal.js"; 
// LOCAL STORAGE
import { loadArticlesFromLocalStorage, loadThemeFromLocalStorage, saveArticleInLocalStorage, deleteArticleInLocalStorage,  saveArticleReadInLocalStorage, deleteArticleReadInLocalStorage} from "./modules/localStorage.js"; 


document.addEventListener("DOMContentLoaded",  async function(){
    let articles = await articlesFetch();
    Promise.all([await renderArticles(articles), loadArticlesFromLocalStorage(), loadThemeFromLocalStorage(themeDark, themeLight), renderMenu(articles), effectNavbarScroll()]);
    // CLICK EVENTS
    document.addEventListener("click", e=> {
        let click = e.target;
        // navbar
        buttonChangeThemePage(click);
        buttonToShowOrHideTheMenu(click);
        // menu
        buttonToRemoveMenuItem( {click, deleteArticleInLocalStorage, changeArticleButtonStateToSaved, articles} );
        openModalFromMenuItem({click, renderArticleInModal, articles, openModal});
        // article
        buttonToSaveOrDeleteArticle( {click, renderMenu, saveArticleInLocalStorage, deleteArticleInLocalStorage, articles} );
        buttonOpenModalFromArticle({click, renderArticleInModal, openModal, articles});
        filter( click, loadArticlesFromLocalStorage, articles );
        // Modal
        buttonToCloseTheModal(click);
        buttonToSavedArticleTheModal({ click, renderMenu, articles, saveArticleInLocalStorage, deleteArticleInLocalStorage, changeArticleButtonStateToDelete, changeArticleButtonStateToSaved });
        buttonToSaveOrDeleteTheReadingStatusOfTheArticle({ click, saveArticleReadInLocalStorage, deleteArticleReadInLocalStorage });
        closeModalOnClick(e);
    });
    // SCROLL EVENT
    document.addEventListener("scroll", e=>{
        disableScrollingWhenOpeningModal();
        effectNavbarScroll();
    });
});

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