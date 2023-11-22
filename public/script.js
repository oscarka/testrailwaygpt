
document.getElementById('submitButton').addEventListener('click', function() {
    // Display the loading indicator
    document.getElementById('loading').style.display = 'block';

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
        // Hide the loading indicator
        document.getElementById('loading').style.display = 'none';
        // Display the data
        document.getElementById('response').innerHTML = JSON.stringify(data, null, 2);
        // Scroll to the top of the response area
        document.getElementById('response').scrollTop = 0;
    })
    .catch(error => {
        // Hide the loading indicator
        document.getElementById('loading').style.display = 'none';
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'Error: ' + error;
    });
});
