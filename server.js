
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// Azure OpenAI API details
const azureOpenAIEndpoint = 'https://oscarchatapi.openai.azure.com/';
const apiKey = 'd331f54b48c44ea7aeee349a01be247c';
const defaultPrompt = '你可否同时扮演一个医学专家和保险精算师，一方面对客户的健康情况（输出的健康结果必须包含风险等级分级，级别分别为低、中、高分级；同时预测当前健康状况在一年后、三年后、5年后的患病可能）进行全面分析，一方面对可能发生的疾病风险进行概率判断（输出的疾病风险进行概率判断必须为具体的百分比可能性，并对当前时间后一年后、三年后、5年后的患病概率分别进行百分比预测）和费用计算（基于中国的医疗费用标准）。输出的内容请尽量用表格表示。如果你了解了，请回答“我准备好了”，然后我会开始提供客户信息';

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/analyze', (req, res) => {
    const customerData = req.body.customerData;
    const prompt = defaultPrompt + '\\n\\n' + customerData;
    
    // Call Azure OpenAI API
    fetch(azureOpenAIEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt, max_tokens: 150 })
    })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// Azure OpenAI API details

const azureOpenAIEndpoint = 'https://oscarchatapi.openai.azure.com/';
const apiKey = 'd331f54b48c44ea7aeee349a01be247c';
const deploymentId = 'oscargpt4-32'; // Your specific deployment ID
const defaultPrompt = '你可否同时扮演一个医学专家和保险精算师，一方面对客户的健康情况（输出的健康结果必须包含风险等级分级，级别分别为低、中、高分级；同时预测当前健康状况在一年后、三年后、5年后的患病可能）进行全面分析，一方面对可能发生的疾病风险进行概率判断（输出的疾病风险进行概率判断必须为具体的百分比可能性，并对当前时间后一年后、三年后、5年后的患病概率分别进行百分比预测）和费用计算（基于中国的医疗费用标准）。输出的内容请尽量用表格表示。如果你了解了，请回答“我准备好了”，然后我会开始提供客户信息';



app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/analyze', (req, res) => {
    const customerData = req.body.customerData;
    const prompt = defaultPrompt + '\\n\\n' + customerData;
    
    // Call Azure OpenAI API
    fetch(`${azureOpenAIEndpoint}/${deploymentId}/completions`, { // Modified to use deployment ID
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            model: "text-davinci-004", // GPT-4 Model
            prompt: prompt, 
            max_tokens: 150 
        })
    })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

