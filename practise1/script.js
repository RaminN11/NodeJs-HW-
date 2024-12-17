const http = require("http");

let viewCounts = {
  home: 0,
  about: 0,
};

const server = http.createServer((req, res) => {
    
    if (req.url === '/') {
        viewCounts.home += 1;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset= UTF-8'
        });
        res.end(` <h1>Главная страница</h1> <p>Просмотров страницы: ${viewCounts.home}</p> <a href="/about">Перейти на страницу обо мне</a>`);
        }
    else if (req.url === '/about') {
        viewCounts.about += 1;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset= UTF-8'
        });
        res.end(`<h1>Страница "О нас"</h1> <p>Просмотров страницы: ${viewCounts.about}</p> <a href="/">Перейти на главную страницу</a>`);
        }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>Страница недоступна (Код ошибки: 404) </h1>')
    }
    
});
const port = '3000';
server.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  })