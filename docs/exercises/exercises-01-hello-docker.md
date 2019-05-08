# Hello Docker

從這個練習，可以理解：

* image 與 container 的差異
* image 與 container 之間的依賴關係

```bash
# 確認本機的 image / container 狀態為何
docker image ls
docker container ls

# 首次執行官方的 hello world
docker run --name hello hello-world

# 再次確認 image / container 狀態
docker image ls
docker container ls

# 移除剛剛的 image / container
docker image rm hello-world
docker container rm hello

# 再次確認 image / container 狀態
docker image ls
docker container ls
```

## 指令說明

### `docker run`

建立新的 container 並執行 command，用法如下：

```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

IMAGE 會先從 local repository 找，有的話就執行；若沒有的話，就會到 remote repository 下載並執行。

* `--name` 參數為指定 container 名稱，它必須是唯一，若沒指定則會亂數產生（[產生器原始碼](https://github.com/moby/moby/blob/master/pkg/namesgenerator/names-generator.go)

### `docker image`

這是一系列與 image 相關的指令集，直接執行即可看到可用指令的列表。

### `docker image ls`

查看目前 local repository 所有 image。

### `docker image rm`

移除指定的 image，用法如下：

```
docker image rm [OPTIONS] IMAGE [IMAGE...]
```

IMAGE 可以是 tag name，或是 SHA1。其他地方所表示的 IMAGE 亦同。

> 從用法看得出：傳入一個以上的 IMAGE 是可行的。

### `docker container`

類似 `docker image`，這是 container 相關的指令集。

### `docker container ls`

列出正在執行中的 container。

### `docker container rm`

移除指定的 container，用法如下：

```
docker container rm [OPTIONS] CONTAINER [CONTAINER...]
```

CONTAINER 可以是當初 `--name` 參數給的名稱，或是 SHA1。其他地方所表示的 CONTAINER 亦同。

> 同 `docker image rm`，傳入一個以上的 CONTAINER 是可行的。

## References

* [hello-world image](https://hub.docker.com/_/hello-world)
