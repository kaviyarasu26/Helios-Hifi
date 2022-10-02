

//start
//story
var homepage=document.getElementById("king");
var time_line=document.getElementById("time-line");
var story_mode=document.getElementById("story-mode");
var about=document.getElementById("about");
var menu=document.getElementsByClassName("menu");
var d3=document.getElementById("threed");
var pop=document.getElementById("popup");

var utc=document.getElementById("utc");
var utc1=document.getElementById("utc1");
var utc2=document.getElementById("utc2");

function boom(){
    pop.style.display="none";
}



function boomopposite(){
    utc1.style.display="inline";
    utc1.style.display="none";
    utc2.style.display="none";
    pop.style.display="flex";
}

function Goingon() {
    utc1.style.display="none";
    utc1.style.display="inline";
    utc2.style.display="none";
    pop.style.display="flex";
    
}

function  planed(){
    utc1.style.display="none";
    utc1.style.display="none";
    utc2.style.display="inline";
    pop.style.display="flex";
    
}





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
    d3.style.display="none";
    document.getElementById("audioofstory").play();
    document.getElementById("helo").style.display="flex";
    var timeleft = 3;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("downtime").innerHTML = "Launch";
      } else {
        document.getElementById("downtime").innerHTML = timeleft ;
      }
      timeleft -= 1;
    }, 1000);
    setInterval(()=>{
        document.getElementById("helo").style.display="none";

    },5000);

}


function aboutus(){
    homepage.style.display="none";
    time_line.style.display="none";
    story_mode.style.display="none";
    about.style.display="block";
    d3.style.display="none";
    document.getElementById("audioofstory").pause();

}

function timelinego(){
    homepage.style.display="none";
    time_line.style.display="block";
    story_mode.style.display="none";
    about.style.display="none";
    d3.style.display="none";
    document.getElementById("audioofstory").pause();

}
        

function homePage(){
    homepage.style.display="block";
    time_line.style.display="none";
    story_mode.style.display="none";
    about.style.display="none";
    d3.style.display="none";
    document.getElementById("audioofstory").pause();

}

function threed() {
    homepage.style.display="none";
    time_line.style.display="none";
    story_mode.style.display="none";
    about.style.display="none";
    d3.style.display="block";
    document.getElementById("audioofstory").pause();
}














var details=document.querySelector("#solo");
function kavi() {
    details.innerText="Kaviyarasu";
}
function aamina() {
    details.innerText="Aamina";
}
function deepti() {
    details.innerText="Deepti";
}
function exo() {
    details.innerText="Exousia";
}

function ilaya() {
    details.innerText="Ilayabharathi";
}
function selvi() {
    details.innerText="Saratha";
}


     /* var typed=new Typed(".story",{
        strings:[`"Well, I would suggest that Parker go to the library and read up on the subject before he tries to write a paper about it because this is utter nonsense," was the very first review Eugene received for his paper.
 Even Eugene Parker, solar and plasma physicist, Pioneering Astrophysicist, and founder of the solar wind, was ridiculed for his idea which later revolutionized plasma physics. But don't they say all brilliant ideas sound insane or absurd at first? One such idea was to "touch the sun"
 60 years into this incident, massive efforts were taken to bring this thought to light. Years of sleepless nights and hard work were put into the design of the probe. A spacecraft as big as the size of a car was assembled.
 The decision of the decade (box) NASA scientists were put in a tough spot when their brainstormed ideas lead to a huge conundrum. VENUS VS SATURN! They had to use the gravitational pull of a planet, yet didn't know which. After a series of debates and quarrels, they made the decision of the decade, fixed the Orbit of Venus and the rest is history.
 The most awaited day in space history arrived, on August 12th, the day their successive hard work turned to triumph, the day we got one step closer to the future, and the day The Parker Solar Probe was launched. Although the launch was delayed by a day, it didn't reduce the hopes they had.
 The launch was a huge success, the probe Slowly but steadily got fixed in orbit and then in 2018, it made its first encounter with the sun, making it the most spectacular event. The next perihelion took place twice in the year 2019, greatly in 2020 and quarts in 2021. But history was written in the 8th perihelion when for the first time in human history a man-made object touched the hottest star in our solar system.
 The Parker solar probe made its way through the corona, the atmosphere hotter than the surface of the sun itself, and collected some curial data which would explain the questionable phenomenons of scientists. As the perihelion increased, the speed of the probe increased at the rate of 125 miles per second, reaching as far as 3.83 million miles in the awaiting 25th revolution
  Drop of Future It is predicted that the solar probe mission will finally halt in the year 2025 after having a total count of 25 perihelions. By then, our hopes are that we will have achieved the impossible.

`],
        typeSpeed:150,
        backSpeed:150,
        loop:true
    }) */

   

    