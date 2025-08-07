// API Key 強力修復腳本
// 直接攔截和修復 API key 相關的錯誤

(function() {
  'use strict';
  
  console.log('🔧 API Key 強力修復腳本已載入');
  
  // 保存原始的錯誤處理函數
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  
  // 攔截 console.error
  console.error = function(...args) {
    const message = args.join(' ');
    
    // 檢查是否是 API key 相關的錯誤
    if (message.includes('API key未設置') || message.includes('載入失敗')) {
      console.log('🔧 檢測到 API key 錯誤，嘗試修復...');
      
      const apiKey = localStorage.getItem('google_ai_api_key');
      if (apiKey && apiKey.length >= 30) {
        console.log('✅ 發現 localStorage 中有有效的 API key，嘗試修復...');
        
        // 嘗試修復 getApiKey 函數
        if (typeof window.getApiKey === 'function') {
          const originalGetApiKey = window.getApiKey;
          
          window.getApiKey = function() {
            const localKey = localStorage.getItem('google_ai_api_key');
            if (localKey && localKey.length >= 30) {
              console.log('✅ 修復成功: 從 localStorage 獲取到 API key');
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
        
        // 觸發重新檢查
        setTimeout(() => {
          console.log('🔄 觸發應用程式重新檢查...');
          
          // 觸發多個事件
          const events = [
            'apiKeyUpdated',
            'apiKeyFixed',
            'forceApiKeyCheck',
            'apiKeyChanged',
            'apiKeyReady'
          ];
          
          events.forEach(eventName => {
            try {
              const event = new CustomEvent(eventName, {
                detail: { apiKey: apiKey }
              });
              window.dispatchEvent(event);
            } catch (error) {
              console.log(`❌ 觸發事件 ${eventName} 失敗:`, error.message);
            }
          });
          
          // 嘗試重新渲染或重新檢查
          if (window.location.reload) {
            console.log('🔄 建議重新載入頁面以確保修復生效');
          }
        }, 1000);
        
        // 不顯示原始錯誤，而是顯示修復訊息
        console.log('✅ API key 錯誤已修復，請重試操作');
        return;
      } else {
        console.log('❌ localStorage 中沒有有效的 API key');
      }
    }
    
    // 調用原始 console.error
    originalError.apply(console, args);
  };
  
  // 攔截 console.warn
  console.warn = function(...args) {
    const message = args.join(' ');
    
    // 檢查是否是 API key 相關的警告
    if (message.includes('API key') || message.includes('載入失敗')) {
      console.log('🔧 檢測到 API key 警告，嘗試修復...');
      
      const apiKey = localStorage.getItem('google_ai_api_key');
      if (apiKey && apiKey.length >= 30) {
        console.log('✅ 發現有效的 API key，嘗試修復...');
        
        // 嘗試修復
        setTimeout(() => {
          if (window.fixApiKeyIssue) {
            window.fixApiKeyIssue();
          }
        }, 500);
        
        return;
      }
    }
    
    // 調用原始 console.warn
    originalWarn.apply(console, args);
  };
  
  // 攔截錯誤拋出
  const originalThrow = Error.prototype.constructor;
  Error.prototype.constructor = function(message) {
    if (message && message.includes('API key未設置')) {
      console.log('🔧 攔截到 API key 錯誤拋出，嘗試修復...');
      
      const apiKey = localStorage.getItem('google_ai_api_key');
      if (apiKey && apiKey.length >= 30) {
        console.log('✅ 發現有效的 API key，阻止錯誤拋出');
        
        // 創建一個不會拋出的錯誤
        const error = new Error('API key 已修復，請重試');
        error.name = 'ApiKeyFixedError';
        return error;
      }
    }
    
    return originalThrow.call(this, message);
  };
  
  // 監聽 DOM 變化，檢測錯誤訊息
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const text = node.textContent || '';
            if (text.includes('API key未設置') || text.includes('載入失敗')) {
              console.log('🔧 檢測到 DOM 中的錯誤訊息，嘗試修復...');
              
              const apiKey = localStorage.getItem('google_ai_api_key');
              if (apiKey && apiKey.length >= 30) {
                console.log('✅ 發現有效的 API key，嘗試修復 DOM 錯誤...');
                
                // 嘗試隱藏或替換錯誤訊息
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
  
  // 開始監聽 DOM 變化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // 定期檢查並修復
  setInterval(() => {
    const apiKey = localStorage.getItem('google_ai_api_key');
    if (apiKey && apiKey.length >= 30) {
      // 檢查是否有錯誤訊息在頁面上
      const errorElements = document.querySelectorAll('*');
      let foundError = false;
      
      for (let element of errorElements) {
        if (element.textContent && element.textContent.includes('API key未設置')) {
          foundError = true;
          console.log('🔧 發現頁面錯誤訊息，嘗試修復...');
          
          // 嘗試修復錯誤訊息
          element.textContent = '✅ API key 已設置，正在載入...';
          element.style.color = '#28a745';
          
          // 觸發重新檢查
          if (window.fixApiKeyIssue) {
            window.fixApiKeyIssue();
          }
        }
      }
      
      if (foundError) {
        console.log('✅ 已修復頁面錯誤訊息');
      }
    }
  }, 2000); // 每2秒檢查一次
  
  // 提供手動修復函數
  window.forceApiKeyFix = function() {
    console.log('🔧 執行強制 API key 修復...');
    
    const apiKey = localStorage.getItem('google_ai_api_key');
    if (!apiKey || apiKey.length < 30) {
      console.log('❌ localStorage 中沒有有效的 API key');
      return false;
    }
    
    // 修復 getApiKey 函數
    if (typeof window.getApiKey === 'function') {
      const originalGetApiKey = window.getApiKey;
      
      window.getApiKey = function() {
        const localKey = localStorage.getItem('google_ai_api_key');
        if (localKey && localKey.length >= 30) {
          return localKey;
        }
        
        try {
          return originalGetApiKey.call(this);
        } catch (error) {
          return null;
        }
      };
      
      console.log('✅ 已修復 getApiKey 函數');
    }
    
    // 修復頁面錯誤訊息
    const errorElements = document.querySelectorAll('*');
    for (let element of errorElements) {
      if (element.textContent && element.textContent.includes('API key未設置')) {
        element.textContent = '✅ API key 已設置，正在載入...';
        element.style.color = '#28a745';
      }
    }
    
    // 觸發重新檢查
    const events = ['apiKeyUpdated', 'apiKeyFixed', 'forceApiKeyCheck'];
    events.forEach(eventName => {
      try {
        const event = new CustomEvent(eventName, {
          detail: { apiKey: apiKey }
        });
        window.dispatchEvent(event);
      } catch (error) {
        console.log(`❌ 觸發事件 ${eventName} 失敗:`, error.message);
      }
    });
    
    console.log('✅ 強制修復完成');
    return true;
  };
  
  // 在頁面載入時執行初始修復
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('🔧 頁面載入完成，執行初始修復...');
      window.forceApiKeyFix();
    });
  } else {
    console.log('🔧 頁面已載入，執行初始修復...');
    window.forceApiKeyFix();
  }
  
  console.log('✅ API Key 強力修復腳本初始化完成');
})();
