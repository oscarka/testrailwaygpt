document.getElementById('submitButton').addEventListener('click', function() {
    var customerData = document.getElementById('customerInput').value;
    var button = this;
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
        // Assuming the data structure includes data.choices[0].message.content
        var content = data.choices[0].message.content;
        document.getElementById('response').textContent = content; // Display content
        spinner.style.display = 'none'; // Hide spinner
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').textContent = 'Error: ' + error;
        spinner.style.display = 'none'; // Hide spinner
    });
});
