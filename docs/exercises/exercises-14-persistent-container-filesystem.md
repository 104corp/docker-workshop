# Persistent Container filesystem

從這個練習，可以了解：

* 如何把 Docker 列表裡面的 container 的檔案結構轉換成打包檔
* 如何把檔案結構打包檔轉回 Docker 列表裡面的 image

```bash
# 執行一個 container
docker run -it --name mycontainer busybox

# 做點檔案系統的改變
touch somefile

# 離開並把檔案系統匯出 tar
docker container export mycontainer > my-export.tar

# 從 tar 導入檔案系統
docker image import - myimage < my-export.tar

# 查看 image 
docker image ls
```

這個練習需要注意的是，`docker container export` 與 `docker image import`，與 [Persistent Image](exercises-13-persistent-image.md) 的目的都一樣是把 Docker 的系統保存成檔案，但過程與結果大不相同。

## 指令說明

### `docker container export`

把 container 的檔案系統使用 tar 打包輸出。預設會使用標準輸出（STDOUT），用法：

```
docker container export [OPTIONS] CONTAINER
```

與 save 類似，也有使用導出（`>`）的方法輸出檔案，也有參數可以取代導出：

* `-o|--output` 不使用標準輸出，改使用輸出檔案，後面接檔案名稱即可

### `docker image import`

把打包的 tar 檔的檔案系統導入到 Docker repository 裡。預設會使用標準輸入（STDIN），用法：

```
docker image import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

類似 load，使用導入（`<`）來讀取檔案內容，但它沒有選項可以取代導入，而是改成使用參數的方法。下面是使用導入與不使用的對照範例：

```bash
docker image import myimage < my-export.tar 
docker image import my-export.tar myimage 
```

## References

* [比較 save, export 對於映象檔操作差異](https://blog.hinablue.me/docker-bi-jiao-save-export-dui-yu-ying-xiang-dang-cao-zuo-chai-yi/)
