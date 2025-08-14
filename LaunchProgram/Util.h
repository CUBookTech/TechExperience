#pragma once
#include <Windows.h>

#define TITLE_SIZE 1024

namespace util {
	const wchar_t* GetWC(const char* c);
	DWORD IsProcessRunning(const wchar_t* procName);
	void LaunchProc(const char* procPath, const char *args);
	void FrontWindow(DWORD pid);
	void FrontWindow(HWND);
	BOOL CALLBACK windowEnum(HWND, LPARAM);
}