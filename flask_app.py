
from flask import Flask, request, jsonify, send_from_directory
import os
import openai

app = Flask(__name__, static_folder='public', static_url_path='/static')


# Azure OpenAI API 配置
openai.api_type = "azure"
openai.api_base = "https://oscarchatapi.openai.azure.com/"
openai.api_version = "2023-07-01-preview"
openai.api_key = os.getenv("OPENAI_API_KEY")  # 确保在环境变量中设置了 API 密钥

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    customer_data = request.json.get('customerData')

    message_text = [
        {"role": "system", "content": "You are an AI assistant that helps people find information."},
        {"role": "user", "content": customer_data},
        # 可以根据需要添加更多消息
    ]

    completion = openai.ChatCompletion.create(
        engine="oscargpt4-32",
        messages=message_text,
        temperature=0.7,
        max_tokens=800,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None
    )

    return jsonify(completion)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
