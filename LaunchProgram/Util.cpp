#define _CRT_SECURE_NO_WARNINGS // hey austin

#include "Util.h"
#include <Windows.h>
#include <TlHelp32.h>
#include <string>
#include <vector>

const wchar_t* util::GetWC(const char* c)
{
    const size_t cSize = strlen(c) + 1;
    wchar_t* wc = new wchar_t[cSize];
    mbstowcs(wc, c, cSize);

    return wc;
}

void GetAllWindowsFromProcessID(DWORD dwProcessID, std::vector <HWND>& vhWnds)
{
	HWND hCurWnd = NULL;
	do
	{
		hCurWnd = FindWindowEx(NULL, hCurWnd, NULL, NULL);
		DWORD dwProcID = 0;
		GetWindowThreadProcessId(hCurWnd, &dwProcID);
		if (dwProcID == dwProcessID)
		{
			vhWnds.push_back(hCurWnd);
		}
	} while (hCurWnd != NULL);
}

DWORD util::IsProcessRunning(const wchar_t* procName) {
	PROCESSENTRY32 entry;
	entry.dwSize = sizeof(PROCESSENTRY32);

	HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);

	if (Process32First(snapshot, &entry) == TRUE)
	{
		while (Process32Next(snapshot, &entry) == TRUE)
		{
			if (wcscmp(entry.szExeFile, procName) == 0)
			{
				DWORD pid = entry.th32ProcessID;

				return pid;
			}
		}
	}

	CloseHandle(snapshot);

	return 0;
}

BOOL CALLBACK util::windowEnum(HWND hwnd, LPARAM wvPtr) {
	const DWORD TITLE_SIZE = 1024;
	char windowTitle[TITLE_SIZE];

	GetWindowTextA(hwnd, windowTitle, TITLE_SIZE);
	int length = ::GetWindowTextLength(hwnd);

	std::string wndTitle(windowTitle);

	std::vector<std::string>* wnds = reinterpret_cast<std::vector<std::string>*>(wvPtr);
	wnds->push_back(wndTitle);

	return TRUE;
}

void util::FrontWindow(DWORD pid) {
	std::vector<HWND> procWindows;
	GetAllWindowsFromProcessID(pid, procWindows);

	for (HWND wnd : procWindows) {
		SetForegroundWindow(wnd);
	}
}

void util::FrontWindow(HWND wnd) {
	if (wnd != NULL && wnd != INVALID_HANDLE_VALUE && IsWindow(wnd))
		SetForegroundWindow(wnd);
}

void util::LaunchProc(const char* procPath, const char *args) {
	STARTUPINFO info;
	PROCESS_INFORMATION processInfo;

	ZeroMemory(&info, sizeof(STARTUPINFO));
	ZeroMemory(&processInfo, sizeof(PROCESS_INFORMATION));

	info.cb = sizeof(STARTUPINFO);

	std::string command = std::string(procPath);
	if (strlen(args) > 0) {
		command.append(" ");
		command.append(args);
	}
	
	// this line is awful sorry
	if (CreateProcess(NULL, (wchar_t*)util::GetWC(command.c_str()), NULL, NULL, TRUE, 0, NULL, NULL, &info, &processInfo))
	{
		WaitForSingleObject(processInfo.hProcess, INFINITE);
		CloseHandle(processInfo.hProcess);
		CloseHandle(processInfo.hThread);
	}
}