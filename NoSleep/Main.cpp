#include <iostream>
#include <Windows.h>
#include <time.h>
#include <string>

void FocusWindow(HWND wnd) {
    DWORD thisThread = GetCurrentThreadId();
    DWORD thatThread = GetWindowThreadProcessId(wnd, NULL);

    if (thatThread == 0) {
        return;
    }

    if (thisThread != thatThread) {
        AttachThreadInput(thisThread, thatThread, TRUE);
    }

    SetActiveWindow(wnd);
    ShowWindow(wnd, SW_RESTORE);
    SetFocus(wnd);
    SetForegroundWindow(wnd);

    if (thisThread != thatThread) {
        AttachThreadInput(thisThread, thatThread, FALSE);
    }

    //CloseHandle(proc);
    //CloseHandle(mod);
}


int main() {
    FreeConsole();
    SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED);
   
    while (true) {
        LASTINPUTINFO li = {0};

        ZeroMemory(&li, sizeof(li));
        li.cbSize = sizeof(li);

        GetLastInputInfo(&li);

        DWORD lastInpTime = li.dwTime;
        DWORD currentTick = GetTickCount();

        if (currentTick - lastInpTime > 500000) { // 500 seconds idle
            HWND tech = FindWindowA(0, "techexp");

            if (tech != NULL) {
                FocusWindow(tech);
            }
            else {
                MessageBoxA(0, "ERROR: NoSleep couldn't find tech experience window\r\n\r\n\r\n     - Please show this error to a technology associate - \r\n\r\n(If you're a technology associate then tell Marco)", "CRITICAL ERROR", MB_ICONERROR | MB_OK);
                exit(2);
            }
        }

        //Sleep(360000); // Wait an hour between checks
        Sleep(5000);
    }

    return 0;
}
