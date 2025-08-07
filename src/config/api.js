// API配置文件
// 在實際部署時，請將API key設置為環境變數

const API_CONFIG = {
  // Google AI Studio API設置
  GOOGLE_AI: {
    endpoint: process.env.REACT_APP_GOOGLE_AI_ENDPOINT || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    apiKey: process.env.REACT_APP_GOOGLE_AI_API_KEY || '',
    model: 'gemini-pro'
  },
  
  // 備用API設置
  FALLBACK: {
    enabled: true,
    timeout: 5000
  }
};

// 安全地獲取API key
export const getApiKey = () => {
  // 在開發環境中，可以從localStorage獲取（僅用於測試）
  if (process.env.NODE_ENV === 'development') {
    const localKey = localStorage.getItem('google_ai_api_key');
    console.log('從localStorage獲取API key:', localKey ? '已設置' : '未設置');
    return localKey || API_CONFIG.GOOGLE_AI.apiKey;
  }
  return API_CONFIG.GOOGLE_AI.apiKey;
};

// 設置API key（僅用於開發環境）
export const setApiKey = (apiKey) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('設置API key到localStorage');
    localStorage.setItem('google_ai_api_key', apiKey);
  }
};

export default API_CONFIG; 