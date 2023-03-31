const backendURL = "http://localhost:8082";

let huidigEvenement;
window.onload = function () {
    var evenement = window.location.href.split("=").pop();
    fetch(`${backendURL}/evenement/geefEvenementPerNaam?e=${evenement}`)
    .then((response) => response.json())
    .then((data) => {
        huidigEvenement = data[0];
    });
};

function login() {
    window.location.href = `login.html?e=${encodeURI(huidigEvenement.naam)}`;
}

const clearValue = function () {
    document.getElementById("nameInput").value = "";
    document.getElementById("surnameInput").value = "";
    document.getElementById("topicInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("samenInput").value = "";
};

function maakVoorstelEnUser(){
    addVoorstel();
    // createNewUser(); // Creeert een stacktrace in de backend en word niet meer gebruikt
}
      
async function addVoorstel() {
    const name = document.getElementById("nameInput").value;
    const surname = document.getElementById("surnameInput").value;
    const topic = document.getElementById("topicInput").value;
    const mail = document.getElementById("emailInput").value;
    const samenvat = document.getElementById("samenInput").value;

    const isValid = name && surname && topic && mail && samenvat;

    if (isValid) {
      const request = {
        voornaam: name,
        achternaam: surname,
        onderwerp: topic,
        eMail: mail,
        samenvatting: samenvat,
        veranderd: false,
    };
     
    fetch(`${backendURL}/evenement/voegVoorstelAanEvenementToe/${huidigEvenement.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    })
    .then(() => alert("Voorstel is succesvol verstuurd"));
    clearValue();
    // location.href=`index.html?e=${encodeURI(huidigEvenement.naam)}`;
    }
}

function createNewUser(){
    let newUser = {};
    let emailObject = {};
    newUser.username = document.getElementById("emailInput").value;

    fetch(`${backendURL}/user/createNewUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    })
    .then((response)=> response.text())
    .then((data) => {
      emailObject.recipient = newUser.username;
      emailObject.subject = "Welkom bij Call for Presentations";
      emailObject.msgBody = `Bedankt voor je aanmelding! Voor nu heb je een automatisch gegenereerd wachtwoord gekregen. Log <a href>hier</a> in met je inloggegevens en kies een nieuw wachtwoord.\n 
        Gebruikersnaam: ${newUser.username}\n
        Wachtwoord: ` + data;
      fetch(`${backendURL}/email/emailVersturen`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(emailObject)
      })
    })     
}

const track = document.querySelector('.our-team-track');

window.onscroll = function() {loadFunction()};

function loadFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";

    if(scrolled>1) document.querySelector('.header').style.background = "#3c3c3c";
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
