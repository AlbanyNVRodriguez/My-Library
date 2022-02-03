let arrayArticles = localStorage.getItem("ArticlesLocalStorage") !== null && localStorage.getItem("ArticlesLocalStorage") !== ""? localStorage.getItem("ArticlesLocalStorage").split(",") : [];
let arrayArticlesReadingStatus = localStorage.getItem("ArticleReadingStatusLocalStorage") !== null && localStorage.getItem("ArticleReadingStatusLocalStorage") !== ""? localStorage.getItem("ArticleReadingStatusLocalStorage").split(",") : [];

// LOAD ARTICLES FROM LOCAL STORAGE
function loadArticlesFromLocalStorage(){
    if(arrayArticles.length > 0 || arrayArticlesReadingStatus.length > 0){
        let articles = document.querySelectorAll(".main .main-article");
        articles.forEach( art => {
            if(arrayArticles.includes(art.dataset.id)){
                art.querySelector(".main_article-buttons .main_art_buttons-save").textContent="Eliminar";
                art.querySelector(".main_article-buttons .main_art_buttons-save").classList.add("remove");
            }
            if(arrayArticlesReadingStatus.includes(art.dataset.id)) art.classList.add("read");
        });
    }
}
// ------------------------------------------------
// LOAD THEME FROM LOCAL STORAGE
function loadThemeFromLocalStorage(themeDark, themeLight){
    if(localStorage.getItem("themeLocalStorage") == null){
        themeDark();
    }else{
        localStorage.getItem("themeLocalStorage") == "dark"? themeDark() : themeLight();
    }
}
// ------------------------------------------------
// SAVE ARTICLE IN LOCAL STORAGE
function saveArticleInLocalStorage(id){
    if(localStorage.getItem("ArticlesLocalStorage") == null){
        arrayArticles.push(id);
        localStorage.setItem("ArticlesLocalStorage", arrayArticles);
    }else{
        arrayArticles.push(id);
        localStorage.setItem("ArticlesLocalStorage", arrayArticles);
    }
}
// DELETE ARTICLE IN LOCAL STORAGE
function deleteArticleInLocalStorage(id){
    if(localStorage.getItem("ArticlesLocalStorage") !== null){
        arrayArticles = arrayArticles.filter(art => art != id );
        localStorage.setItem("ArticlesLocalStorage", arrayArticles);
    }
}
// ------------------------------------------------
// SAVE ARTICLE READ IN LOCAL STORAGE
function saveArticleReadInLocalStorage(id){
    if(localStorage.getItem("ArticleReadingStatusLocalStorage") == null){
        arrayArticlesReadingStatus.push(id);
        localStorage.setItem("ArticleReadingStatusLocalStorage", arrayArticlesReadingStatus);
    }else{
        arrayArticlesReadingStatus.push(id);
        localStorage.setItem("ArticleReadingStatusLocalStorage", arrayArticlesReadingStatus);
    }
}
// DELETE ARTICLE READ IN LOCAL STORAGE
function deleteArticleReadInLocalStorage(id){
    if(localStorage.getItem("ArticleReadingStatusLocalStorage") !== null){
        arrayArticlesReadingStatus = arrayArticlesReadingStatus.filter(art => art != id );
        localStorage.setItem("ArticleReadingStatusLocalStorage", arrayArticlesReadingStatus);
    }
}
// ------------------------------------------------
export { 
    loadArticlesFromLocalStorage,
    loadThemeFromLocalStorage,
    saveArticleInLocalStorage,
    deleteArticleInLocalStorage,
    saveArticleReadInLocalStorage,
    deleteArticleReadInLocalStorage,
};