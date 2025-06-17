#include <Windows.h>
#include <shellapi.h>
#include <thread>
#include <time.h>

#define WM_TRAYICON (WM_USER + 1)
#define ID_TRAY_EXIT 1001

HINSTANCE hInst;
NOTIFYICONDATA nid;
HMENU hPopupMenu;

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {
    switch (msg) {
    case WM_CREATE:
        // Create system tray icon
        ZeroMemory(&nid, sizeof(nid));
        nid.cbSize = sizeof(NOTIFYICONDATA);
        nid.hWnd = hwnd;
        nid.uID = 1;
        nid.uFlags = NIF_ICON | NIF_MESSAGE | NIF_TIP;
        nid.uCallbackMessage = WM_TRAYICON;
        nid.hIcon = LoadIcon(NULL, IDI_APPLICATION);
        lstrcpy(nid.szTip, TEXT("No Skeep"));
        Shell_NotifyIcon(NIM_ADD, &nid);

        // Create popup menu
        hPopupMenu = CreatePopupMenu();
        AppendMenu(hPopupMenu, MF_STRING, ID_TRAY_EXIT, TEXT("Become Sleepy"));
        break;

    case WM_TRAYICON:
        if (lParam == WM_RBUTTONUP) {
            POINT pt;
            GetCursorPos(&pt);
            SetForegroundWindow(hwnd); // Important for menu focus
            TrackPopupMenu(hPopupMenu, TPM_BOTTOMALIGN | TPM_LEFTALIGN, pt.x, pt.y, 0, hwnd, NULL);
        }
        break;

    case WM_COMMAND:
        switch (LOWORD(wParam)) {
        case ID_TRAY_EXIT:
            PostMessage(hwnd, WM_CLOSE, 0, 0);
            break;
        }
        break;

    case WM_DESTROY:
        // Tell 'puter it can sleep
        SetThreadExecutionState(ES_CONTINUOUS);


        Shell_NotifyIcon(NIM_DELETE, &nid); // Clean up
        PostQuitMessage(0);
        break;
    }

    return DefWindowProc(hwnd, msg, wParam, lParam);
}

void timeChecker() {
    while (true) {
        // Get the current time
        std::time_t currentTime = std::time(nullptr);

        // Convert to local time
        
        std::tm localTime;
        localtime_s(&localTime, &currentTime);

        // Extract the hour
        int hour = localTime.tm_hour;

        if (hour > 17) { // 6:00 PM or later, turn off anti-sleep
            SetThreadExecutionState(ES_CONTINUOUS);
        }
        else {
            // Turn on anti-sleep if it's 1AM or earlier
            SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED);
        }
        Sleep(360000); // Wait an hour between checks
    }
}

int APIENTRY WinMain(HINSTANCE hInstance, HINSTANCE, LPSTR, int) {

    SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED);
    CreateThread(0, 0, (LPTHREAD_START_ROUTINE)timeChecker, 0, 0, 0);


    hInst = hInstance;
    WNDCLASS wc = { 0 };
    wc.lpfnWndProc = WndProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = TEXT("TrayAppClass");
    RegisterClass(&wc);

    HWND hwnd = CreateWindow(TEXT("TrayAppClass"), TEXT("NoSkeep"),
        WS_OVERLAPPEDWINDOW, CW_USEDEFAULT, CW_USEDEFAULT, 300, 200,
        NULL, NULL, hInstance, NULL);

    // (Optional) Hide the window
    ShowWindow(hwnd, SW_HIDE);

    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    return 0;
}
