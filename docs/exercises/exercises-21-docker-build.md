# Docker Build

練習的過程會不斷的建置與移除，可以先準備好 [Makefile](https://gist.github.com/MilesChou/c278f180b2c14af44bc752cdb437ab24)，下指令會比較簡單。

```makefile
#!/usr/bin/make -f
IMAGE := $(shell basename $(shell pwd))
VERSION := latest

.PHONY: all build rebuild shell run

# ------------------------------------------------------------------------------

all: build

build:
	docker build -t=$(IMAGE):$(VERSION) .

rebuild:
	docker build -t=$(IMAGE):$(VERSION) --no-cache .

shell:
	docker run --rm -it $(IMAGE):$(VERSION) sh

run:
	docker run --rm -it $(IMAGE):$(VERSION)
```

寫一個 Dockerfile 的順序如下：

1.  準備一個可以成功 build 的 Dockerfile
2.  撰寫 Dockerfile 三循環
    1.  新增 Dockerfile 指令，包括安裝服務、修改服務設定、設定 Docker 參數等
    2.  執行 Build ，並產生 Container 驗證是否正確
    3.  優化 Dockerfile

以下會用上面的方法，來描述如何使用 PHP built-in server，來寫一個 Laravel Skeleton 的 Dockerfile。

## Workshop

什麼是一定會成功執行的 Dockerfile？只要 `FROM` 存在的 image 即可。[Laravel 5.8](https://github.com/laravel/laravel) 系統環境要求是 PHP 7.1+，因此來使用目前最新的穩定版 PHP 7.3。

```dockerfile
FROM php:7.3-alpine
```

接著可以使用 `docker build` 與 `docker run` 確定該 image 是可以正常執行，且內容是如我們所想的

```
make build
make shell
```

## 調整路徑

一開始這個路徑可能不是我們所想要，所以調整如下：

```dockerfile
WORKDIR /source
```

`WORKDIR` 是設定預設工作目錄，也就是 Docker Build，或是 [Run Command](exercises-04-run-command.md) 的預設工作目錄 

## 安裝 Composer

PHP 主要使用 Composer 管理套件依賴。查到安裝 composer 的方法如下：

```dockerfile
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
```

`RUN` 為執行指令，其實就是 `docker run`，與 [Run Command](exercises-04-run-command.md) 的效果是一樣的。不過 build 會把執行完的結果 commit 成另一個 image。

## 安裝依賴套件

接著把程式碼放進 Image 並執行安裝依賴套件的指令 `composer install`

```dockerfile
COPY . .
RUN composer install
```

`COPY` 是把本機的檔案複製到 image 裡，使用方法為：`COPY [hostPath] [containerPath]`。

要注意這裡有個雷，檔案複製是沒什麼問題的，但目錄的複製就得小心：

```dockerfile
COPY somefile /container/path
```

這個結果預期會是，container 會多一個檔案是 `/container/path/somefile`，結果也如預期。但目錄就不是這樣：

```dockerfile
COPY somedir /container/path
COPY somedir/* /container/path
```

上面兩個指令是等價的，也就是原本預期會多一個 `/container/path/somedir` 目錄，結果卻是 `somedir` 目錄裡面的所有東西全複製到 `/container/path` 下

解決方法是改成下面這個指令：

```dockerfile
COPY somedir /container/path/somedir
```

## 設定預設啟動 server 的指令

使用 Artisan 可以啟動 server，指令如下：

```dockerfile
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8080"]
```

但執行的時候可能會發現某些問題，如必要的環境變數 `APP_KEY` 沒有設定，於是設定給它：

```dockerfile
ENV APP_KEY "base64:ETwf93f5m2aTbg+YxukR3hEiAHzmvKEi0mt605TkMfU="
```

最後重新建置並執行，即可正常運作。

## Dockerfile

```dockerfile
FROM php:7.3-alpine

WORKDIR /source

RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

COPY . .
RUN composer install

ENV APP_KEY "base64:ETwf93f5m2aTbg+YxukR3hEiAHzmvKEi0mt605TkMfU="

CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8080"]
```

## References

* [Docker Build](https://docs.google.com/presentation/d/1OrcP6FKFpLwmzPhmFH8-O9SHJEyu-_K69tPw2gqqsHs) | Miles
* [管理貨櫃的碼頭工人－－ Docker （ 2/3 ）](https://ithelp.ithome.com.tw/articles/10186279) | CI 從入門到入坑
