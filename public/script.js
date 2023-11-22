document.getElementById('submitButton').addEventListener('click', function() {
    var customerData = document.getElementById('customerInput').value;
    var responseContainer = document.getElementById('response');
    var spinner = document.querySelector('.loading-spinner');
    spinner.style.display = 'inline-block'; // Show spinner

    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerData: customerData })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // 打印接收到的完整数据
        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
        var content = data.choices[0].message.content;
        document.getElementById('response').textContent = content;
        } else {
        document.getElementById('response').textContent = 'Received unexpected data structure from the API.';
        console.log('Unexpected data:', data);
        }
    })
    .catch(error => {
        // Handle any errors that occurred during fetch or data processing
        responseContainer.textContent = 'Error: ' + error.message;
    })
    .finally(() => {
        // Always hide the spinner after processing is complete
        spinner.style.display = 'none';
    });
});
