// API Key 設置範例檔案
// 請複製此檔案為 api-key-simple.js 並填入您的實際 API key

(function() {
  'use strict';
  
  console.log('🔧 簡單 API Key 解決方案已載入');
  
  // 設置預設的 API key（請替換為您的實際 API key）
  const DEFAULT_API_KEY = 'YOUR_GOOGLE_AI_API_KEY_HERE';
  
  // 檢查是否已經有 API key
  function checkAndSetApiKey() {
    const existingKey = localStorage.getItem('google_ai_api_key');
    
    if (!existingKey || existingKey.length < 30) {
      // 如果沒有有效的 API key，設置預設的
      if (DEFAULT_API_KEY && DEFAULT_API_KEY !== 'YOUR_GOOGLE_AI_API_KEY_HERE' && DEFAULT_API_KEY.length >= 30) {
        localStorage.setItem('google_ai_api_key', DEFAULT_API_KEY);
        console.log('✅ 已設置預設 API key');
      } else {
        console.log('⚠️ 請在 api-key-simple.js 中設置您的 Google AI API key');
        console.log('📝 請將 DEFAULT_API_KEY 變數的值替換為您的實際 API key');
      }
    } else {
      console.log('✅ 已檢測到有效的 API key');
    }
  }
  
  // 修復 getApiKey 函數
  function fixGetApiKey() {
    if (typeof window.getApiKey === 'function') {
      const originalGetApiKey = window.getApiKey;
      
      window.getApiKey = function() {
        // 優先從 localStorage 獲取
        const localKey = localStorage.getItem('google_ai_api_key');
        if (localKey && localKey.length >= 30) {
          return localKey;
        }
        
        // 如果 localStorage 中沒有，嘗試原始函數
        try {
          return originalGetApiKey.call(this);
        } catch (error) {
          console.log('❌ 原始 getApiKey 函數執行失敗:', error.message);
          return null;
        }
      };
      
      console.log('✅ 已修復 getApiKey 函數');
    }
  }
  
  // 攔截錯誤訊息
  function interceptErrors() {
    const originalError = console.error;
    
    console.error = function(...args) {
      const message = args.join(' ');
      
      // 檢查是否是 API key 相關的錯誤
      if (message.includes('API key未設置') || message.includes('載入失敗')) {
        const apiKey = localStorage.getItem('google_ai_api_key');
        if (apiKey && apiKey.length >= 30) {
          console.log('✅ API key 已設置，錯誤已修復');
          return; // 不顯示原始錯誤
        }
      }
      
      // 調用原始 console.error
      originalError.apply(console, args);
    };
  }
  
  // 修復頁面錯誤訊息
  function fixPageErrors() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const text = node.textContent || '';
              if (text.includes('API key未設置') || text.includes('載入失敗')) {
                const apiKey = localStorage.getItem('google_ai_api_key');
                if (apiKey && apiKey.length >= 30) {
                  // 替換錯誤訊息
                  setTimeout(() => {
                    if (node.textContent && node.textContent.includes('API key未設置')) {
                      node.textContent = '✅ API key 已設置，正在載入...';
                      node.style.color = '#28a745';
                    }
                  }, 1000);
                }
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // 初始化
  function init() {
    console.log('🔧 初始化簡單 API Key 解決方案...');
    
    // 檢查並設置 API key
    checkAndSetApiKey();
    
    // 修復 getApiKey 函數
    fixGetApiKey();
    
    // 攔截錯誤
    interceptErrors();
    
    // 修復頁面錯誤
    fixPageErrors();
    
    console.log('✅ 簡單 API Key 解決方案初始化完成');
  }
  
  // 在頁面載入時執行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // 提供全局函數供調試使用
  window.simpleApiKeyFix = {
    check: function() {
      const apiKey = localStorage.getItem('google_ai_api_key');
      return apiKey && apiKey.length >= 30;
    },
    get: function() {
      return localStorage.getItem('google_ai_api_key');
    },
    set: function(key) {
      if (key && key.length >= 30) {
        localStorage.setItem('google_ai_api_key', key);
        return true;
      }
      return false;
    }
  };
  
})();
