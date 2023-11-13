

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  // 修改端口设置

// Static files
app.use(express.static('public'));  // 假设您的前端文件位于名为“public”的目录中

app.get('/', (req, res) => {
    res.send('English Speaking Practice App Backend');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
