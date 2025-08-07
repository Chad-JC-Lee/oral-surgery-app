// API Key 修復腳本
// 直接修復應用程式的 API key 檢查問題

(function() {
  'use strict';
  
  console.log('🔧 API Key 修復腳本已載入');
  
  // 等待應用程式載入完成
  function waitForApp() {
    return new Promise((resolve) => {
      const checkApp = () => {
        // 檢查應用程式是否已載入
        if (window.getApiKey || document.querySelector('#root')) {
          resolve();
        } else {
          setTimeout(checkApp, 100);
        }
      };
      checkApp();
    });
  }
  
  // 修復 API key 檢查邏輯
  async function fixApiKeyCheck() {
    await waitForApp();
    
    console.log('🔧 開始修復 API key 檢查邏輯');
    
    // 方法1: 直接覆蓋 getApiKey 函數
    if (typeof window.getApiKey === 'function') {
      const originalGetApiKey = window.getApiKey;
      
      window.getApiKey = function() {
        // 優先從 localStorage 獲取
        const localKey = localStorage.getItem('google_ai_api_key');
        if (localKey && localKey.length >= 30) {
          console.log('✅ 修復: 從 localStorage 獲取到 API key');
          return localKey;
        }
        
        // 如果 localStorage 中沒有，使用原始函數
        const originalKey = originalGetApiKey.call(this);
        if (originalKey) {
          console.log('✅ 修復: 從原始函數獲取到 API key');
          return originalKey;
        }
        
        console.log('❌ 修復: 未找到有效的 API key');
        return null;
      };
      
      console.log('✅ 已修復 getApiKey 函數');
    }
    
    // 方法2: 監聽並修復錯誤訊息
    const originalConsoleError = console.error;
    console.error = function(...args) {
      const message = args.join(' ');
      
      // 檢查是否是 API key 相關的錯誤
      if (message.includes('API key未設置') || message.includes('載入失敗')) {
        const apiKey = localStorage.getItem('google_ai_api_key');
        if (apiKey && apiKey.length >= 30) {
          console.log('🔧 檢測到 API key 錯誤，但 localStorage 中有有效的 key');
          console.log('🔧 嘗試重新觸發應用程式檢查...');
          
          // 觸發一個自定義事件
          setTimeout(() => {
            const event = new CustomEvent('apiKeyFixed', {
              detail: { apiKey: apiKey }
            });
            window.dispatchEvent(event);
          }, 1000);
        }
      }
      
      // 調用原始 console.error
      originalConsoleError.apply(console, args);
    };
    
    // 方法3: 定期檢查並修復
    setInterval(() => {
      const apiKey = localStorage.getItem('google_ai_api_key');
      if (apiKey && apiKey.length >= 30) {
        // 檢查應用程式是否正確識別了 API key
        const appApiKey = window.getApiKey ? window.getApiKey() : null;
        
        if (!appApiKey && apiKey) {
          console.log('🔧 檢測到應用程式未正確識別 API key，嘗試修復...');
          
          // 觸發重新檢查
          const event = new CustomEvent('forceApiKeyCheck', {
            detail: { apiKey: apiKey }
          });
          window.dispatchEvent(event);
        }
      }
    }, 3000); // 每3秒檢查一次
    
    // 方法4: 提供手動修復函數
    window.fixApiKeyIssue = function() {
      const apiKey = localStorage.getItem('google_ai_api_key');
      if (apiKey && apiKey.length >= 30) {
        console.log('🔧 手動修復: 強制設置 API key');
        
        // 觸發多個事件來確保應用程式能接收到
        const events = [
          'apiKeyUpdated',
          'apiKeyFixed', 
          'forceApiKeyCheck',
          'apiKeyChanged'
        ];
        
        events.forEach(eventName => {
          const event = new CustomEvent(eventName, {
            detail: { apiKey: apiKey }
          });
          window.dispatchEvent(event);
        });
        
        return true;
      } else {
        console.log('❌ 手動修復失敗: localStorage 中沒有有效的 API key');
        return false;
      }
    };
    
    // 方法5: 監聽頁面點擊，在用戶操作時嘗試修復
    document.addEventListener('click', function() {
      setTimeout(() => {
        const apiKey = localStorage.getItem('google_ai_api_key');
        if (apiKey && apiKey.length >= 30) {
          // 檢查是否有錯誤訊息
          const errorElements = document.querySelectorAll('*');
          for (let element of errorElements) {
            if (element.textContent && element.textContent.includes('API key未設置')) {
              console.log('🔧 檢測到錯誤訊息，嘗試修復...');
              window.fixApiKeyIssue();
              break;
            }
          }
        }
      }, 500);
    });
    
    console.log('✅ API Key 修復腳本初始化完成');
  }
  
  // 在頁面載入時執行修復
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixApiKeyCheck);
  } else {
    fixApiKeyCheck();
  }
  
  // 提供全局修復函數
  window.apiKeyFix = {
    fix: function() {
      return window.fixApiKeyIssue ? window.fixApiKeyIssue() : false;
    },
    check: function() {
      const apiKey = localStorage.getItem('google_ai_api_key');
      return apiKey && apiKey.length >= 30;
    },
    get: function() {
      return localStorage.getItem('google_ai_api_key');
    }
  };
  
  console.log('✅ API Key 修復腳本載入完成');
})();
