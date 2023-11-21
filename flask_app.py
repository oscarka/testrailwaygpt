from flask import Flask, request, jsonify, send_from_directory
import os
import openai

app = Flask(__name__, static_folder='public', static_url_path='/static')

# Azure OpenAI API 配置
openai.api_type = "azure"
openai.api_base = "https://oscarchatapi.openai.azure.com/"
openai.api_version = "2023-07-01-preview"
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:

        customer_data = request.json.get('customerData')

        # 预设的提示词
        preset_prompt = "请同时扮演一个医学专家和保险精算师，一方面对客户的健康情况（输出的健康结果必须包含风险等级分级，级别分别为低、中、高分级；同时预测当前健康状况在一年后、三年后、5年后的患病可能）进行全面分析，一方面对可能发生的疾病风险进行概率判断（输出的疾病风险进行概率判断必须为具体的百分比可能性，并对当前时间后一年后、三年后、5年后的患病概率分别进行百分比预测）和费用计算（基于中国的医疗费用标准）。输出的内容请尽量用表格表示，后面的是客户信息："

        # 将预设的提示词与用户输入结合
        combined_message = preset_prompt + customer_data

        # 创建包含结合后消息的用户消息
        user_message = {"role": "user", "content": combined_message}

        # 构建消息文本
        message_text = [
            {"role": "system", "content": "You are an AI assistant that helps people find information."},
            user_message
        ]
        
        
        completion = openai.ChatCompletion.create(
        engine="oscargpt4-32",
        messages = message_text,
        temperature=0.7,
        max_tokens=800,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None
        )


        
        return jsonify(completion)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
