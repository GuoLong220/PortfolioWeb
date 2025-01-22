# Developer Portfolio

這是一個個人作品集網站，展示技能、專案和時間軸。網站使用 Google Apps Script (GAS) 從 Google Sheets 動態獲取資料，並通過 Cloudflare Pages 部署。

Google Sheets 副本：https://docs.google.com/spreadsheets/d/1S5eZJoV7So7Ltf48Jc3we7X78jzdv9VB7yUuL63nPqk/edit?usp=sharing

---

## 目錄
1. [本地測試](#本地測試)
2. [部署到 Cloudflare Pages](#部署到-cloudflare-pages)
3. [專案結構](#專案結構)
4. [環境變數](#環境變數)
5. [依賴套件](#依賴套件)

---

## 本地測試
### 1. 安裝依賴套件
確保你已經安裝了 Node.js 和 npm。然後在專案根目錄下運行以下命令來安裝依賴套件：

```bash
npm install
```

### 2. 設定環境變數
在專案根目錄下建立一個 .env 檔案，並將 GAS_ENDPOINT 放入其中：

```env
VITE_GAS_ENDPOINT=https://script.google.com/macros/s/你的部署ID/exec
```

### 3. 啟動開發伺服器
運行以下命令來啟動本地開發伺服器：

```bash
npm run dev
```

Vite 會啟動一個本地開發伺服器，並在終端中顯示訪問網址（通常是 http://localhost:5173）。

---

## 部署到 Cloudflare Pages
### 1. 設定環境變數
在 Cloudflare Pages 中設定環境變數：
1. 進入 Cloudflare Pages 專案的「Settings」頁面。
2. 選擇「Environment variables」。
3. 點擊「Add variable」。
4. 輸入以下內容：
    * Variable name: `NEXT_PUBLIC_GAS_ENDPOINT`
    * Value: https://script.google.com/macros/s/你的部署ID/exec
5. 點擊「Save」。

### 2. 推送程式碼到 Git 倉庫
將專案推送到 GitHub、GitLab 或其他支援的 Git 倉庫。

### 3. 在 Cloudflare Pages 中部署
1. 進入 Cloudflare Pages。
2. 選擇你的 Git 倉庫。
3. 在「Build settings」中，設定建置命令和輸出目錄：
    * Build command: npm run build
    * Build output directory: dist
4. 點擊「Save and Deploy」。

---

## 專案結構
```
my-web-project/
├── public/
│   ├── index.html
│   ├── js/
│   │   ├── main.js
│   │   ├── data.js
│   ├── css/
│   │   ├── main.css
├── .env
├── package.json
├── README.md
└── ...
```

---

## 環境變數
* VITE_GAS_ENDPOINT：Google Apps Script 的 API 端點。

---

## 依賴套件
* Vite：用於建置和開發伺服器。
* dotenv：用於讀取 .env 檔案（僅在本地開發時使用）。

---

## 貢獻
歡迎提交 Pull Request 或提出 Issue！

---

## 授權
此專案採用 MIT 授權。