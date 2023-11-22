document.getElementById('submitButton').addEventListener('click', function() {
    var button = this;
    if (button.getAttribute('data-loading') === 'true') {
        // 如果按钮已经在加载状态，防止重复提交
        return;
    }
    button.setAttribute('data-loading', 'true');

    var customerData = document.getElementById('customerInput').value;
    var responseContainer = document.getElementById('response');
    var spinner = document.querySelector('.loading-spinner');
    spinner.style.display = 'inline-block'; // 显示加载指示器

    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({ customerData: customerData })
    })
    .then(response => response.json())
    .then(data => {
    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
        responseContainer.textContent = data.choices[0].message.content;
    } else {
        responseContainer.textContent = 'Unexpected data format from API.';
    }
    })
    .finally(() => {
    spinner.style.display = 'none';
    button.removeAttribute('data-loading');
    });
});


.then(data => {
    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
        responseContainer.textContent = data.choices[0].message.content;
    } else {
        responseContainer.textContent = 'Unexpected data format from API.';
    }
})
.finally(() => {
    spinner.style.display = 'none';
    button.removeAttribute('data-loading');
});
