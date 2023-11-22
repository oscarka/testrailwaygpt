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
        if (data.choices && data.choices.length > 0 && data.choices[0].hasOwnProperty('message') && data.choices[0].message.hasOwnProperty('content')) {
            // Display content immediately after it's available
            responseContainer.textContent = data.choices[0].message.content;
        } else {
            // If the expected content is not present, log the whole response for debugging
            responseContainer.textContent = 'Received unexpected data structure from the API.';
            console.log(data);
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
