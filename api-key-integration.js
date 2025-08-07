// API Key 整合腳本
// 確保現有應用程式能夠正確讀取 localStorage 中的 API key

(function() {
  'use strict';
  
  console.log('🔧 API Key 整合腳本已載入');
  
  // 保存原始的 getApiKey 函數（如果存在）
  const originalGetApiKey = window.getApiKey;
  
  // 創建新的 getApiKey 函數
  window.getApiKey = function() {
    // 首先嘗試從 localStorage 獲取
    const localKey = localStorage.getItem('google_ai_api_key');
    
    if (localKey && localKey.length >= 30) {
      console.log('✅ 從 localStorage 獲取到 API key');
      return localKey;
    }
    
    // 如果 localStorage 中沒有，嘗試使用原始函數
    if (originalGetApiKey) {
      const originalKey = originalGetApiKey();
      if (originalKey) {
        console.log('✅ 從原始函數獲取到 API key');
        return originalKey;
      }
    }
    
    // 如果都沒有，返回 null
    console.log('❌ 未找到有效的 API key');
    return null;
  };
  
  // 創建 setApiKey 函數
  window.setApiKey = function(apiKey) {
    if (apiKey && apiKey.length >= 30) {
      localStorage.setItem('google_ai_api_key', apiKey);
      console.log('✅ API key 已保存到 localStorage');
      return true;
    } else {
      console.log('❌ API key 格式不正確');
      return false;
    }
  };
  
  // 創建檢查 API key 是否有效的函數
  window.isApiKeyValid = function() {
    const apiKey = window.getApiKey();
    return apiKey && apiKey.length >= 30;
  };
  
  // 監聽 API key 變化
  function checkApiKeyStatus() {
    const isValid = window.isApiKeyValid();
    console.log(`🔍 API key 狀態檢查: ${isValid ? '有效' : '無效'}`);
    
    // 如果 API key 有效，嘗試觸發應用程式的重新檢查
    if (isValid) {
      // 嘗試觸發一個自定義事件，讓應用程式知道 API key 已更新
      const event = new CustomEvent('apiKeyUpdated', {
        detail: { apiKey: window.getApiKey() }
      });
      window.dispatchEvent(event);
    }
  }
  
  // 定期檢查 API key 狀態
  setInterval(checkApiKeyStatus, 5000); // 每5秒檢查一次
  
  // 監聽 localStorage 變化
  window.addEventListener('storage', function(e) {
    if (e.key === 'google_ai_api_key') {
      console.log('🔄 localStorage 中的 API key 已更新');
      checkApiKeyStatus();
    }
  });
  
  // 在頁面載入時檢查一次
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkApiKeyStatus);
  } else {
    checkApiKeyStatus();
  }
  
  // 提供一個手動觸發檢查的函數
  window.refreshApiKeyStatus = function() {
    checkApiKeyStatus();
  };
  
  console.log('✅ API Key 整合腳本初始化完成');
})();
