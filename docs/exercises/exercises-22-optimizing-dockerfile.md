# Optimizing Dockerfile

上一個練習 [Docker Build](exercises-21-docker-build.md) 最後產生的 Dockerfile 如下：

```dockerfile
FROM php:7.3-alpine

WORKDIR /source

RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

COPY . .
RUN composer install

# Use only development environment
ENV APP_KEY "base64:ETwf93f5m2aTbg+YxukR3hEiAHzmvKEi0mt605TkMfU="

EXPOSE 8080

CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8080"]
```

事實上，這個 Dockerfile 存一些問題：

* 建置過程傳入了太多非必要的檔案（指 `COPY . .`），這會
  + 讓建置時間變久
  + 增加不穩定因素
  + 增加不必要的重覆建置
* `ENV` 使用了機敏資訊（key），代表這會在原始碼裡出現
* 安裝過程「可能」會有不必要的檔案（指 `composer install` 會安裝測試套件）

因此會需要最佳化 Dockerfile，方向有下列幾個：

* 減少 build image 的時間，以調整流程為主
  + 也可參考 [.dockerignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file)
* 減少 image 空間與 commit，以調整流程為主
  + 也可參考 [Alpine Linux](https://hub.docker.com/_/alpine/) 或 [Multi-stage Builds](https://docs.docker.com/develop/develop-images/multistage-build/)
* 加強 image 的 SaaS 特性，可參考 [The Twelve Factors](https://12factor.net/)

## 減少 build context 的大小

Build context 是執行 build 一開始，會把檔案傳給 Docker Daemon 準備做 build。

但因為有些檔案跟建置無關，如：

* `.vagrant`

與建置無關很好理解。但有些則會是我們希望它跟 image 無關，如：

* `vendor`

比方說，為何我們會希望 host 的 vendor 目錄，會跟 image 無關？舉個例子，若 host 的 PHP 版本是 7.3，image 是 7.1 的時候，就很有可能會出問題。如 host 的 PHP 7.3 可能會安裝 PHPUnit 8，但 image PHP 7.1 是不能使用的。

這時，我們可以使用 `.dockerignore` 來排除 build context 時的檔案。

> 用法類似 `.gitignore`。

```
.vagrant
vendor
bootstrap/cache/packages.php
bootstrap/cache/services.php
```

如此一來，建置速度會加快，且某些內容也比較不會受到 host 檔案影響。

## 利用 cache 來減少不必要的重覆建置

> 在一個指令完成 commit 後，只要下一次遇到在同個 parent，同個 commit 時，就會繼續使用同一個 commit（類似 Git 的 fast forward）。建置過程如果有使用同一個 commit 則會顯示 *Using cache* 的訊息，因此以下會使用 *cache* 來描述這個行為。
> 
> 如果不希望使用 cache 的話，則可以在 `docker build` 指令帶入 `--no-cache` 參數即可。

在執行 `COPY . .` 時，要出現 Using cache 的額外條件是：來源內容必須要跟 cache 的一樣（Docker 應該有使用類似 md5 演算法，但不確定用了什麼），才會使用 cache。

這代表，僅僅只是修改 `README.md` 就會造成 `COPY . .` 重跑，進而讓 `RUN composer install` 也重跑。 

這問題的思考方向是：了解 `composer install` 的依賴為哪些檔案，先把這些檔案複製進 image 後，再執行 `COPY . .`。

因此解決方法，原本的寫法如下：

```dockerfile
COPY . .
RUN composer install
```

改成：

```dockerfile
COPY composer.json .
COPY composer.lock .
RUN composer install

COPY . .
```

但因為 Laravel 架構設計，所以 `composer install` 無法獨立執行，必須加上一點東西：

```dockerfile
COPY composer.json .
COPY composer.lock .

RUN mkdir -p database/seeds
RUN mkdir -p database/factories
RUN composer install --no-scripts

COPY . .

RUN composer install
```

## ENV 改執行階段傳入

[Environment](exercises-11-environment.md) 練習可以傳入指定的環境變數。而 Laravel 使用 `.env` 檔載入環境變數，若要改成由執行階段傳入的話，首先得先把 `.env` 忽略：

```
# .dockerignore
.env
```

接著使用 `docker run` 的另一個參數 `--env-file` 來載入環境變數：

```
docker run --env-file .env laravel
```

最後即可把 Dockerfile 的環境變數移除。

## 精簡 AUFS 的 commit 數

Docker 的 commit 數量是有限制的，為 127 個，這是精簡的理由之一。另一個更重大的理由是：因為 AUFS 系統特性，只要 commit 數越多，檔案系統的操作就會越慢，因此更需要想辦法來減少 commit 數。

以本例來說，把最上面安裝 composer 的過程合併，不失為一個好方法：

```dockerfile
RUN set -xe && \
        curl -sS https://getcomposer.org/installer | php && \
        mv composer.phar /usr/local/bin/composer
```

## 最佳化後的 Dockerfile

```dockerfile
FROM php:7.3-alpine

WORKDIR /source

RUN set -xe && \
        curl -sS https://getcomposer.org/installer | php && \
        mv composer.phar /usr/local/bin/composer

COPY composer.json .
COPY composer.lock .

RUN set -xe && \
        mkdir -p database/seeds && \
        mkdir -p database/factories && \
        composer install --no-scripts

COPY . .

RUN composer install

EXPOSE 8080

CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8080"]
```

## References

* [Docker Performance Improvement: Tips and Tricks](https://stackify.com/docker-performance-improvement-tips-and-tricks/)
* [Use the AUFS storage driver](https://docs.docker.com/storage/storagedriver/aufs-driver/)
* [DOCKER基础技术：AUFS](https://coolshell.cn/articles/17061.html)
