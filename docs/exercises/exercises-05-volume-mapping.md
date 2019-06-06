# Volume Mapping

練習此題，可以了解：

* 如何在 container 讀取本機的目錄或檔案

## 指令練習

```bash
# 產生一個本機的檔案
echo "hello world" > ./my-web.html

# 啟動 nginx
docker run --rm -it -p 8080:80 -v `pwd`/my-web.html:/usr/share/nginx/html/my-web.html nginx

# 查看 http://localhost:8080/my-web.html

# 停止容器再啟動一次
docker run --rm -it -p 8080:80 -v `pwd`/my-web.html:/usr/share/nginx/html/my-web.html nginx

# 再次查看 http://localhost:8080/my-web.html
```

這個練習題目，是解決 [Run Command](exercises-04-run-command.md) 佈署問題最簡單（同時額外的問題也最多）的方法：直接把 host 上某些檔案掛進 container 即可。同個指令開的 container 除了有一樣環境之外，也能有一樣的檔案。

這也是本機開發或測試最常使用的佈署方法。

## 指令說明

### `docker run`

* `-v|--volume` 掛載 volume 到這個 container 上，格式為 `[/host]:[/container]:[參數]`
