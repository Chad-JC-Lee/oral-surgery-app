# 口腔手術後症狀評估系統

## 🔑 API Key 設置

### 🚀 快速設置

本系統使用簡化的 API Key 設置方案，用戶無需手動設置。

#### 開發者設置

1. **獲取 Google AI API Key**：
   - 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)
   - 登入您的 Google 帳戶
   - 點擊 "Create API Key"
   - 複製生成的 API Key

2. **設置 API Key**：
   - 編輯 `api-key-simple.js` 檔案
   - 將第 8 行的 `DEFAULT_API_KEY` 替換為您的實際 API key：
   ```javascript
   const DEFAULT_API_KEY = '您的實際API_KEY_在這裡';
   ```

3. **測試功能**：
   - 保存檔案
   - 重新載入頁面
   - 測試 AI 功能是否正常工作

### 🔒 安全性保護

- ✅ API key 已加入 `.gitignore`，不會被提交到 GitHub
- ✅ 提供範例檔案 `api-key-simple.example.js`
- ✅ API key 僅存儲在瀏覽器本地
- ✅ 不會發送到任何服務器

### 📁 檔案結構

```
oral_surgery_app/
├── api-key-simple.js          # 實際的 API key 檔案（已加入 .gitignore）
├── api-key-simple.example.js  # 範例檔案（可提交到 GitHub）
├── .gitignore                 # Git 忽略檔案
├── index.html                 # 主應用程式
└── SETUP.md                  # 設置說明
```

### 🧪 調試功能

在瀏覽器控制台中可以使用以下函數：

```javascript
// 檢查 API key 狀態
window.simpleApiKeyFix.check()

// 獲取當前 API key
window.simpleApiKeyFix.get()

// 手動設置 API key
window.simpleApiKeyFix.set('your-api-key-here')
```

### 🔧 功能特點

- ✅ 自動設置 API key
- ✅ 修復應用程式的 API key 檢查
- ✅ 攔截並修復錯誤訊息
- ✅ 用戶無需手動設置
- ✅ 簡單易用

### 🆘 故障排除

1. **檢查 API key 格式**：確保 API key 至少 30 個字符
2. **檢查控制台**：查看是否有錯誤訊息
3. **重新載入頁面**：確保設置生效
4. **清除快取**：如果問題持續存在

### 📞 支援

如果您在使用過程中遇到任何問題，請：

1. 檢查瀏覽器控制台是否有錯誤訊息
2. 確認 API key 格式是否正確
3. 嘗試清除瀏覽器快取後重新載入

---

**版本**：v1.0.0  
**更新日期**：2024年8月7日  
**支援瀏覽器**：Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

**注意**：請勿在公開場合分享您的 API key！
