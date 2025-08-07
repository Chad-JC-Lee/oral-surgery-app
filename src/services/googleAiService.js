import { getApiKey } from '../config/api';

// Google AI Studio API服務
class GoogleAiService {
  constructor() {
    this.endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    this.retryCount = 0;
    this.maxRetries = 3;
  }

  // 生成症狀描述選項
  async generateSymptomOptions(symptomId, symptomName, isSubLevel = false, parentOption = null, combinedDescription = '') {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('API key未設置，請在開發環境中設置API key');
    }
    
    const prompt = this.buildPrompt(symptomId, symptomName, isSubLevel, parentOption, combinedDescription);
    
    try {
      console.log('發送API請求到:', this.endpoint);
      console.log('API Key長度:', apiKey.length);
      console.log('是否為第二層:', isSubLevel);
      console.log('父選項:', parentOption);
      console.log('綜合描述:', combinedDescription);
      
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };
      
      console.log('請求內容:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${this.endpoint}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('API響應狀態:', response.status);
      console.log('API響應頭:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API錯誤響應:', errorText);
        
        // 檢查是否是服務過載錯誤
        if (response.status === 503 || errorText.includes('overloaded') || errorText.includes('UNAVAILABLE')) {
          throw new Error('AI服務暫時過載，請稍後再試');
        }
        
        throw new Error(`API請求失敗: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API成功響應:', data);
      this.retryCount = 0; // 重置重試計數器
      return this.parseResponse(data);
    } catch (error) {
      console.error('Google AI API錯誤:', error);
      
      // 如果是服務過載錯誤且未超過重試次數，則重試
      if ((error.message.includes('過載') || error.message.includes('503')) && this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`重試第 ${this.retryCount} 次...`);
        await this.delay(1000 * this.retryCount); // 指數退避
        return this.generateSymptomOptions(symptomId, symptomName, isSubLevel, parentOption, combinedDescription);
      }
      
      throw error;
    }
  }

  // 延遲函數
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 構建提示詞
  buildPrompt(symptomId, symptomName, isSubLevel = false, parentOption = null, combinedDescription = '') {
    if (isSubLevel) {
      // 第二層：根據第一層選擇生成更精細的選項
      if (parentOption === 'combined' && combinedDescription) {
        // 多維度評估結果
        return `
你現在模擬自己是剛接受完口腔癌切除以及皮瓣重建的病人，根據多維度評估的結果，猜測接下來要講的主訴。

症狀類型：${symptomName}
多維度評估結果：${combinedDescription}

要求：
1. 基於多維度評估結果，模擬病人的角度，生成3個可能的主訴描述
2. 主訴應該反映病人實際的感受和困擾，例如：
   - 如果評估結果包含「疼痛模式: 持續性」+「疼痛位置: 喉嚨」+「疼痛性質: 刺痛」，可以說「喉嚨一直刺痛，吃東西和說話都很困難」
   - 如果評估結果包含「疼痛模式: 間歇性」+「疼痛位置: 手術切口」+「疼痛程度: 7/10分」，可以說「切口那邊會一陣一陣痛，痛起來很厲害」
   - 如果評估結果包含「疼痛位置: 牙齒」+「疼痛性質: 跳痛」，可以說「牙齒那邊會跳痛，不知道是不是手術的關係」
3. 主訴要真實反映口腔癌手術後病人的實際感受
4. 要考慮手術後的特殊情況，如皮瓣重建、傷口癒合等
5. 返回JSON格式

請返回以下JSON格式：
{
  "options": [
    {
      "id": "complaint_1",
      "title": "主訴1",
      "description": "詳細描述這個主訴的具體情況"
    },
    {
      "id": "complaint_2", 
      "title": "主訴2",
      "description": "詳細描述這個主訴的具體情況"
    },
    {
      "id": "complaint_3",
      "title": "主訴3",
      "description": "詳細描述這個主訴的具體情況"
    }
  ]
}

注意：
- 要從病人的角度出發，模擬真實的主訴表達
- 要考慮口腔癌手術後的特殊情況
- 主訴要具體且真實，避免過於專業的醫學術語
- 要反映病人對症狀的實際感受和困擾
- 考慮手術後恢復期的特殊需求
`;
      } else {
        // 第二層：根據選擇的主訴生成更詳細的主訴
        return `
你現在模擬自己是剛接受完口腔癌切除以及皮瓣重建的病人，根據選擇的主訴，進一步描述更詳細的症狀。

第一層症狀：${symptomName}
已選擇的主訴：${parentOption}

要求：
1. 基於選擇的主訴，模擬病人的角度，生成3個更詳細的主訴描述
2. 這些更詳細的主訴應該：
   - 進一步描述症狀的具體表現
   - 說明症狀對日常生活的具體影響
   - 描述症狀的時間、頻率、強度等細節
   - 反映病人對症狀的具體感受和困擾
3. 主訴要真實反映口腔癌手術後病人的實際感受
4. 要考慮手術後的特殊情況，如皮瓣重建、傷口癒合等
5. 返回JSON格式

請返回以下JSON格式：
{
  "options": [
    {
      "id": "detailed_complaint_1",
      "title": "詳細主訴1",
      "description": "更詳細描述這個主訴的具體情況"
    },
    {
      "id": "detailed_complaint_2", 
      "title": "詳細主訴2",
      "description": "更詳細描述這個主訴的具體情況"
    },
    {
      "id": "detailed_complaint_3",
      "title": "詳細主訴3",
      "description": "更詳細描述這個主訴的具體情況"
    }
  ]
}

注意：
- 要從病人的角度出發，模擬真實的主訴表達
- 要考慮口腔癌手術後的特殊情況
- 主訴要具體且真實，避免過於專業的醫學術語
- 要反映病人對症狀的實際感受和困擾
- 考慮手術後恢復期的特殊需求
- 這層的主訴要比第一層更詳細、更具體
`;
      }
    } else {
      // 第一層：生成主要症狀選項
      return `
你現在模擬自己是剛接受完口腔癌切除以及皮瓣重建的病人，根據症狀類型，猜測可能的主訴。

要求：
1. 基於症狀類型，模擬病人的角度，生成3個可能的主訴描述
2. 主訴應該反映口腔癌手術後病人的實際感受和困擾
3. 要考慮手術後的特殊情況，如皮瓣重建、傷口癒合等
4. 主訴要具體且真實，避免過於專業的醫學術語
5. 返回JSON格式

症狀類型：${symptomName}

請返回以下JSON格式：
{
  "options": [
    {
      "id": "complaint_1",
      "title": "主訴1",
      "description": "詳細描述這個主訴的具體情況"
    },
    {
      "id": "complaint_2", 
      "title": "主訴2",
      "description": "詳細描述這個主訴的具體情況"
    },
    {
      "id": "complaint_3",
      "title": "主訴3",
      "description": "詳細描述這個主訴的具體情況"
    }
  ]
}

注意：
- 要從病人的角度出發，模擬真實的主訴表達
- 要考慮口腔癌手術後的特殊情況
- 主訴要具體且真實，避免過於專業的醫學術語
- 要反映病人對症狀的實際感受和困擾
- 考慮手術後恢復期的特殊需求
`;
    }
  }

  // 解析API響應
  parseResponse(data) {
    try {
      const text = data.candidates[0].content.parts[0].text;
      console.log('AI原始響應:', text);
      
      // 嘗試提取JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('解析後的JSON:', parsed);
        return parsed;
      }
      // 如果無法解析JSON，返回預設結構
      throw new Error('無法解析AI響應');
    } catch (error) {
      console.error('解析AI響應失敗:', error);
      throw new Error('AI響應格式錯誤');
    }
  }
}

const googleAiService = new GoogleAiService();
export default googleAiService; 