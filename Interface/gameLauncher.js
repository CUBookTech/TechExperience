//https://steamdb.info/app/559010/

// Launch VR game command: VR:xxxxxx
// Launch non-VR game command: SM:xxxxxx

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const prismPath = "C:\\Users\\CUBS Customer\\AppData\\Local\\Programs\\PrismLauncher\\prismlauncher.exe";
const robloxPath = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Roblox\\Roblox Player.lnk"

const launcherPath = "C:\\Users\\CUBS Customer\\source\\repos\\NoSleep\\Release\\LaunchProgram.exe";

var launchInProg = false;

function launchGame(id) {
    if (launchInProg) {
        console.error("cannot launch, already launching game");
        document.getElementById("waitBro").style = "padding-top: 50%; display: block;"
        return false;
    }

    switch (id) {
        case 1:
            launchInProg = true;
            window.electron.runExe(launcherPath, [chromePath, "RobloxPlayerBeta.exe", "https://roblox.com/charts"]);
        break;

        case 2:
            launchInProg = true;
            window.electron.runExe(launcherPath, [prismPath, "WND:Minecraft", "--launch", "1.21.4"]);
        break;

        case 3:
            launchInProg = true;
            window.electron.runExe(launcherPath, ["VR:559010", "RobloxPlayerBeta.exe", "https://roblox.com/charts"]);
        break;
    }

    if (launchInProg) {
        var launchDelay = (id == 1) ? 5000 : 20000

        setTimeout(() => {
            launchInProg = false;
            document.getElementById("waitBro").style = "padding-top: 50%; display: none;"
        }, launchDelay)
    }
}