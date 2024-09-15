const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Client connected');

  // Ping-Pong 기능
  ws.on('pong', () => {
    console.log('Received pong from client');
  });

  // 클라이언트로부터 메시지를 받을 때 처리
  ws.on('message', (message) => {
    try {
      const jsonMessage = JSON.parse(message);
      console.log('Received:', jsonMessage);

      // 받은 JSON을 그대로 클라이언트에게 전송
      ws.send(JSON.stringify(jsonMessage));
    } catch (error) {
      console.error('Invalid JSON received:', message);
    }
  });

  // 주기적으로 ping 보내기 (5초마다)
  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
      console.log('Sent ping to client');
    }
  }, 5000);

  // 연결이 닫혔을 때 처리
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(pingInterval);
  });
});

console.log('WebSocket server is running on ws://localhost:8080');

