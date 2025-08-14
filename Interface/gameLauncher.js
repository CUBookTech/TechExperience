//https://steamdb.info/app/559010/

// Launch VR game command: VR:xxxxxx
// Launch non-VR game command: SM:xxxxxx

var chromePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
var prismPath = "C:\\Users\\vrdemo\\AppData\\Local\\Programs\\PrismLauncher\\prismlauncher.exe";

var launchInProg = false;
var launchDebounce = 0;
function gameLauncher_init() {
    // Launch steam vr
    window.electron.runExe("NoSleep.exe");
    window.electron.runExe("ExplorerNuker5000.exe");
    window.electron.runExe("LaunchProgram.exe", ["SM:250820", "vrmonitor.exe"]);
}
function launchGame(id) {
    if (launchInProg) {
        console.error("cannot launch, already launching game");
        document.getElementById("waitBro").style = "padding-top: 50%; display: block;"
        return false;
    }

    console.log("LaunCH:" + chromePath + "!");

    switch (id) {
        case 1:
            launchInProg = true;
            launchDebounce = 5;
            window.electron.runExe("LaunchProgram.exe", [chromePath, "RobloxPlayerBeta.exe", "https://roblox.com/charts"]);
        break;

        case 2:
            launchInProg = true;
            launchDebounce = 30;
            window.electron.runExe("LaunchProgram.exe", [prismPath, "WND:Minecraft* 1.21.4", "--launch", "1.21.4"]);
        break;

        case 3: // Beat Saber
            launchInProg = true;
            launchDebounce = 30;
            window.electron.runExe("LaunchProgram.exe", ["VR:620980", "Beat Saber.exe"]);
            break;

        case 4: // Google Earth VR
            launchInProg = true;
            launchDebounce = 30;
            window.electron.runExe("LaunchProgram.exe", ["VR:348250", "Earth.exe"]);
            break;
        case 5: // Subnautica
            launchInProg = true;
            launchDebounce = 30;
            window.electron.runExe("LaunchProgram.exe", ["VR:264710", "Subnautica.exe"]);
            break;
        case 6: // Rec Room
            launchInProg = true;
            launchDebounce = 30;
            window.electron.runExe("LaunchProgram.exe", ["VR:471710", "Recroom_Release.exe"]);
            break;
        case 7: // the lab
            
            launchInProg = true;
            launchDebounce = 30;
            window.electron.runExe("LaunchProgram.exe", ["VR:450390", "TheLab.exe"]);
            break;
        case 8: // Epic Roller Coasters
            
            launchInProg = true;
            launchDebounce = 30;
            window.electron.runExe("LaunchProgram.exe", ["VR:787790", "Epic Roller Coasters.exe"]);
            break;
        
    }

    if (launchInProg) {
        setTimeout(() => {
            launchInProg = false;
            document.getElementById("waitBro").style = "padding-top: 50%; display: none;"
        }, launchDebounce * 1000);
    }
}

gameLauncher_init();