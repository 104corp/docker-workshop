# Link Container

在練習此題之前，都專注在本機如何跟 container 互動。而練習此題之後，可以了解：

* 如何讓 container 之間互動

```
# 建立 network
docker network create my-network

# 啟動 nginx
docker run -d --name my-web --network my-network nginx

# 啟動 busybox
docker run --rm -it --network my-network busybox

# 從 busybox 存取 nginx 的服務（使用 my-web 作為 hostname）
wget my-web -O -
```

這個練習題目，也可以解決 [Run Command](exercises-04-run-command.md) 環境設定問題。這樣就能使用 hostname 來連到指定的 container 了。

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
