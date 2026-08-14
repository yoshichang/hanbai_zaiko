const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>在庫管理アプリ、サーバー起動成功！</h1>');
});

server.listen(3000, () => {
  console.log('サーバーが起動しました。ブラウザで http://localhost:3000 を開いてください');
});