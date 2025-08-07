// API Key 設置組件
class ApiKeySetup {
  constructor() {
    this.apiKey = this.getApiKey();
    this.init();
  }

  // 從 localStorage 獲取 API key
  getApiKey() {
    return localStorage.getItem('google_ai_api_key') || '';
  }

  // 保存 API key 到 localStorage
  saveApiKey(apiKey) {
    localStorage.setItem('google_ai_api_key', apiKey);
    this.apiKey = apiKey;
  }

  // 驗證 API key 格式
  validateApiKey(apiKey) {
    // Google AI API key 通常是 39 個字符的字符串
    return apiKey && apiKey.length >= 30;
  }

  // 創建設置介面
  createSetupInterface() {
    const container = document.createElement('div');
    container.id = 'api-key-setup';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      max-width: 500px;
      width: 90%;
      text-align: center;
    `;

    const title = document.createElement('h2');
    title.textContent = '🔑 Google AI API Key 設置';
    title.style.cssText = `
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
    `;

    const description = document.createElement('p');
    description.innerHTML = `
      為了使用 AI 功能，您需要設置 Google AI API Key。<br>
      <a href="https://makersuite.google.com/app/apikey" target="_blank" style="color: #007bff; text-decoration: none;">
        🔗 點擊這裡獲取 API Key
      </a>
    `;
    description.style.cssText = `
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    `;

    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
      margin-bottom: 1.5rem;
    `;

    const input = document.createElement('input');
    input.type = 'password';
    input.placeholder = '請輸入您的 Google AI API Key';
    input.value = this.apiKey;
    input.style.cssText = `
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s;
      box-sizing: border-box;
    `;

    input.addEventListener('focus', () => {
      input.style.borderColor = '#007bff';
    });

    input.addEventListener('blur', () => {
      input.style.borderColor = '#e1e5e9';
    });

    const toggleButton = document.createElement('button');
    toggleButton.textContent = '👁️';
    toggleButton.style.cssText = `
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: #666;
    `;

    const inputWrapper = document.createElement('div');
    inputWrapper.style.cssText = `
      position: relative;
      margin-bottom: 1rem;
    `;
    inputWrapper.appendChild(input);
    inputWrapper.appendChild(toggleButton);

    let isVisible = false;
    toggleButton.addEventListener('click', () => {
      isVisible = !isVisible;
      input.type = isVisible ? 'text' : 'password';
      toggleButton.textContent = isVisible ? '🙈' : '👁️';
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      gap: 1rem;
      justify-content: center;
    `;

    const saveButton = document.createElement('button');
    saveButton.textContent = '💾 保存設置';
    saveButton.style.cssText = `
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.3s;
    `;

    const skipButton = document.createElement('button');
    skipButton.textContent = '⏭️ 稍後設置';
    skipButton.style.cssText = `
      background: #6c757d;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.3s;
    `;

    saveButton.addEventListener('mouseenter', () => {
      saveButton.style.backgroundColor = '#0056b3';
    });

    saveButton.addEventListener('mouseleave', () => {
      saveButton.style.backgroundColor = '#007bff';
    });

    skipButton.addEventListener('mouseenter', () => {
      skipButton.style.backgroundColor = '#545b62';
    });

    skipButton.addEventListener('mouseleave', () => {
      skipButton.style.backgroundColor = '#6c757d';
    });

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
      margin-top: 1rem;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      display: none;
    `;

    saveButton.addEventListener('click', () => {
      const apiKey = input.value.trim();
      
      if (!apiKey) {
        this.showMessage(statusMessage, '請輸入 API Key', 'error');
        return;
      }

      if (!this.validateApiKey(apiKey)) {
        this.showMessage(statusMessage, 'API Key 格式不正確', 'error');
        return;
      }

      this.saveApiKey(apiKey);
      this.showMessage(statusMessage, '✅ API Key 已成功保存！', 'success');
      
      setTimeout(() => {
        this.hideSetup();
      }, 1500);
    });

    skipButton.addEventListener('click', () => {
      this.hideSetup();
    });

    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(skipButton);

    inputContainer.appendChild(inputWrapper);
    inputContainer.appendChild(statusMessage);

    modal.appendChild(title);
    modal.appendChild(description);
    modal.appendChild(inputContainer);
    modal.appendChild(buttonContainer);

    container.appendChild(modal);
    return container;
  }

  // 顯示訊息
  showMessage(element, message, type) {
    element.textContent = message;
    element.style.display = 'block';
    
    if (type === 'error') {
      element.style.backgroundColor = '#f8d7da';
      element.style.color = '#721c24';
      element.style.border = '1px solid #f5c6cb';
    } else if (type === 'success') {
      element.style.backgroundColor = '#d4edda';
      element.style.color = '#155724';
      element.style.border = '1px solid #c3e6cb';
    }
  }

  // 隱藏設置介面
  hideSetup() {
    const setup = document.getElementById('api-key-setup');
    if (setup) {
      setup.remove();
    }
  }

  // 檢查是否需要顯示設置介面
  shouldShowSetup() {
    return !this.apiKey || this.apiKey.length < 30;
  }

  // 初始化
  init() {
    if (this.shouldShowSetup()) {
      const setupInterface = this.createSetupInterface();
      document.body.appendChild(setupInterface);
    }
  }

  // 獲取當前 API key
  getCurrentApiKey() {
    return this.apiKey;
  }

  // 檢查 API key 是否有效
  isApiKeyValid() {
    return this.apiKey && this.validateApiKey(this.apiKey);
  }
}

// 導出到全局
window.ApiKeySetup = ApiKeySetup;

// 自動初始化
document.addEventListener('DOMContentLoaded', () => {
  new ApiKeySetup();
});
