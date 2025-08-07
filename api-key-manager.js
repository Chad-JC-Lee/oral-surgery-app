// API Key 管理工具
class ApiKeyManager {
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
    return apiKey && apiKey.length >= 30;
  }

  // 創建管理按鈕
  createManagerButton() {
    const button = document.createElement('button');
    button.innerHTML = '🔑 API 設置';
    button.id = 'api-key-manager-btn';
    button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      z-index: 1000;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.backgroundColor = '#0056b3';
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = '#007bff';
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    });

    button.addEventListener('click', () => {
      this.showManagerModal();
    });

    return button;
  }

  // 顯示管理模態框
  showManagerModal() {
    const modal = document.createElement('div');
    modal.id = 'api-key-manager-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    `;

    const title = document.createElement('h2');
    title.textContent = '🔑 API Key 管理';
    title.style.cssText = `
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
    `;

    // 當前狀態
    const statusSection = document.createElement('div');
    statusSection.style.cssText = `
      margin-bottom: 2rem;
      padding: 1rem;
      border-radius: 8px;
      background: ${this.isApiKeyValid() ? '#d4edda' : '#f8d7da'};
      border: 1px solid ${this.isApiKeyValid() ? '#c3e6cb' : '#f5c6cb'};
    `;

    const statusTitle = document.createElement('h3');
    statusTitle.textContent = '📊 當前狀態';
    statusTitle.style.cssText = `
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      color: ${this.isApiKeyValid() ? '#155724' : '#721c24'};
    `;

    const statusText = document.createElement('p');
    statusText.textContent = this.isApiKeyValid() 
      ? '✅ API Key 已設置且格式正確' 
      : '❌ API Key 未設置或格式不正確';
    statusText.style.cssText = `
      margin: 0;
      color: ${this.isApiKeyValid() ? '#155724' : '#721c24'};
      font-weight: 500;
    `;

    statusSection.appendChild(statusTitle);
    statusSection.appendChild(statusText);

    // API Key 輸入區域
    const inputSection = document.createElement('div');
    inputSection.style.cssText = `
      margin-bottom: 2rem;
    `;

    const inputTitle = document.createElement('h3');
    inputTitle.textContent = '🔧 設置 API Key';
    inputTitle.style.cssText = `
      margin-bottom: 1rem;
      font-size: 1.1rem;
      color: #333;
    `;

    const inputDescription = document.createElement('p');
    inputDescription.innerHTML = `
      請輸入您的 Google AI API Key。<br>
      <a href="https://makersuite.google.com/app/apikey" target="_blank" style="color: #007bff; text-decoration: none;">
        🔗 點擊這裡獲取 API Key
      </a>
    `;
    inputDescription.style.cssText = `
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.6;
    `;

    const inputWrapper = document.createElement('div');
    inputWrapper.style.cssText = `
      position: relative;
      margin-bottom: 1rem;
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

    let isVisible = false;
    toggleButton.addEventListener('click', () => {
      isVisible = !isVisible;
      input.type = isVisible ? 'text' : 'password';
      toggleButton.textContent = isVisible ? '🙈' : '👁️';
    });

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(toggleButton);

    // 按鈕區域
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    `;

    const saveButton = document.createElement('button');
    saveButton.textContent = '💾 保存';
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

    const clearButton = document.createElement('button');
    clearButton.textContent = '🗑️ 清除';
    clearButton.style.cssText = `
      background: #dc3545;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.3s;
    `;

    const closeButton = document.createElement('button');
    closeButton.textContent = '❌ 關閉';
    closeButton.style.cssText = `
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

    // 狀態訊息
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
      margin-top: 1rem;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      display: none;
    `;

    // 按鈕事件
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
      
      // 更新狀態顯示
      setTimeout(() => {
        this.updateStatusDisplay(statusSection, statusTitle, statusText);
      }, 1000);
    });

    clearButton.addEventListener('click', () => {
      if (confirm('確定要清除 API Key 嗎？')) {
        this.saveApiKey('');
        input.value = '';
        this.showMessage(statusMessage, '🗑️ API Key 已清除', 'success');
        
        setTimeout(() => {
          this.updateStatusDisplay(statusSection, statusTitle, statusText);
        }, 1000);
      }
    });

    closeButton.addEventListener('click', () => {
      modal.remove();
    });

    // 組裝內容
    inputSection.appendChild(inputTitle);
    inputSection.appendChild(inputDescription);
    inputSection.appendChild(inputWrapper);
    inputSection.appendChild(statusMessage);

    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(clearButton);
    buttonContainer.appendChild(closeButton);

    content.appendChild(title);
    content.appendChild(statusSection);
    content.appendChild(inputSection);
    content.appendChild(buttonContainer);

    modal.appendChild(content);
    document.body.appendChild(modal);

    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // 更新狀態顯示
  updateStatusDisplay(statusSection, statusTitle, statusText) {
    const isValid = this.isApiKeyValid();
    
    statusSection.style.background = isValid ? '#d4edda' : '#f8d7da';
    statusSection.style.borderColor = isValid ? '#c3e6cb' : '#f5c6cb';
    
    statusTitle.style.color = isValid ? '#155724' : '#721c24';
    statusText.style.color = isValid ? '#155724' : '#721c24';
    
    statusText.textContent = isValid 
      ? '✅ API Key 已設置且格式正確' 
      : '❌ API Key 未設置或格式不正確';
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

  // 檢查 API key 是否有效
  isApiKeyValid() {
    return this.apiKey && this.validateApiKey(this.apiKey);
  }

  // 初始化
  init() {
    // 等待頁面加載完成後添加管理按鈕
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.addManagerButton();
      });
    } else {
      this.addManagerButton();
    }
  }

  // 添加管理按鈕
  addManagerButton() {
    // 檢查是否已存在按鈕
    if (document.getElementById('api-key-manager-btn')) {
      return;
    }

    const button = this.createManagerButton();
    document.body.appendChild(button);
  }
}

// 導出到全局
window.ApiKeyManager = ApiKeyManager;

// 自動初始化
new ApiKeyManager();
