# Run Command

練習此題，可以了解：

* 如何在 `docker run` 指令，直接對 container 下指令
* 如何「進入」container，並處理裡面的設定與檔案等
* Container 的「一次性」特性

## 指令練習

```bash
# 查看不同版本的 image 的程式版本
docker run --rm -it php:7.3-alpine php -v
docker run --rm -it php:7.4-alpine php -v
docker run --rm -it node:10-alpine node -v
docker run --rm -it node:12-alpine node -v


# 啟動 nginx
docker container run -d --name my-web -p 8080:80 nginx:alpine

# 另外開 terminal
# 「進入」nginx container
docker container exec -it my-web bash

# 在 nginx container 裡存入一個新的 html 檔
# 存之前與存之後可以查看 http://localhost:8080/my-web.html 網址內容
echo "hello world" > /usr/share/nginx/html/my-web.html

# 離開 container 並移除
docker container rm -f my-web

# 重新啟動 nginx
docker container run -d --name my-web -p 8080:80 nginx:alpine

# 查看 http://localhost:8080/my-web.html 網址內容
```

在這個練習題目會發現，第一次進入 Nginx container 修改的內容，在重新啟動 Nginx 後會全部消失。這代表 container 是一次性的（disposable）。

這個特性對開發或測試而言是好的體驗，類似電腦壞了就重開機解決，環境壞了就砍掉重練。但維運就不一定如此，在具備非一次性的環境管理經驗前提下，這個特性遇到大量佈署情境時，將會面臨一些問題：

* 客製化設定檔（如 `nginx.conf`）在重啟 container 後，將會消失
* 程式檔每次啟動 container 時，都需要再次佈署程式
* 環境設定如 IP，都是在啟動 container 的時候，才會知道的，該如何配置這些設定？

這些問題在後續練習中，將會慢慢知道該如何解決。目前的練習，先了解 container 具備這樣的特性即可。

## 指令說明

### `docker container run`

* `--rm` 當 container 主程序一結束時，立刻移除 container

> **注意**：`--rm` 與 `-d|--detach` 兩個選項是互相衝突的。

### `docker container exec`

在執行中的 container 上，執行新的指令。

> 參數 `-i` 與 `-t`，跟 `docker container run` 的意義完全相同。

## 總結

配合 [Port Forwarding](exercises-03-port-forwarding.md) 所提到的隔離特性，加上今天的練習，我們可以想像 Docker 可以做到以下應用：

* 隨時切換不同的環境，執行想要測試的指令
* 可同時在不同環境下測試，而它們各自的狀態都會是互相隔離的

## References

* [Nginx image](https://hub.docker.com/_/nginx)
* [PHP image](https://hub.docker.com/_/php)
