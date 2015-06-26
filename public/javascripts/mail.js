
var audio1 = document.getElementById("audio1"); 
var audio2 = document.getElementById("audio2");
var audio3 = document.getElementById("audio3");

$("#bouton1").click(function(){
    $("#bouton1 >.bouton").addClass("white");
    $("#bouton1 >.bouton").css('cursor', 'auto');
    audio1.play();
});

$("#bouton2").click(function(){
    $("#bouton2 >.bouton").addClass("white");
    $("#bouton2 >.bouton").css('cursor', 'auto');
    audio2.play();
});

$("#bouton3").click(function(){
    $("#bouton3 >.bouton").addClass("white");
    $("#bouton3 >.bouton").css('cursor', 'auto');
    audio3.play();
});

