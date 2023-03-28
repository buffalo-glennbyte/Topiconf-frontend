const track = document.querySelector('.our-team-track');


window.onscroll = function() {loadFunction()};

function loadFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";

    if(scrolled>18) document.querySelector('.header').style.background = "#3c3c3c";
    else document.querySelector('.header').style.background = "transparent";
}

window.onmousedown = e=>{
    track.dataset.mousetrack=e.clientX;
    console.log(track.dataset.mousetrack)
};
window.onmouseup=e=>{
    track.dataset.mousetrack='0';
    track.dataset.percentagetrack=track.dataset.percentage;
}
window.onmousemove=e=>{
    if(track.dataset.mousetrack==='0') return;
    const mouseDelta  = parseFloat(track.dataset.mousetrack)-e.clientX;
    const maxDelta =window.innerWidth/2;
    const percentage = (mouseDelta/maxDelta) * 52;
    // const nextPercentage = parseFloat(track.dataset.percentagetrack)+percentage;

    const nextPercentageHolder = parseFloat(track.dataset.percentagetrack) + percentage;
    const nextPercentage =Math.max(Math.min(nextPercentageHolder, 0), -100);
    track.dataset.percentage= nextPercentage;
    // track.style.transform=`translate(${nextPercentage}%, 0%)`
    track.animate({transform:`translate(${nextPercentage}%, 0%)`},
    {duration: 1200, fill: "forwards"});
}