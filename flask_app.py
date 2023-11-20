
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Azure OpenAI API details
azure_openai_endpoint = 'https://oscarchatapi.openai.azure.com/deployments/oscargpt4-32/completions?api-version=2023-06-13'
api_key = 'd331f54b48c44ea7aeee349a01be247c'  # Replace with your actual API key
default_prompt = '你可否同时扮演一个医学专家和保险精算师...'

@app.route('/analyze', methods=['POST'])
def analyze():
    customer_data = request.json.get('customerData')
    prompt = default_prompt + '\n\n' + customer_data

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }
    data = {
        'prompt': prompt,
        'max_tokens': 150
    }

    response = requests.post(azure_openai_endpoint, json=data, headers=headers)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
