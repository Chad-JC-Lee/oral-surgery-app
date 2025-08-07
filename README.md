# 口腔手術術後病人主訴表達系統

這是一個專為口腔手術術後病人設計的主訴表達系統，幫助病人更準確地描述他們的症狀和不適。

## 🚀 快速試用

### 線上試用版本
- **GitHub Pages**: [點擊這裡試用](https://chad-jc-lee.github.io/oral-surgery-app/)
- **本地運行**: 按照下方安裝步驟

### 功能演示
- 🏥 專業的醫療症狀評估
- 🤖 AI輔助症狀分析  
- 📱 直觀易用的界面
- 🔄 多層次症狀評估
- 📊 詳細的症狀總結

## 🔑 API Key 設置

### 方法 1: 通過應用程式界面（推薦）

1. **訪問應用程式**：
   https://chad-jc-lee.github.io/oral-surgery-app/

2. **自動檢測**：
   - 應用程式會自動檢測是否已設置 API key
   - 如果沒有設置，會顯示設置界面

3. **輸入 API Key**：
   - 在設置界面中輸入您的 Google AI API key
   - 點擊保存即可開始使用

### 方法 2: 通過瀏覽器控制台

1. **打開開發者工具**：
   - 按 F12 或右鍵選擇 "檢查"

2. **在控制台中輸入**：
   ```javascript
   localStorage.setItem('google_ai_api_key', '您的API_KEY');
   ```

3. **刷新頁面**：
   - 重新載入頁面即可使用

### 獲取 Google AI API Key

1. **訪問 Google AI Studio**：
   - 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)

2. **創建 API Key**：
   - 登入您的 Google 帳戶
   - 點擊 "Create API Key"
   - 複製生成的 API Key

3. **安全注意事項**：
   - 請勿在公開場合分享您的 API Key
   - 定期更換 API Key 以確保安全
   - 本應用程式不會將您的 API Key 發送到任何服務器

## 📦 安裝和運行

### 前置要求
- Node.js (版本 14 或更高)
- npm 或 yarn
- Git

### 本地安裝步驟

1. **克隆項目**
```bash
git clone https://github.com/Chad-JC-Lee/oral-surgery-app.git
cd oral-surgery-app
```

2. **安裝依賴**
```bash
npm install
```

3. **啟動開發服務器**
```bash
npm start
```

4. **打開瀏覽器**
訪問 `http://localhost:3000` 開始使用

## 🔧 本地開發 API設置說明

### Google AI API設置（可選）

如果您想要使用AI功能，需要設置Google AI API：

1. **獲取API Key**
   - 訪問 [Google AI Studio](https://makersuite.google.com/app/apikey)
   - 創建一個新的API Key

2. **設置API Key**
   ```javascript
   // 在瀏覽器控制台中運行
   localStorage.setItem('google_ai_api_key', 'your-api-key-here');
   ```

3. **或者創建 .env 文件**
   ```bash
   echo "REACT_APP_GOOGLE_AI_API_KEY=your-api-key-here" > .env
   ```

## 🏥 功能特色

### 症狀評估
- 多層次症狀選擇
- 疼痛程度評估
- 時間軸症狀記錄
- 症狀嚴重程度分析

### AI 輔助分析
- 智能症狀分析
- 專業醫療建議
- 症狀總結報告
- 後續追蹤建議

### 用戶體驗
- 直觀易用的界面
- 響應式設計
- 多語言支持
- 無需註冊即可使用

## 📊 使用流程

1. **開始評估**
   - 點擊 "開始症狀評估"
   - 選擇手術類型

2. **症狀描述**
   - 選擇相關症狀
   - 評估疼痛程度
   - 描述症狀時間

3. **AI 分析**
   - 獲取智能分析結果
   - 查看專業建議
   - 生成症狀報告

4. **保存結果**
   - 下載症狀報告
   - 分享給醫生
   - 追蹤症狀變化

## 🔒 隱私與安全

- ✅ 所有數據僅存儲在本地
- ✅ 不會向任何服務器發送個人信息
- ✅ API Key 僅存儲在瀏覽器本地
- ✅ 無需註冊或登入
- ✅ 完全開源，可審查代碼

## 🤝 貢獻

歡迎貢獻代碼或提出建議！

1. Fork 這個項目
2. 創建功能分支
3. 提交更改
4. 發起 Pull Request

## 📄 授權

本項目採用 MIT 授權 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 📞 支持

如果您遇到問題或有建議，請：

1. 查看 [Issues](https://github.com/Chad-JC-Lee/oral-surgery-app/issues)
2. 創建新的 Issue
3. 聯繫開發團隊

## 🆕 更新日誌

### v1.0.0
- 初始版本發布
- 基本症狀評估功能
- AI 輔助分析
- 響應式設計
- GitHub Pages 部署

---

**注意**：本應用程式僅供參考，不能替代專業醫療建議。如有醫療問題，請諮詢專業醫生。 