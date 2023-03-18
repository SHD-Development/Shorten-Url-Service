English Version | <a href="https://github.com/SHD-Development/Shorten-Url-Service/blob/main/README.md">中文版</a>

# SHD Shorten Url Service

This project was created by SHD Development, provides shorten URL service.

Official running instance: https://scurl.fun/

This project was created using NodeJS with express, and database hosted by MongoDB.

## Installation 

### Requirements 
1. NodeJS 16 or higher.
2. Node package manager(npm).
3. MongoDB hosted anywhere.

### Set-up Steps

1. Download the source code, and save it anywhere you want.

2. Open `config.json` and edit it.

> `mongodb_uri` Please enter you MongoDB connection uri, format: `mongodb://<username>:<password>@<domain>:<port>/`or`mongodb+srv://<username>:<password>@<domain>:<port>/`

> `port` Your hosting port.

> `base_url` Please enter your service domain, format: `http://<domain>` or `https://<domain>`

3. Run this command in that directory. `npm install`

4. After that, run `node index.js`

5. If you need to create shorten url, go to `yourdomain/create`

### API 

1. This project have API, it's at `/api/create`

2. Please use POST, and Body:`application/json`

3. Body format:

```json
{
    "longURL": "Original URL",
    "shortID": "Custom suffix（Optional）"
}
```
