## 一款支持markdown转image的工具



### 安装
```
npm install md-to-image
```

```javascript
const filePath = await md2image(`#你好
> 引用内容
`,"/root/temp")
console.log(filePath)

```javascript