

document.getElementById('submitButton').addEventListener('click', function() {
    var customerData = document.getElementById('customerInput').value;
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerData: customerData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.choices && data.choices.length > 0) {
            var aiResponse = data.choices[0].message.content; // 提取 AI 的回答
            document.getElementById('response').innerHTML = aiResponse;
        } else {
            document.getElementById('response').innerHTML = "No response from AI.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'Error: ' + error;
    });
});
