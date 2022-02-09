async function renderFilteredArticles(params){
    let { filter, articles, orderBooksByTitle, addArticlesInMain, loadArticlesFromLocalStorage } = params;
    let articlesFilter = [];
    articles.forEach(art => {
        if(art.title.includes(filter)) articlesFilter.push(art);
    });
    orderBooksByTitle(articlesFilter);
    document.querySelector(".main-articles").innerHTML="";
    addArticlesInMain(articlesFilter);
    loadArticlesFromLocalStorage();
}
function filter(params){
    if(params.click.matches(".main-filters .filters-filter")){
        let { click, articles, orderBooksByTitle, addArticlesInMain, loadArticlesFromLocalStorage } = params;
        removeFilters(click);
        renderFilteredArticles({filter:click.dataset.value, articles, orderBooksByTitle, addArticlesInMain, loadArticlesFromLocalStorage});
    }
}

function removeFilters(click){
    if(click.className.includes("active")){
        click.classList.remove("active");
    }else{
        let filters = document.querySelectorAll(".main-filters .filters-filter");
        filters.forEach(filter => {
            filter.classList.remove("active");
        });
        addFilter(click);
    }
}
function addFilter(click){
    click.classList.add("active");
}

export {
    filter
}