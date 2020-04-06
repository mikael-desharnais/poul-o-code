var display = []
var colorDisplay = []
var logHistory = []
var LOG_LENGTH = 100
var latestTouche = null
var DEFAULT_WIDTH=50
var DEFAULT_HEIGHT=30

var store = {}
var stepper = null

var started = false
var stepperTimer = 200

function clearLog(){
    logHistory.length = 0
    jQuery('.block-log').empty()
}

var timerFunction = ()=>{}

function run(){
    started = true
    effacerAffichage()
    clearLog()
    jQuery("#stop").show()
    jQuery("#run").hide()
    store = {}
    creerValeur("TOUCHE",TOUCHE.aucune)
    var initCode = jQuery("#init").val()
    var stepCode = jQuery("#step").val()
    try {
        eval(initCode)
    }catch (exc){
        parler(exc)
    }
    timerFunction = ()=>{
        console.log(started)
        try {
            eval(stepCode)
        }catch (exc){
            if (exc!=null){
                parler(exc)
            }
        }
        if (latestTouche!=null){
            TOUCHE[latestTouche]=false
        }

    }
    stepper = setInterval(timerFunction,stepperTimer);
}
function stop(){
    started = false
    jQuery("#stop").hide()
    jQuery("#run").show()
    clearInterval(stepper)
    stepper = null
    throw null;

}
$(document).delegate('body', 'keydown', function(e) {
    if (typeof REV_TOUCHE[e.which] != "undefined"){
        if (latestTouche!=null){
            TOUCHE[latestTouche]=false
        }
        TOUCHE[REV_TOUCHE[e.which]]=true
        latestTouche = REV_TOUCHE[e.which]
    }
});

var editorReference = {}
var savedContent = null
async function initDB(){
    try{
        savedContent = await JSON.parse(localStorage.getItem("code"))
    }catch(exc){
    }
    if (savedContent==null){
        localStorage.setItem("code",JSON.stringify({ "init" : "", "step" : "", timer : stepperTimer }))
        savedContent = JSON.parse(localStorage.getItem("code"))
    }
    jQuery('#init').val(savedContent.init)
    jQuery('#step').val(savedContent.step)
    stepperTimer = savedContent.timer
}
function saveDB(){
    jQuery('.code').each(function(){
        var name = jQuery(this).attr('id')
        var value = jQuery(this).val()
        savedContent[name]=value;
    })
    for(var i in editorReference){
        savedContent[i.substring(1,i.length-4)]=editorReference[i].getValue()
    }
    savedContent.timer = stepperTimer
    localStorage.setItem("code",JSON.stringify(savedContent))
}
function changeTimer(diff){
    if (stepperTimer+diff>50){
        stepperTimer+=diff
    }
    saveDB()
}

jQuery(document).ready(function(){
    initDB()
    for(i in REV_TOUCHE){
        TOUCHE[REV_TOUCHE[i]]=false
    }
    jQuery("#run").click(function(){
        run()
    })
    jQuery("#stop").click(function(){
        stop()
    })
    jQuery("#clear-log").click(function(){
        clearLog();
    })
    jQuery(".code").change(function(){

    })
    jQuery('.setTimer').click(function(){
        var diff = jQuery(this).data()
        changeTimer(diff)
    })
    $(window).resize(function() {
        var pixelSize = Math.floor(Math.min(jQuery('.block-display').width()/(DEFAULT_WIDTH+2)),jQuery('.block-display').height()/(DEFAULT_HEIGHT+2))
        jQuery('#stylePixel').text('.pixel { width : '+pixelSize+'px; height :'+pixelSize+'px; }')
    })
    jQuery('.active.tab-pane .code').each(function(){
        var editorName="#"+jQuery(this).closest('.tab-pane').attr('id')
        editorReference[editorName] = CodeMirror.fromTextArea(jQuery(this)[0], {
            lineNumbers: true,
            mode:  "javascript"
        });
        editorReference[editorName].on("blur",function(){editorReference[editorName].save()})
        editorReference[editorName].on("change",saveDB)
    })
    jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var tabName = jQuery(e.target).attr('href')
        editorReference[tabName] =  CodeMirror.fromTextArea(jQuery(tabName+' .code')[0], {
            lineNumbers: true,
            mode:  "javascript"
        });
        editorReference[tabName].on("blur",function(){editorReference[tabName].save()})
        editorReference[tabName].on("change",saveDB)
        var tabNameHidden = jQuery(e.relatedTarget).attr('href')
        editorReference[tabNameHidden].toTextArea()
        delete editorReference[tabNameHidden]
    })
    tailleAffichage(DEFAULT_WIDTH,DEFAULT_HEIGHT)
    $(window).resize()
})
