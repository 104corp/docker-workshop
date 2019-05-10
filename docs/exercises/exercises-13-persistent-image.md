# Persistent Image

從這個練習，可以了解：

* 如何把 Docker 列表裡面的 image 轉換成打包檔
* 如何把打包檔轉回 Docker 列表裡面的 image

```
# 下載 busybox image
docker image pull busybox

# 將 image 保存成 tar
docker image save busybox > busybox.tar

# 移除 image
docker image rm busybox

# 確認 image 不在
docker image ls

# 把剛剛保存的 image 再載入 Docker repository
docker image load < busybox.tar
```

## 指令說明

### `docker image save`

把 image 使用 tar 打包輸出。預設會使用標準輸出（STDOUT），用法：

```
docker image save [OPTIONS] IMAGE [IMAGE...]
```

因為是使用標準輸出，所以會使用導出（`>`）的方法輸出檔案，也可以使用下面這個參數來取代導出：

* `-o|--output` 不使用標準輸出，改使用輸出檔案，後面接檔案名稱即可

### `docker image load`

把打包的 tar 檔載入到 Docker repository 裡。預設會使用標準輸入（STDIN），用法：

```
docker image load [OPTIONS]
```

類似 save，只是它是使用導入（`<`）來讀取檔案內容，一樣可以使用參數來取代導入：

* `-i|--input` 不使用標準輸入，改成直接指定檔案

## References

* [比較 save, export 對於映象檔操作差異](https://blog.hinablue.me/docker-bi-jiao-save-export-dui-yu-ying-xiang-dang-cao-zuo-chai-yi/)
