const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 托管静态文件
app.use(express.static('public'));

// 当访问根路径时发送index.html作为响应
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
