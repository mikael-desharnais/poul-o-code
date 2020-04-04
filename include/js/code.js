function lettre(code){
    return String.fromCharCode(code);
}
function tailleAffichage(largeur,hauteur){
    LARGEUR = largeur
    HAUTEUR = hauteur
    effacerAffichage()
}
function aleatoire(debut,fin,except=null){
    var toReturn = 0
    do {
        toReturn = Math.floor((Math.random() * (fin-debut+1)) + debut)
    }while(except==null||except==toReturn)
    return toReturn
}
function effacerAffichage(){
    display = []
    colorDisplay = []
    for(var i = 0;i<HAUTEUR;i++){
        display.push([]);
        colorDisplay.push([]);
        for(var j = 0;j<LARGEUR;j++){
            display[i].push(DESSIN.vide);
            colorDisplay[i].push(COULEUR.noir);
        }
    }
    afficher()
}
function changerAffichage(x,y,chr,color=false,updateDisplay=true){
    x = x-1
    y = y-1
    if (color!==false){
        colorDisplay[y][x]=color;
    }
    display[y][x]=chr;
    if (updateDisplay){
        afficher();
    }
}
function afficher(){
    var blackBlock = DESSIN.plein.replace('%color%',COULEUR.noir)
    var content = ('<span class="pixel">'+blackBlock+"</span>").repeat(display[0].length+2)+'<br class="clearer"/>'
    for(var y = 0;y<display.length;y++){
        content+='<span class="pixel">'+blackBlock+"</span>"
        for(var x = 0;x<display[y].length;x++){
            var pixelContent = ""
            if (display[y][x].indexOf("%color%")===-1){
                display[y][x] = '<span class="pixel" style="color : %color%">'+display[y][x]+'</span>'
            }
            pixelContent+=display[y][x].replace('%color%',colorDisplay[y][x])
            pixelContent = '<span class="pixel">'+pixelContent+"</span>"
            content+=pixelContent
        }
        content+='<span class="pixel">'+blackBlock+'</span><br class="clearer"/>'
     }
    content+= ('<span class="pixel">'+blackBlock+"</span>").repeat(display[0].length+2)

    jQuery('.block-display').html(content)
}
function parler(txt,couleur=COULEUR.noire){
    var node = jQuery("<div style=\"color : "+couleur+"\"></div>");
    node.html("> INFO : "+txt);
    jQuery(".block-log").prepend(node);
    logHistory.unshift({ "node" : node, "txt" : txt})
    if (logHistory.length>LOG_LENGTH){
        for(var i = LOG_LENGTH; i < logHistory.length;i++){
            logHistory[i].node.remove();
        }
        logHistory.length = LOG_LENGTH
    }
}

function si(condition){
    if (condition){
        return { alors : function(code){ code(); return this;  }, sinon : function(code) { return this; } }
    }else {
        return { alors : function(code){ return this }, sinon : function(code) { code(); return this; } }
    }
}
function de(start){
    return { a : function(stop) { return { faire : function(code) { for(var i=start;i<=stop;i++) { code(i) } } } } }
}

function creerValeur(name,value){
    store[name]=value
}

function modifierValeur(name,value){
    store[name]=value
}

function lireValeur(name){
    return store[name]
}

function demander(question){
    return window.prompt(question)
}

function rectangle(x,y,height,width,outer=DESSIN.plein,inner=DESSIN.vide,colorOuter=false,colorInner=false){
    for(var i=0;i<width;i++){
        for(var j=0;j<height;j++){
            if (i==0||j==0||i==width-1||j==height-1){
                changerAffichage(x+i,y+j,outer,colorOuter,false)
            }else {
                changerAffichage(x+i,y+j,inner,colorInner,false)
            }
        }
    }
    afficher()
}


var DESSIN = {
    plein : '<span class="pixel" style="background : %color%"></span>',
    vide : " ",
    coeur : "&hearts;",
    bateau : "⛴"
}
var COULEUR = {
    noir : "black",
    rouge : "red",
    bleu : "blue"
}

var REV_TOUCHE = {
    0 : "aucune",
    38 : "haut",
    40 : "bas",
    37 : "gauche",
    39 : "droite"
}

var TOUCHE = {}

var LARGEUR = 0
var HAUTEUR = 0

var faux = false
var vrai = true
