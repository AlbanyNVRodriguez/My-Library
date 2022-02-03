// EFFECT NAVBAR SCROLL
function effectNavbarScroll(){
    let navbar = document.querySelector(".navbar");
    if(window.innerWidth > 360 ) window.scrollY > 10? navbar.classList.add("scroll") : navbar.classList.remove("scroll");
}
// ------------------------------------------------
// BUTTON TO CHANGE THE THEME OF THE PAGE
function buttonChangeThemePage(click){
    if(click.matches(".navbar .nav_btn-theme")) document.querySelector("body").className.includes("light")? themeDark() : themeLight();
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
// ------------------------------------------------
// BUTTON TO SHOW OR HIDE THE MENU
function buttonToShowOrHideTheMenu(click){
    if(click.matches(".navbar .nav_btn-menu")) click.className.includes("active")? hideTheMenu() : showTheMenu();
    if(!click.matches(".navbar .nav_btn-menu") && 
    !click.matches(".menu") && 
    !click.matches(".main .main_art_buttons-save") && 
    !click.matches(".menu .menu_item-btn")){
        hideTheMenu();
    }
}
// SHOW THE MENU
function showTheMenu(){
    document.querySelector(".navbar .nav_btn-menu").classList.add("active");
    document.querySelector(".menu").classList.add("active");
}
// HIDE THE MENU
function hideTheMenu(){
    document.querySelector(".navbar .nav_btn-menu").classList.remove("active");
    document.querySelector(".menu").classList.remove("active");
}
// ------------------------------------------------
export {
    effectNavbarScroll,
    buttonChangeThemePage,
    themeDark,
    themeLight,
    buttonToShowOrHideTheMenu,
}