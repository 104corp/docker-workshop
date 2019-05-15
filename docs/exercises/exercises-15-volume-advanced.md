# Volume Advanced

從這個練習，可以了解：

* 如何建立 volume
* 如何將 volume 的目錄綁定到 container 裡

```bash
# 建立 volume，並命名為 code
docker volume create --name code
docker volume ls

# 執行 container 綁定 volume，並查看裡面的內容
docker run --rm -it -v code:/source busybox ls -l /source

# 執行 container 做點檔案系統的改變
docker run --rm -it -v code:/source busybox touch /source/somefile

# 執行 container 查看 volume 的內容
docker run --rm -it -v code:/source busybox ls -l /source

# 執行 nginx container 綁定到 html 目錄裡
docker run -d -v code:/usr/share/nginx/html --name my-web nginx

# 查看 my-web 容器的 html 目錄
docker exec -it my-web ls -l /usr/share/nginx/html

# 執行新容器，並把 my-web 容器綁定的 volume 綁到這個容器上
docker run -d --volumes-from my-web --name my-web2 nginx

# 查看新的 my-web2 容器的 html 目錄
docker exec -it my-web2 ls -l /usr/share/nginx/html
```

## 指令說明

### `docker volume create`

建立 volume

* `--name` 指定 volume 名稱

### `docker run`

* `-v|--volume` 指定 volume 到 container 裡面的某個目錄 
* `--volumes-from` 這個參數要接 container，這可以讓新的 container 去共享舊的 container 的 volume 設定。設定包括 [Volume Mapping](exercises-05-volume-mapping.md)，與今天提到的手動建立方法。

## References

* [Docker 實戰系列（三）：使用 Volume 保存容器內的數據](https://larrylu.blog/using-volumn-to-persist-data-in-container-a3640cc92ce4)
