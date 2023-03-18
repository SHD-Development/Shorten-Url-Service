# SHD縮網址系統

本程式由 SHD Development 開發，提供縮網址服務。

官方縮網址服務連結：https://scurl.fun/ 。

本程式使用nodejs語言，使用express架設服務，以MongoDB為資料儲存之資料庫。

## 使用教學

### 要求
1. 請先確認您已安裝nodejs以及npm，建議版本為第16版本或更高。
2. 請取得一個MongoDB資料庫。

### 設定步驟

1. 請先下載程式碼，並將程式碼保存至您方便管理的位置。

2. 請打開`config.json`。

> `mongodb_uri` 請填入您的MongoDB連線連結，格式為：`mongodb://<username>:<password>@<domain>:<port>/`或`mongodb+srv://<username>:<password>@<domain>:<port>/`。

> `port` 請填入您架設所使用的通訊埠。

> `base_url` 請填入您的服務網址，格式為：`http://<domain>` 或 `https://<domain>`

3. 在資料夾目錄中執行 `npm install`。

4. 當套件包安裝完成後，執行 `node index.js`。

5. 若需創建縮網址，創建路徑在`/create`。

### API 部分

1. 本程式自備API服務，路徑為`/api/create`。

2. 使用POST方法，Body請使用`application/json`。

3. 以下是Body格式：

```json
{
    "longURL": "原網址",
    "shortID": "自訂後綴（選項）"
}
```

