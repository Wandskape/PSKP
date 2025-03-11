#include <iostream>
#include <winsock2.h>

#pragma comment(lib, "ws2_32.lib")

#define SERVER_IP "127.0.0.1"
#define PORT 40000
#define BUFFER_SIZE 1024
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#pragma warning(disable:4996) 

using namespace std;

int main() {
    WSADATA wsa;
    WSAStartup(MAKEWORD(2, 2), &wsa);

    SOCKET clientSocket = socket(AF_INET, SOCK_DGRAM, 0);
    sockaddr_in serverAddr;
    char buffer[BUFFER_SIZE];

    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = inet_addr(SERVER_IP);
    serverAddr.sin_port = htons(PORT);

    string message = "Hello, UDP Server!";
    sendto(clientSocket, message.c_str(), message.length(), 0, (sockaddr*)&serverAddr, sizeof(serverAddr));
    cout << "Message sent to server" << endl;

    int serverLen = sizeof(serverAddr);
    int received = recvfrom(clientSocket, buffer, BUFFER_SIZE, 0, (sockaddr*)&serverAddr, &serverLen);
    buffer[received] = '\0';

    cout << "Received from server: " << buffer << endl;

    closesocket(clientSocket);
    WSACleanup();
    return 0;
}
