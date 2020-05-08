request
可以将requset模块想象成一个简化版的第三方类http模块，同时支持https 和重定向，戳这里区官网。下文列出几个能够让你快速上手的知识点。

安装
npm install request --save
```js
var request = require('request');
API
GET

  request(url,function(error,response,body){
      if(!error && response.statusCode == 200){
          //输出返回的内容
          console.log(body);
      }
  });
POST

  var options = { 
    uri: 'https://www.googleapis.com/urlshortener/v1/url', 
    method: 'POST', 
    json: { "longUrl": "http://www.google.com/" }
  };

  request({
      url: 'http://xxx.xxx.com',
      method: 'POST',
      body: formData
  }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
          //输出返回的内容
          console.log(body);
      }
  });
```

流
```js
// 任何响应都可以输出到文件流。

request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
// 反过来，也可以将文件传给PUT或POST请求。未提供header的情况下，会检测文件后缀名，在PUT请求中设置相应的content-type。

fs.createReadStream('file.json').pipe(request.put('http://mysite.com/obj.json'))
```

表单
request支持 application/x-www-form-urlencoded 和 multipart/form-data 实现表单上传。

```js
// x-www-form-urlencoded：
  request.post('http://service.com/upload', {form:{key:'value'}})
//   或者：
  request.post('http://service.com/upload').form({key:'value'})
  
// multipart/form-data
  var r = request.post('http://service.com/upload')
  var form = r.form()
  form.append('my_field', 'my_value')
  form.append('my_buffer', new Buffer([1, 2, 3]))
  form.append('my_file', fs.createReadStream(path.join(__dirname, 'doodle.png'))
  form.append('remote_file', request('http://google.com/doodle.png'))
```

作者：艾伦先生
链接：https://www.jianshu.com/p/b5973ef87f73
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。