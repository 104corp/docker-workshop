# Port forwarding

練習此題，可以了解：

* Docker Application 隔離特性
* 如何透過 port 存取 container 提供的服務

```bash
# 執行多次，port 都不會打架
docker run -d --name my-web nginx
docker run -d --name my-web nginx
docker run -d --name my-web nginx
docker run -d --name my-web nginx
docker run -d --name my-web nginx

docker run -d --name my-web -p 8080:80 nginx
docker container stop my-web
docker container rm -vf my-web
```

## 指令說明

### `docker run`

* `-d|--detach` 背景執行 container。已經跑在前景的 container 可以用 Ctrl + P、Ctrl + Q 組合鍵 detach；接著可以再用 `docker attach` 讓它回到前景
* `-p|--publish` 把 container 的 port 公開到 host 上，格式為 `[IP]:[HOST_PORT]:[CONTAINER_PORT]`

### `docker container stop`

停止指定的 container，用法：

```
docker container stop [OPTIONS] CONTAINER [CONTAINER...]
```

此指令會送出 `SIGTERM` 給 container 的主程序，當 timeout（預設 10，可使用 `-t|--time` 參數調整）後會再送出 `SIGKILL`。

> 類似地，`docker container pause` 是送 `SIGSTOP`；`docker container kill` 則是預設直接送 `SIGKILL`。

### `docker container rm`

移除指定的 container，用法：

```
docker container rm [OPTIONS] CONTAINER [CONTAINER...]
```

> 可移除多個 container

* `-f|--force` 如果是執行中的 container，會強制移除（使用 SIGKILL）
* `-v|--volumes` 移除分配給 container 的 volume

## References

* [Nginx image](https://hub.docker.com/_/nginx)
