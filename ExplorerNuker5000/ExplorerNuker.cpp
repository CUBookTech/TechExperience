#include <Windows.h>

int main() {
    HWND shell = GetShellWindow();
    PostMessage(shell, WM_QUIT, 0, 0);

    return 0; // Thank you for coming to my ted talk
}
