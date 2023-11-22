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
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        // Check if the data structure has the expected content field
        if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            var content = data.choices[0].message.content;
            responseContainer.textContent = content; // Display content
        } else {
            // If the expected content field is not present, show a default message or the whole response for debugging
            responseContainer.textContent = 'Received unexpected data structure from the API.';
            console.log(data); // Log the whole data for debugging
        }
    })
    .catch(error => {
        console.error('Error:', error);
        responseContainer.textContent = 'Error: ' + error.message;
    })
    .finally(() => {
        spinner.style.display = 'none'; // Hide spinner in both cases (success/error)
    });
});
