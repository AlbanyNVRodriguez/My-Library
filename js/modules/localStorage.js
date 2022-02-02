let arrayArticles = localStorage.getItem("ArticlesLocalStorage") !== null && localStorage.getItem("ArticlesLocalStorage") !== ""? localStorage.getItem("ArticlesLocalStorage").split(",") : [];
let arrayArticlesStatus = localStorage.getItem("ArticlesStatusLocalStorage") !== null && localStorage.getItem("ArticlesStatusLocalStorage") !== ""? localStorage.getItem("ArticlesStatusLocalStorage").split(",") : [];

async function loadLocalStorage(){
    if(arrayArticles.length > 0 || arrayArticlesStatus.length > 0) renderArticlesFromLocalStorage();
    loadThemeFromLocalStorage();
}
// LOAD THEME FROM LOCAL STORAGE
function loadThemeFromLocalStorage(){
    if(localStorage.getItem("themeLocalStorage") == null){
        themeDark();
    }else{
        if(localStorage.getItem("themeLocalStorage") == "dark"){
            themeDark();
        }else{
            themeLight();
        }
    }
}
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
// DELETE ARTICLE FROM LOCAL STORAGE
function deleteArticleFromLocalStorage(id){
    if(localStorage.getItem("ArticlesLocalStorage") !== null){
        arrayArticles = arrayArticles.filter(art => art != id );
        localStorage.setItem("ArticlesLocalStorage", arrayArticles);
    }
}
// RENDER ARTICLES FROM LOCAL STORAGE
function renderArticlesFromLocalStorage(){
    let articles = document.querySelectorAll(".main .main-article");
    articles.forEach( art => {
        if(arrayArticles.includes(art.dataset.id)){
            art.querySelector(".main_article-buttons .main_art_buttons-save").textContent="Eliminar";
            art.querySelector(".main_article-buttons .main_art_buttons-save").classList.add("remove");
        }
        if(arrayArticlesStatus.includes(art.dataset.id)) art.classList.add("read")
    });
}
// THEME DARK
function themeDark(){
    document.querySelector("body").classList.remove("light");
    localStorage.setItem("themeLocalStorage", "dark");
}
// THEME LIGHT
function themeLight(){
    document.querySelector("body").classList.add("light");
    localStorage.setItem("themeLocalStorage", "light");
}
// SAVE STATUS ARTICLE IN LOCAL STORAGE
function saveStatusArticleFromModalInLocalStorage(id){
    if(localStorage.getItem("ArticlesStatusLocalStorage") == null){
        arrayArticlesStatus.push(id);
        localStorage.setItem("ArticlesStatusLocalStorage", arrayArticlesStatus);
    }else{
        arrayArticlesStatus.push(id);
        localStorage.setItem("ArticlesStatusLocalStorage", arrayArticlesStatus);
    }
}
function deleteStatusArticleFromModalInLocalStorage(id){
    if(localStorage.getItem("ArticlesStatusLocalStorage") !== null){
        arrayArticlesStatus = arrayArticlesStatus.filter(art => art != id );
        localStorage.setItem("ArticlesStatusLocalStorage", arrayArticlesStatus);
    }
}

export { 
    loadLocalStorage,
    saveArticleInLocalStorage,
    deleteArticleFromLocalStorage,
    themeDark,
    themeLight,
    saveStatusArticleFromModalInLocalStorage,
    deleteStatusArticleFromModalInLocalStorage
};