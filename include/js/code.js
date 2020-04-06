function lettre(code){
    return String.fromCharCode(code);
}
function tailleAffichage(largeur,hauteur){
    LARGEUR = largeur
    HAUTEUR = hauteur
    display = []
    colorDisplay = []
    var blackBlock = DESSIN.plein.replace('%color%',COULEUR.noir)
    var blockDisplay = jQuery('.block-display')
    blockDisplay.append(('<span class="pixel">'+blackBlock+"</span>").repeat(LARGEUR+2)+'<br class="clearer"/>');
    for(var i = 0;i<HAUTEUR;i++){
        display.push([]);
        colorDisplay.push([]);
        blockDisplay.append('<span class="pixel">'+blackBlock+"</span>")
        for(var j = 0;j<LARGEUR;j++){
            var element = jQuery('<span class="pixel">'+DESSIN.vide+'</span>')
            display[i].push(element)
            colorDisplay[i].push(COULEUR.noir)
            jQuery('.block-display').append(element)
        }
        blockDisplay.append('<span class="pixel">'+blackBlock+'</span><br class="clearer"/>')
    }
    blockDisplay.append(('<span class="pixel">'+blackBlock+"</span>").repeat(LARGEUR+2)+'<br class="clearer"/>');
    effacerAffichage()
}
function aleatoire(start,end,except=null){
    var toReturn = 0
    do {
        toReturn = Math.floor((Math.random() * (end-start+0.999)) + start)
    }while(except!=null&&except==toReturn)
    return toReturn
}
////
function effacerAffichage(){
    for(var i = 0;i<HAUTEUR;i++){
        for(var j = 0;j<LARGEUR;j++){
            changerAffichage(j+1,i+1,DESSIN.vide,COULEUR.noir)
        }
    }
}
////
function changerAffichage(x,y,chr,color=false){
    chr = chr+""
    if (x<1||y<1||x>LARGEUR||y>HAUTEUR){
        throw new Error(ERREUR.HORS_DU_CADRE+" ("+x+";"+y+")")
    }
    x = x-1
    y = y-1
    if (color!==false){
        colorDisplay[y][x]=color;
    }

    if (chr.indexOf("%color%")===-1){
        chr = '<span class="pixel" style="color : %color%">'+chr+'</span>'
    }
    display[y][x].html(chr.replace('%color%',colorDisplay[y][x]))
}
function changerRepetition(time){
    stepperTimer = time
    if (stepper!=null){
        clearInterval(stepper)
        stepper = setInterval(timerFunction,stepperTimer);
    }
}
////
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
////
function si(condition){
    if (condition){
        return { alors : function(code){ code(); return this;  }, sinon : function(code) { return this; }, et : function(cond){ return si(cond) }, ou : function(cond){ return si(true) }  }
    }else {
        return { alors : function(code){ return this }, sinon : function(code) { code(); return this; },  et : function(cond){ return si(false) }, ou : function(cond){ return si(cond) }   }
    }
}
////
function de(start){
    var pas = 1;
    return { a : function(stop) { return { tousLes : function(p){ pas = p; return this }, faire : function(code) { for(var i=start;i<=stop;i+=pas) { code(i) } } } } }
}
////
function creerValeur(name,value){
    store[name]=value
}
////
function modifierValeur(name,value){
    store[name]=value
}
////
function lireValeur(name){
    return store[name]
}
////
function demander(question){
    return window.prompt(question)
}
////
function demanderNombre(question){
    return parseFloat(window.prompt(question))
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
    bateau : "⛴",
    flecheNord : "⇑",
    flecheNordEst : "⇗",
    flecheEst : "⇒",
    flecheSudEst : "⇘",
    flecheSud : "⇓",
    flecheSudOuest : "⇙",
    flecheOuest : "⇐",
    flecheNordOuest : "⇖",
    point : "●",
    triangle : "▴",
    soleil : "☀",
    nuage : "☁",
    etoile : "★",
    nucleaire : "☢",
    smiley : "☺",
    smileyTriste : "☹",
    echecReine : "♛",
    echecRoi : "♚",
    echecCavalier : "♞",
    echecTour : "♜",
    echecFou : "♝",
    echecPion : "♟",
    note : "♪",
    epee : "⚔",
    ancre : "⚓",
    ballon : "⚽",
    camion : "⛟",
    montagne : "⛰"

}
var COULEUR = {
    noir : "black",
    rouge : "red",
    vert : "green",
    blanc : "white",
    argent : "lightGray",
    gris : "darkGray",
    marron : "maroon",
    jaune : "yellow",
    vertFluo : "lime",
    vert : "green",
    bleuFluo : "cyan",
    bleu : "blue",
    violet : "purple",
    fuchsia : "fuchsia",
}

var REV_TOUCHE = {
    0 : "aucune",
    38 : "haut",
    40 : "bas",
    37 : "gauche",
    39 : "droite",
    13 : "entree",
    32 : "espace",
    27 : "echap"
}

var ERREUR = {
    HORS_DU_CADRE : "Les coordonnées sont hors de l'écran"
}

var TOUCHE = {}

var LARGEUR = 0
var HAUTEUR = 0

var faux = false
var vrai = true
