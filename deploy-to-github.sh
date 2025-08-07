#!/bin/bash

# 口腔手術應用程式 GitHub 部署腳本

echo "🚀 開始部署口腔手術應用程式到 GitHub..."

# 檢查是否已初始化 Git 倉庫
if [ ! -d ".git" ]; then
    echo "📁 初始化 Git 倉庫..."
    git init
fi

# 添加所有文件
echo "📝 添加文件到 Git..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "feat: 初始版本 - 口腔手術術後病人主訴表達系統

- 添加 React 應用程式
- 整合 Google AI API
- 實現症狀評估功能
- 添加響應式設計
- 配置 GitHub Pages 部署"

# 檢查是否已設置遠程倉庫
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  請先設置 GitHub 倉庫："
    echo "1. 在 GitHub 上創建新倉庫"
    echo "2. 運行以下命令："
    echo "   git remote add origin https://github.com/[your-username]/oral-surgery-app.git"
    echo "3. 然後重新運行此腳本"
    exit 1
fi

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git push -u origin main

# 部署到 GitHub Pages
echo "🌐 部署到 GitHub Pages..."
npm run deploy

echo "✅ 部署完成！"
echo ""
echo "📋 下一步："
echo "1. 在 GitHub 倉庫設置中啟用 GitHub Pages"
echo "2. 選擇 'Deploy from a branch'"
echo "3. 選擇 'gh-pages' 分支"
echo "4. 等待幾分鐘後訪問您的應用程式"
echo ""
echo "🔗 您的應用程式將在以下地址可用："
echo "https://[your-username].github.io/oral-surgery-app/"
