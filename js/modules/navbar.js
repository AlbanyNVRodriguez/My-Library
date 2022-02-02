function navbarScroll(){
    let navbar = document.querySelector(".navbar");
    if(window.innerWidth > 360 ){
        window.scrollY > 10? navbar.classList.add("scroll") : navbar.classList.remove("scroll");
    }
    
}
// SAVE THEME CHANGE
function buttonChangeTheme(params){
    let { click, themeDark, themeLight } = params;
    if(click.matches(".navbar .nav_btn-theme")){
        document.querySelector("body").className.includes("light")? themeDark() : themeLight();
    } 
}
// BUTTON MENU
function buttonMenu(click){
    if(click.matches(".navbar .nav_btn-menu")){
        click.classList.toggle("active");
        document.querySelector(".menu").classList.toggle("active");
    }
    if(!click.matches(".navbar .nav_btn-menu") && !click.matches(".menu") && !click.matches(".main .main_art_buttons-save") && !click.matches(".menu .menu_item-btn")){
        document.querySelector(".navbar .nav_btn-menu").classList.remove("active");
        document.querySelector(".menu").classList.remove("active");
    }
}
export {
    navbarScroll,
    buttonChangeTheme,
    buttonMenu
}