# 口腔手術術後病人主訴表達系統

這是一個專為口腔手術術後病人設計的主訴表達系統，幫助病人更準確地描述他們的症狀和不適。

## 🚀 快速試用

### 線上試用版本
- **GitHub Pages**: [點擊這裡試用](https://[your-username].github.io/oral-surgery-app/)
- **本地運行**: 按照下方安裝步驟

### 功能演示
- 🏥 專業的醫療症狀評估
- 🤖 AI輔助症狀分析  
- 📱 直觀易用的界面
- 🔄 多層次症狀評估
- 📊 詳細的症狀總結

## 📦 安裝和運行

### 前置要求
- Node.js (版本 14 或更高)
- npm 或 yarn
- Git

### 本地安裝步驟

1. **克隆項目**
```bash
git clone https://github.com/[your-username]/oral-surgery-app.git
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

## 🔧 API設置說明

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

3. **或者設置環境變數**
   ```bash
   # 創建 .env.local 文件
   echo "REACT_APP_GOOGLE_AI_API_KEY=your-api-key-here" > .env.local
   ```

### 關於API過載問題

如果遇到"AI服務暫時過載"的錯誤，這可能是由於：

1. **API調用頻率過高**：系統會自動限制API調用次數（最多10次）
2. **Google AI服務暫時不可用**：這是正常的服務波動
3. **網絡連接問題**：檢查網絡連接

#### 解決方案：

- **等待重試**：系統會自動重試失敗的請求
- **使用預設選項**：當API不可用時，系統會自動使用預設的症狀選項
- **重置應用程序**：點擊"重新開始"按鈕重置API調用計數器

## 📖 使用說明

### 基本使用流程

1. **選擇主訴**：點擊最符合您症狀的選項
2. **精細評估**：根據AI建議選擇更詳細的症狀描述
3. **查看總結**：系統會顯示您的症狀評估總結
4. **重新開始**：完成後可以重新開始新的評估

### 症狀類型

系統支援以下症狀類型：
- 疼痛 (Pain)
- 腫脹 (Swelling)
- 出血 (Bleeding)
- 感染 (Infection)
- 功能障礙 (Functional Issues)
- 其他症狀 (Other Symptoms)

## 🛠️ 技術架構

### 前端技術
- **框架**: React 18
- **樣式**: Styled Components
- **圖標**: Lucide React
- **AI服務**: Google AI Studio (Gemini)

### 項目結構
```
src/
├── components/     # React組件
│   └── ApiKeySetup.js
├── config/        # 配置文件
│   └── api.js
├── services/      # API服務
│   └── googleAiService.js
├── App.js         # 主應用程序
└── index.js       # 入口文件
```

## 🚀 部署到 GitHub Pages

### 自動部署

1. **推送到 GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **設置 GitHub Pages**
   - 進入 GitHub 倉庫設置
   - 找到 "Pages" 選項
   - 選擇 "Deploy from a branch"
   - 選擇 `gh-pages` 分支

3. **部署命令**
```bash
npm run deploy
```

### 手動部署

如果您想要手動部署：

```bash
# 構建生產版本
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 🔧 開發說明

### 添加新的症狀類型

1. 在 `symptoms` 數組中添加新的症狀定義
2. 在 `getDefaultOptions` 和 `getDefaultSubOptions` 中添加對應的預設選項
3. 更新AI提示詞以支持新的症狀類型

### 本地開發

```bash
# 啟動開發服務器
npm start

# 運行測試
npm test

# 構建生產版本
npm run build
```

## 🐛 故障排除

### 常見問題

1. **應用程序一直重新啟動**
   - 原因：API調用過於頻繁
   - 解決：等待幾分鐘後重試，或使用預設選項

2. **API服務不可用**
   - 原因：Google AI服務暫時過載
   - 解決：系統會自動使用預設選項

3. **界面無響應**
   - 原因：正在處理API請求
   - 解決：等待載入完成

4. **GitHub Pages 無法訪問**
   - 檢查倉庫設置中的 Pages 配置
   - 確保 `gh-pages` 分支存在
   - 等待部署完成（可能需要幾分鐘）

## 📄 授權

本項目僅供醫療教育目的使用，不應替代專業醫療建議。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改進這個項目！

### 貢獻指南

1. Fork 這個項目
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 📞 聯繫方式

如果您有任何問題或建議，請：
- 提交 GitHub Issue
- 發送郵件到：[your-email@example.com]

---

**注意**: 這是一個醫療教育工具，不應替代專業醫療建議。如有醫療問題，請諮詢專業醫生。 