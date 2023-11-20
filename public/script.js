document.getElementById('submitButton').addEventListener('click', function() {
    var customerData = document.getElementById('customerInput').value;
    fetch('https://testrailwaygpt-production.up.railway.app/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerData: customerData })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'Error: ' + error;
    });
});

