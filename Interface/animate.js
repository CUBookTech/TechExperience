var color = {
    r: 31,
    g: 31,
    b: 31
};
var animTick = 0;

function fillSpace(hi) {
    if (hi.length == 1) {
        return "0"+hi;
    }
    return hi;
}

function clrToHex(clr) {
    var str = "";
    var rstr = Math.floor(clr.r).toString(16);
    var gstr = Math.floor(clr.g).toString(16);
    var bstr = Math.floor(clr.b).toString(16);
    
    rstr = fillSpace(rstr);
    gstr = fillSpace(gstr);
    bstr = fillSpace(bstr);
    
    str = rstr + gstr + bstr;

    return "#"+str;   
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteText(str, inc = 1) {
    var txtDOM = document.getElementById("titleText");
    for (var i = 0; i < str.length; i++) {
        
        var supersub = str.substring(i);

        var nextSemiColon = supersub.indexOf(";");

        if (nextSemiColon < 7 && nextSemiColon > 0) {
            i += nextSemiColon;
        }
        
        txtDOM.innerHTML = str.substring(0, str.length - i);
        await sleep(25);
    }
}

async function typeText(str, inc = 1) {
    var txtDOM = document.getElementById("titleText");
    for (var i = 0; i < str.length; i++) {
        var supersub = str.substring(i);

        var nextSemiColon = supersub.indexOf(";");

        if (nextSemiColon < 7 && nextSemiColon > 0) {
            i += nextSemiColon;
        }

       txtDOM.innerHTML = str.substring(0, i + 1);
       
       await sleep(75); 
    }
}

const englishWelcome = "Welcome to the CU Book Store<br>Tech Experience.";
const englishPlay = "Select any game you'd like to play.";
const spanishWelcome = "Bienvenido a la experiencia de tecnol&#243;gica<br> de CU Book Store.";
const spanishPlay = "Selecciona cualquier videojuego<br> que quieras jugar.";
const hindiWelcome = "&#2360;&#2368;&#2351;&#2370;&#32;&#2348;&#2369;&#2325;&#32;&#2360;&#2381;&#2335;&#2379;&#2352;&#32;&#2335;&#2375;&#2325;&#32;&#2319;&#2325;&#2381;&#2360;&#2346;&#2368;&#2352;&#2367;&#2351;&#2306;&#2360;&#32;&#2350;&#2375;&#2306;&#32;&#2310;&#2346;&#2325;&#2366;&#32;&#2360;&#2381;&#2357;&#2366;&#2327;&#2340;&#32;&#2361;&#2376;";
const hindiPlay = "&#2325;&#2379;&#2312;&#32;&#2319;&#2325;&#32;&#2327;&#2375;&#2350;&#32;&#2330;&#2369;&#2344;&#2367;&#2319;&#32;&#2332;&#2379;&#32;&#2310;&#2346;&#32;&#2326;&#2375;&#2354;&#2344;&#2366;&#32;&#2330;&#2366;&#2361;&#2340;&#2375;&#32;&#2361;&#2376;&#2306;";
const mandarinWelcome = "&#27426;&#36814;&#26469;&#21040;&#32;&#67;&#85;&#32;&#20070;&#24215;&#31185;&#25216;&#20307;&#39564;";
const mandarinPlay = "&#36873;&#25321;&#24744;&#24819;&#29609;&#30340;&#20219;&#20309;&#28216;&#25103;";

async function yap(lang, inc = 1) {
    await typeText(lang, inc);
    await sleep(3000);
    await deleteText(lang, inc);
}

async function englishYap() {
        await yap(englishWelcome);
        await yap(englishPlay);
}

async function loopText() {
    while (true) {
        await englishYap();
        await yap(spanishWelcome);
        await yap(spanishPlay);
        await englishYap();
        await yap(hindiWelcome);
        await yap(hindiPlay);
        await englishYap();
        await yap(mandarinWelcome);
        await yap(mandarinPlay);
    }
}

loopText();

document.getElementById("sketch").style.cursor = "../cursor.png";