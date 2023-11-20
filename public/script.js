function sendData() {
    var customerData = document.getElementById('customerInput').value;
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerData: customerData }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = '<h3>分析结果：</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
