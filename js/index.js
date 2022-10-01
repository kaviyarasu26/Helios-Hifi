

//start
//story
var homepage=document.getElementById("king");
var time_line=document.getElementById("time-line");
var story_mode=document.getElementById("story-mode");
var about=document.getElementById("about");
var menu=document.getElementsByClassName("menu");



var aside = document.getElementById("aside");
function summada() {
    if (aside.style.display == "block") {
        aside.style.display = "none";
    }
    else {
        aside.style.display = "block";
    }

}


var prescreen =document.querySelector(".loader");
window.addEventListener("load",vanish);
function vanish(){
    prescreen.classList.add("disppers");
}

function story(){
    homepage.style.display="none";
    time_line.style.display="none";
    story_mode.style.display="block";
    about.style.display="none";

}


function aboutus(){
    homepage.style.display="none";
    time_line.style.display="none";
    story_mode.style.display="none";
    about.style.display="block";

}

function timelinego(){
    homepage.style.display="none";
    time_line.style.display="block";
    story_mode.style.display="none";
    about.style.display="none";

}
        