# 貢獻指南

感謝您對口腔手術術後病人主訴表達系統的關注！我們歡迎所有形式的貢獻。

## 如何貢獻

### 報告 Bug

如果您發現了 Bug，請：

1. 檢查是否已經有相關的 Issue
2. 創建新的 Issue，並包含：
   - 詳細的 Bug 描述
   - 重現步驟
   - 預期行為和實際行為
   - 瀏覽器和操作系統信息

### 功能建議

如果您有新功能建議：

1. 檢查是否已經有相關的 Issue
2. 創建新的 Issue，並包含：
   - 功能描述
   - 使用場景
   - 預期效果

### 代碼貢獻

#### 開發環境設置

1. Fork 這個項目
2. 克隆您的 Fork：
   ```bash
   git clone https://github.com/[your-username]/oral-surgery-app.git
   cd oral-surgery-app
   ```
3. 安裝依賴：
   ```bash
   npm install
   ```
4. 啟動開發服務器：
   ```bash
   npm start
   ```

#### 提交更改

1. 創建功能分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. 進行更改並測試
3. 提交更改：
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
4. 推送到您的 Fork：
   ```bash
   git push origin feature/your-feature-name
   ```
5. 創建 Pull Request

#### 代碼規範

- 使用有意義的變量名和函數名
- 添加適當的註釋
- 確保代碼通過 ESLint 檢查
- 編寫測試（如果適用）

#### 提交信息規範

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

- `feat:` 新功能
- `fix:` Bug 修復
- `docs:` 文檔更新
- `style:` 代碼格式調整
- `refactor:` 代碼重構
- `test:` 測試相關
- `chore:` 構建過程或輔助工具的變動

## 醫療相關貢獻

由於這是一個醫療相關的應用程序，請注意：

1. **醫療準確性**：所有醫療相關的內容必須準確
2. **專業審查**：重大醫療內容更改需要專業醫療人員審查
3. **免責聲明**：確保所有更改都包含適當的醫療免責聲明

## 社區準則

- 尊重所有貢獻者
- 保持專業和友善的交流
- 提供建設性的反饋
- 遵守項目授權條款

## 聯繫方式

如果您有任何問題，請：
- 提交 GitHub Issue
- 發送郵件到：[your-email@example.com]

感謝您的貢獻！
