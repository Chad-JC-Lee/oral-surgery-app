# 🚀 快速開始指南

## 5分鐘內上傳到 GitHub

### 步驟 1: 準備 GitHub 倉庫

1. **創建新倉庫**
   - 訪問 [GitHub](https://github.com)
   - 點擊 "New repository"
   - 倉庫名稱：`oral-surgery-app`
   - 選擇 "Public"
   - 不要初始化 README（我們已經有了）

2. **複製倉庫 URL**
   - 複製：`https://github.com/[your-username]/oral-surgery-app.git`

### 步驟 2: 設置本地倉庫

```bash
# 初始化 Git 倉庫
git init

# 添加遠程倉庫（替換 [your-username]）
git remote add origin https://github.com/[your-username]/oral-surgery-app.git

# 運行部署腳本
./deploy-to-github.sh
```

### 步驟 3: 啟用 GitHub Pages

1. 進入 GitHub 倉庫設置
2. 找到 "Pages" 選項
3. 選擇 "Deploy from a branch"
4. 選擇 `gh-pages` 分支
5. 點擊 "Save"

### 步驟 4: 等待部署

- 等待 2-5 分鐘
- 訪問：`https://[your-username].github.io/oral-surgery-app/`

## 🔧 手動部署（如果腳本失敗）

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "feat: 初始版本 - 口腔手術術後病人主訴表達系統"

# 推送到 GitHub
git push -u origin main

# 部署到 GitHub Pages
npm run deploy
```

## 🐛 常見問題

### 問題 1: 腳本權限錯誤
```bash
chmod +x deploy-to-github.sh
```

### 問題 2: Git 未安裝
- macOS: `brew install git`
- Windows: 下載 [Git for Windows](https://git-scm.com/download/win)

### 問題 3: Node.js 未安裝
- 下載 [Node.js](https://nodejs.org/)

### 問題 4: GitHub Pages 無法訪問
- 檢查倉庫是否為 Public
- 確認 `gh-pages` 分支存在
- 等待 5-10 分鐘

## 📞 需要幫助？

如果遇到問題，請：
1. 檢查 [README.md](README.md) 中的詳細說明
2. 提交 GitHub Issue
3. 發送郵件到：[your-email@example.com]

---

**提示**: 確保您的 GitHub 用戶名正確替換 `[your-username]`
