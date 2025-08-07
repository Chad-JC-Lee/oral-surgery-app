# API Key 設置說明

## 🚀 快速設置

### 1. 獲取 Google AI API Key

1. 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登入您的 Google 帳戶
3. 點擊 "Create API Key"
4. 複製生成的 API Key

### 2. 設置 API Key

編輯 `api-key-simple.js` 檔案，將第 8 行的 `DEFAULT_API_KEY` 替換為您的實際 API key：

```javascript
const DEFAULT_API_KEY = '您的實際API_KEY_在這裡';
```

### 3. 測試

1. 保存檔案
2. 重新載入頁面
3. 測試 AI 功能是否正常工作

## 📝 詳細說明

### 檔案結構

- `api-key-simple.js` - 簡單的 API key 解決方案
- `index.html` - 主應用程式頁面
- `SETUP.md` - 設置說明（本檔案）

### 功能特點

- ✅ 自動設置 API key
- ✅ 修復應用程式的 API key 檢查
- ✅ 攔截並修復錯誤訊息
- ✅ 用戶無需手動設置
- ✅ 簡單易用

### 調試

如果遇到問題，可以在瀏覽器控制台中執行：

```javascript
// 檢查 API key 狀態
window.simpleApiKeyFix.check()

// 獲取當前 API key
window.simpleApiKeyFix.get()

// 手動設置 API key
window.simpleApiKeyFix.set('your-api-key-here')
```

## 🔒 安全性

- API key 僅存儲在瀏覽器本地
- 不會發送到任何服務器
- 建議定期更換 API key

## 🆘 故障排除

1. **檢查 API key 格式**：確保 API key 至少 30 個字符
2. **檢查控制台**：查看是否有錯誤訊息
3. **重新載入頁面**：確保設置生效
4. **清除快取**：如果問題持續存在

---

**注意**：請勿在公開場合分享您的 API key！
