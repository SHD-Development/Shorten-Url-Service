中文版 | <a href="https://github.com/SHD-Development/Shorten-Url-Service/blob/main/README_EN.md">English Version</a>

# SHD縮網址系統

本程式由 SHD Development 開發，提供縮網址服務。

官方縮網址服務連結：https://scurl.fun/ 。

本程式使用 [Node.js](https://nodejs.org/) 語言，使用 [express](http://expressjs.com/) 架設服務，以 [MongoDB](https://www.mongodb.com/) 為資料儲存之資料庫。

## 使用教學

### 要求
1. 請先確認您已安裝 [Node.js](https://nodejs.org/) 以及 [npm](https://www.npmjs.com/) 或其他套件管理器，建議版本為第16版本或更高。
2. 請取得一個 [MongoDB](https://www.mongodb.com/) 資料庫。

### 設定步驟

1. 請先下載程式碼，並將程式碼保存至您方便管理的位置。

2. 請打開 `config.json`。

> `mongodb_uri` 請填入您的 MongoDB 連線網址，格式為：`mongodb://<username>:<password>@<domain>:<port>/`或`mongodb+srv://<username>:<password>@<domain>:<port>/`。

> `port` 請填入您架設所使用的通訊埠。

> `base_url` 請填入您的服務網址，格式為：`http://<domain>` 或 `https://<domain>`。

3. 在資料夾目錄中執行 `npm install`。

4. 當套件包安裝完成後，執行 `node index.js`。

5. 若需創建縮網址，創建路徑在`/create`。

### API 部分

1. 本程式包含 API 服務，路徑為 `/api/create`。

2. 使用 POST 方法，Body 格式請使用 `application/json`。

3. 以下是 Body 格式：

```json
{
    "longURL": "原網址",
    "shortID": "自訂後綴（選項）"
}
```
