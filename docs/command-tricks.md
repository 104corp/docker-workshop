# 常見指令速查表

## 別名表

以別名的字母順序排序。

| 別名 | 指令 |
| --- | --- |
| docker attach | docker container attach |
| docker build | docker image build |
| docker commit | docker container commit |
| docker cp | docker container cp |
| docker create | docker container create |
| docker exec | docker container exec |
| docker images | docker image ls |
| docker logs | docker container logs |
| docker ps | docker container ls |
| docker pull | docker image pull |
| docker rm | docker container rm |
| docker rmi | docker image rm |
| docker run | docker container run |
| docker start | docker container start |
| docker stat | docker container stat |
| docker stop | docker container stop |

## 特殊技巧

在遇到特定問題時，可以使用這些技巧解決。

### SHA1 小技巧

假設有一個 SHA1 如下：

```
f4e0e10d3b278de232af549e1d6332e64eb3734ffbbcbc63e41dfce96c36d6d4
```

若有使用過 Git 的話，應該會知道 SHA1 至少要打四個字，才能拿來使用，如：

```
git checkout f4e0
```

但 Docker 最少只要打一碼就行了：

```
docker inspect f
docker rm f
```

> 若有重覆都會提醒，而不會真的做。

### 移除所有的 container

雖然可以使用 `docker container prune` 來清理已停止的 container。但如果是想把所有 container 移除的話，可以下這個指令：

```
docker rm -vf $(docker ps -aq)
```

### 移除所有的 image

與移除所有 container 類似。

使用 `docker image prune` 可以清理未 tag 的 image。但有時候也會有類似的需求是要清理所有 image

> `docker image prune` 指令說明是 *Remove unused images* 但實際操作的移除對象是未 tag 的 image

```
docker rmi -f $(docker images -q)
```
