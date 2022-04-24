# URL Shortener 短網址產生器
# 介紹
輸入網址後會輸出較短的網址
# 功能
1.輸入網址並送出表單後，會產生一組短網址
2.點擊Copy可以複製網頁產生的網址
3.使用短網址可以轉到原本的網址
# 開始使用
1.請確認已安裝Node.js及npm  

2.使用終端機((Terminal)將專案clone到本機位置  

``` bash
git clone https://github.com/coldfish5630/alphacamp_shortener.git
```

3.安裝套件

```bash
npm install
```

4.在/urlshortener新增.env，並設定環境變數MONGODB_URI

5.新增種子資料，看到done表示新增完成

```bash
npm run seed
```

6.完成後開啟程式

```bash
npm run start
```

7.看到下列訊息表示程式已正常開啟，請使用瀏覽器進入該網址http://localhost:3000

```bash
express is running on http://localhost:3000
mongodb connected
```

8.若要關閉程式請使用ctrl + c
# 使用工具
Node.js 16.13.0  
Express 4.16.4  
Express-Handlebars 3.0.0  
mongoose 6.3.0  
dotenv 16.0.0  
Bootstrap 5.1.3  