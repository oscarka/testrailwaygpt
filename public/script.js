document.getElementById('submitButton').addEventListener('click', function() {
    var customerData = document.getElementById('customerInput').value;
    var responseContainer = document.getElementById('response');
    var spinner = document.querySelector('.loading-spinner');
    spinner.style.display = 'inline-block'; // 显示加载指示器

    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache' // 确保不使用缓存
        },
        body: JSON.stringify({ customerData: customerData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            // 确保只显示 content 字段的内容
            responseContainer.textContent = data.choices[0].message.content;
        } else {
            // 如果预期的 content 字段不存在，显示错误消息
            responseContainer.textContent = 'API返回的数据结构不符合预期。';
        }
        spinner.style.display = 'none'; // 隐藏加载指示器
    })
    .catch(error => {
        responseContainer.textContent = '发生错误：' + error.message;
        spinner.style.display = 'none'; // 隐藏加载指示器
    });
});
