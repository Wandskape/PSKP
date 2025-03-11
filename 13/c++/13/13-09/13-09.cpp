#include <iostream>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib")

#define PORT 40000
#define BUFFER_SIZE 1024

using namespace std;

int main() {
    WSADATA wsa;
    WSAStartup(MAKEWORD(2, 2), &wsa);

    SOCKET serverSocket = socket(AF_INET, SOCK_DGRAM, 0);
    sockaddr_in serverAddr, clientAddr;
    char buffer[BUFFER_SIZE];

    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    serverAddr.sin_port = htons(PORT);

    bind(serverSocket, (sockaddr*)&serverAddr, sizeof(serverAddr));

    cout << "UDP Server listening on port " << PORT << endl;

    int clientLen = sizeof(clientAddr);
    try{
        while (true) {
            int received = recvfrom(serverSocket, buffer, BUFFER_SIZE, 0, (sockaddr*)&clientAddr, &clientLen);
            buffer[received] = '\0';
            cout << "Received: " << buffer << endl;

            string response = "ECHO: " + string(buffer);
            sendto(serverSocket, response.c_str(), response.length(), 0, (sockaddr*)&clientAddr, clientLen);
        }
    }
    catch (...)
    {
        cout << "Error" << endl;
    }

    closesocket(serverSocket);
    WSACleanup();
    return 0;
}
