function lettre(code){
    return String.fromCharCode(code);
}
function tailleAffichage(largeur,hauteur){
    LARGEUR = largeur
    HAUTEUR = hauteur
    effacerAffichage()
}
function effacerAffichage(){
    display = []
    colorDisplay = []
    for(var i = 0;i<HAUTEUR;i++){
        display.push("");
        colorDisplay.push([]);
        for(var j = 0;j<LARGEUR;j++){
            display[i]+=DESSIN.vide;
            colorDisplay[i].push(COULEUR.noir);
        }
    }
    afficher()
}
function changeAffichage(x,y,chr,color=false,updateDisplay=true){
    x = x-1
    y = y-1
    if (color!==false){
        colorDisplay[y][x]=color;
    }
    display[y]=display[y].substring(0,x)+chr+display[y].substring(x+1);
    if (updateDisplay){
        afficher();
    }
}
function afficher(){
    var content = DESSIN.plein.repeat(display[0].length+2)+"\n"
    for(var y = 0;y<display.length;y++){
        content+=DESSIN.plein
        for(var x = 0;x<display[y].length;x++){
            if (colorDisplay[y][x]!="black"){
                content+="<span style=\"color : "+colorDisplay[y][x]+"\">"+display[y][x]+"</span>"
            }else {
                content+=display[y][x]
            }
        }
        content+=DESSIN.plein
        content+="\n"
     }
    content+= DESSIN.plein.repeat(display[0].length+2)

    jQuery('.block-display').html(content)
}
function parler(txt){
    var node = jQuery("<div></div>");
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
                changeAffichage(x+i,y+j,outer,colorOuter,false)
            }else {
                changeAffichage(x+i,y+j,inner,colorInner,false)
            }
        }
    }
    afficher()
}


var DESSIN = {
    plein : "A",
    vide : lettre(160)
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
