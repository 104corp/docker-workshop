# Link Container

在練習此題之前，都專注在本機如何跟 container 互動。而練習此題之後，可以了解：

* 如何讓 container 之間互動

```
# 建立 network
docker network create my-net

# 啟動 nginx
docker run -d --name my-web --network my-net -p 8080:80 nginx

# 啟動並進入 busybox
docker run --rm -it --network my-net busybox

# 從 busybox 存取 nginx 的服務（使用 my-web 作為 hostname）
wget my-web -O -
```

這個練習題目，也可以解決 [Run Command](exercises-04-run-command.md) 環境設定問題。這樣就能使用 hostname 來連到指定的 container 了。

練習中會發現一個奇妙的事：使用瀏覽器在連接 Nginx 時，必須使用 8080 port，但進容器連結 Nginx，則得使用 80 port。這是虛擬機與 [Port Forwarding](exercises-03-port-forwarding.md) 的特性，必須要清楚了解，使用 Docker 或虛擬機才不會搞混目前要使用什麼連接埠。

## 指令說明

### `docker network`

與網路相關的指令集

### `docker network create`

建立網路設定，用法如下：

```
docker network create [OPTIONS] NETWORK
```

本範例並沒有帶任何參數，但需要了解的是下面這個：

* `-d|--driver` 使用的 driver，預設 `bridge`，其他參數可以參考[官網](https://docs.docker.com/network/#network-drivers)

### `docker run`

* `--network` 指定網路設定

## References

* [The Twelve Factors - III. Config](https://12factor.net/config)
