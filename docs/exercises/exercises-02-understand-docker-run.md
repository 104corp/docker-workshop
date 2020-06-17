# Understand Docker Run

練習完 [Hello Docker](exercises-01-hello-docker.md) 後，再練習此題目，可以了解：

* `docker run` 指令背後實際做的事

## 指令練習

```bash
# 確認 image
docker image ls

# 下載 busybox image
docker image pull busybox

# 基於 busybox 建立新的 container
docker container create -it --name mycontainer busybox

# 啟動 container
docker container start -i mycontainer

# 觀察 container
docker container ls -a
```

> 在執行 container 的過程中，可以使用 `control + p` 與 `control + q` 的連續組合鍵來達成 detach 效果。

## 指令說明

### `docker image pull`

從遠端 repository 下載 image，用法如下：

```
docker image pull [OPTIONS] NAME[:TAG|@DIGEST]
```

TAG 若沒有給的話，預設會使用 latest，意指下面這兩個指令是等價的：

```bash
docker image pull busybox
docker image pull busybox:latest
```

### `docker container create`

建立 container。這個指令類似 `docker container run`，但它只建立 container，不執行。也因為兩個指令單純只差在有沒有執行，所以它們的參數幾乎都能共用。

用法如下：

```
docker container create [OPTIONS] IMAGE [COMMAND] [ARG...]
```

* `--name` 選項同 `docker container run`，指定 container 名稱
* `-i|--interactive` 是讓 container 的標準輸入保持打開
* `-t|--tty` 選項是告訴 Docker 要分配一個虛擬終端機（pseudo-tty）並綁定到 container 的標準輸入上

### `docker container start`

啟動容器，與 `docker container create` 合在一起就是 `docker container run`。用法： 

```
docker container start [OPTIONS] CONTAINER [CONTAINER...]
```

* `-i|--interactive` 會把標準輸入綁定到容器上。

> **注意**：這裡的 `--interactive` 參數與 `docker container create` 的 `--interactive` 參數的意義不同，必須要兩個都有打開才能與 `docker container run` 的 `--interactive` 產生一樣的效果。

## 總結

在 [Hello Docker](exercises-01-hello-docker.md) 的練習，是使用 `docker container run` 直接執行。本次練習則是了解背後它是如何操作不同的元件，來達成執行程式的目的。

`docker container run` = `docker image pull` + `docker container create` + `docker container start` 

除此之外，同時也練習了如何使用 `--interactive` 選項與 `--tty` 選項，來進入 container 的環境。

## References

* [Busybox image](https://hub.docker.com/_/busybox)
