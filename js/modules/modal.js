// RENDER ARTICLE IN MODAL
async function renderArticleInModal(id, articlesFetch){
    let modal = document.querySelector(".modal");
    modal.dataset.id = id;
    let articles = await articlesFetch(), 
    article = articles.filter(art => art.id == id);

    modal.querySelector(".modal-header picture img").src = `img/${article[0].img}.svg`;
    modal.querySelector(".modal-header h2").textContent = article[0].title.split("-")[0];
    modal.querySelector(".modal-header h3").textContent = article[0].title.split("-")[1];
    
    getArticleHTML({
        url: `articles/${article[0].modal}`,
        success: res => modal.querySelector(".modal-section").innerHTML = res,
        error: err => modal.querySelector(".modal-section").innerHTML = err
    });
    loadArticlesStatusInLocalStorage(id, modal);
    modal.classList.add("active");
}
function loadArticlesStatusInLocalStorage(id, modal){
    if(localStorage.getItem("ArticleReadingStatusLocalStorage") !== null && localStorage.getItem("ArticleReadingStatusLocalStorage").includes(id)){
        modal.querySelector(".modal-btnStatus").classList.add("active");
        modal.querySelector(".modal-btnStatus").textContent = "Leido";
    }else{
        modal.querySelector(".modal-btnStatus").classList.remove("active");
        modal.querySelector(".modal-btnStatus").textContent = "No Leido";
    }
}
// CLOSE MODAL ON CLICK
function closeModalOnClick(e){
    if(document.querySelector(".modal").className.includes("active")){
        let modal = document.querySelector(".modal");
        let modalBorder = {
            top:  modal.getClientRects()[0].top,
            bottom: modal.getClientRects()[0].bottom,
            left: modal.getClientRects()[0].left,
            right: modal.getClientRects()[0].right
        }

        if(e.clientY > modalBorder.bottom ||
            e.clientY < modalBorder.top ||
            e.clientX > modalBorder.right ||
            e.clientX < modalBorder.left)  modal.classList.remove("active");
    }
}
// BUTTON TO CLOSE THE MODAL
function buttonToCloseTheModal(click){
    if(click.matches(".modal .modal-btnClose"))  document.querySelector(".modal").classList.remove("active");
}
// BUTTON TO SAVE OR DELETE STATUS ARTICLE FROM MODAL
function buttonToSaveOrDeleteTheReadingStatusOfTheArticle(params){
    if(params.click.matches(".modal .modal-btnStatus")){
        let { click, saveArticleReadInLocalStorage, deleteArticleReadInLocalStorage } = params;
        let id = click.parentElement.dataset.id;
        if(click.textContent == "No Leido"){
            saveArticleReadInLocalStorage(id);
            click.classList.add("active");
            click.textContent = "Leido";
            document.querySelector(`.main .main-article[data-id="${id}"]`).classList.add("read");
        }else{
            deleteArticleReadInLocalStorage(id);
            click.classList.remove("active");
            click.textContent = "No Leido";
            document.querySelector(`.main .main-article[data-id="${id}"]`).classList.remove("read");
        }
        
    }
}
// GET ARTICLE HTML WITH XMLHTTPREQUEST
function getArticleHTML(params){
    let { url, success, error } = params;
    const XHR = new XMLHttpRequest();
    XHR.addEventListener("readystatechange", function(){
        if(XHR.readyState !== 4) return ;
        XHR.status >= 200 && XHR.status <=299?
            success(XHR.responseText):
            error(`Ocurrio un Error: ${XHR.status} - ${XHR.responseText}`);
    });

    XHR.open("GET", url);
    XHR.setRequestHeader("Content-type", "application/json; charset=utf8");
    XHR.send();
}
// DISABLE SCROLL FOR MODAL
function disableScrollingWhenOpeningModal(){
    if(document.querySelector(".modal").className.includes("active")) window.scrollTo(0,0);
}
export {
    buttonToCloseTheModal,
    buttonToSaveOrDeleteTheReadingStatusOfTheArticle,
    closeModalOnClick,
    renderArticleInModal,
    disableScrollingWhenOpeningModal
}