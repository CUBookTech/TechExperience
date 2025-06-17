#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include <Windows.h>
#include <string>
#include <vector>
#include <fstream>

#include "Util.h"
#include "configVars.h"

#define msg(x) MessageBoxA(0,x,"hi",0)

std::string buildSteamCommand(std::string cmd) {
	std::string command = "cd ";
	command.append(cfg::steamPath);
	command.append(" & steam ");
	command.append(cmd);

	return command;
}

void LaunchSteamGame(std::string procPath, char *procName, bool isVR) {
	std::string gameID = procPath.substr(3);

	if (isVR) {
		// this is horrible using a system call sorry
		DWORD steamVRPID = util::IsProcessRunning(L"vrmonitor.exe");
		if (steamVRPID == 0) {
			system(buildSteamCommand("steam://rungameid/250820").c_str());
			Sleep(5000); // wait for it to actually start
		}
	}
	

	DWORD gamePID = util::IsProcessRunning(util::GetWC(procName));
	if (gamePID > 0) { // Game is already running
		util::FrontWindow(gamePID);
		return;
	}

	std::string gameLaunch = "steam://rungameid/" + gameID;
	system(buildSteamCommand(gameLaunch).c_str());

	// steam 620980
	//https://steamdb.info/app/559010/
}

void parseCfg() {
	std::ifstream cfgFile("launcher.cfg");
	if (!cfgFile.is_open()) {
		MessageBoxA(0, "ERROR: launcher.cfg file not found in working directory - please see a technology associate\r\n\r\n(If you're a technology associate show this to Marco)", "ERROR", MB_OK);
		return;
	}

	std::string cfgLine;
	while (std::getline(cfgFile, cfgLine)) {
		size_t colon = cfgLine.find(":");
		if (colon == std::string::npos) {
			MessageBoxA(0, "ERROR: Invalid launcher.cfg syntax - please see a technology associate\r\n\r\n(If you're a technology associate show this to Marco)", "ERROR", MB_OK);
			return;
		}

		std::string property = cfgLine.substr(0, colon);
		std::string value = cfgLine.substr(colon + 2); // skip space after colon
		
		if (property == "STEAMPATH")
			cfg::steamPath = value.c_str();
	}

	cfgFile.close();
}

int main(int argc, char* argv[]) {
	if (argc < 3) // Must atleast pass the path to the process & its name to start
		return 2;

	std::string procPath(argv[1]);
	char* procName = argv[2];

	/*
		Setup configuration
	*/
	cfg::steamPath = "";
	parseCfg();

	/*
		Steam games have a dedicated launcher
	*/
	if (procPath.substr(0, 3).compare("VR:") == 0) {
		LaunchSteamGame(procPath, procName, true);
		return 0;
	}
	else if (procPath.substr(0, 3).compare("SM:") == 0) {
		LaunchSteamGame(procPath, procName, false);
		return 0;
	}


	/*
		Monolith to check if the game the customer wants to play is already running, if so focus its window
		(lots of code because minecraft HATES focusing windows based on process names)
	*/
	std::string procStr(procName);

	if (procStr.substr(0, 4).compare("WND:") == 0 || procStr.substr(0, 4).compare("WNX:") == 0) {
		bool exclusiveSearch = procStr.substr(0, 4).compare("WNX:") == 0;
		std::string searchName = procStr.substr(4);

		std::vector<std::string> windowList = {};
		EnumWindows(util::windowEnum, (LPARAM)(&windowList));

		for (std::string wndName : windowList) {
			if (exclusiveSearch) {
				if (wndName.compare(searchName) == 0) {

				}
			}
			else {

			}
		}
	}
	else {
		DWORD runningPid = util::IsProcessRunning(util::GetWC(procName));

		if (runningPid > 0) {
			util::FrontWindow(runningPid);
			return 3;
		}
	}


	// Compile all the passed arguments to pass to launcher
	std::string args = "";

	if (argc > 3) {
		for (int i = 3; i < argc; i++) {
			args.append(argv[i]);
			
			if (i < argc)
				args.append(" ");
		}
	}

	util::LaunchProc(procPath.c_str(), args.c_str());

	return 0;
}
