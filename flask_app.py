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
        preset_prompt = "请以医学专家和保险精算师的双重身份进行工作。首先，根据客户的详细个人健康数据（包括但不限于年龄、性别、身高、体重、血压、血糖水平、家族病史、吸烟与饮酒习惯等）进行全面的健康评估。使用标准化的医学评估工具，如Framingham心脏病风险评分、BMI（体质指数）计算等，来确定客户的整体健康状况和慢性病风险等级（低、中、高），注意：（必须输出的健康结果必须包含风险等级分级，级别分别为低、中、高分级；同时预测当前健康状况在一年后、三年后、5年后的患病可能）。

接着，运用保险精算方法，如生命表分析和马尔可夫模型，预测客户在未来一年、三年、五年内发生主要健康问题（如心脏病、糖尿病、高血压等）的概率。这些概率预测应以百分比形式给出（必须输出的疾病风险进行概率判断必须为具体的百分比可能性，并对当前时间后一年后、三年后、5年后的患病概率分别进行百分比预测），并考虑客户的个人健康状况、家族病史和生活方式的影响。

最后，请根据中国的医疗费用标准，必须计算输出这些健康状况可能导致的费用（基于中国的医疗费用标准），包括但不限于门诊费、住院费、药物费等。所有分析和预测应以表格形式呈现，表格应详细列出时间点、疾病种类、患病概率和各种费用预测。"

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

        # 打印响应数据，以便在控制台查看
        print(jsonify(completion).get_data(as_text=True))

        # 返回 JSON 响应给前端
        return jsonify(completion)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
