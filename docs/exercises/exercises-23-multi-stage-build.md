# Multi-stage Build

上一個練習 [Optimizing Dockerfile](exercises-22-optimizing-dockerfile.md) 最後產生的 Dockerfile 如下：

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

這裡還有兩個很難解決的問題

* Laravel 有使用 npm 套件建置前端程式，但環境只有 PHP，該怎麼辦？
* 最終建置出來的 Dockerfile，並不希望有任何開發或建置工具（如 Composer），該怎麼辦？

這兩個問題，可以使用 Multi-stage Build 解決

## 移出 Composer 

參考官方文件，可以改寫成這樣：

```dockerfile
FROM php:7.3-alpine AS php_builder

WORKDIR /source

RUN set -xe && \
        curl -sS https://getcomposer.org/installer | php && \
        mv composer.phar /usr/local/bin/composer

COPY composer.json .
COPY composer.lock .
RUN mkdir -p database/seeds
RUN mkdir -p database/factories
RUN composer install --no-dev --no-scripts

COPY . .

RUN composer install

FROM php:7.3-alpine

WORKDIR /source

COPY --from=php_builder /source/vendor ./vendor 
COPY . .

EXPOSE 8080

CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8080"]
```

也因為分成不同階段建構，甚至第一階段的 Composer 安裝還能改寫成如下：

```dockerfile
RUN composer install --no-scripts

COPY . .

RUN composer install
RUN php vendor/bin/phpunit

RUN composer install --no-dev
```

## 加入 npm

對有多階段的做法來說，只要加一個建置階段是 Node 環境即可：

```dockerfile
FROM php:7.3-alpine AS php_builder

WORKDIR /source

RUN set -xe && \
        curl -sS https://getcomposer.org/installer | php && \
        mv composer.phar /usr/local/bin/composer

COPY composer.json .
COPY composer.lock .
RUN mkdir -p database/seeds
RUN mkdir -p database/factories
RUN composer install --no-scripts

COPY . .

RUN composer install
RUN php vendor/bin/phpunit

RUN composer install --no-dev

FROM node:10.15-alpine AS npm_builder

WORKDIR /source

COPY package.json .
RUN npm install

COPY . .

RUN npm run production

FROM php:7.3-alpine

WORKDIR /source

COPY --from=php_builder /source/vendor ./vendor
COPY --from=npm_builder /source/public/js ./public/js
COPY --from=npm_builder /source/public/css ./public/css
COPY --from=npm_builder /source/public/mix-manifest.json ./public

COPY . .

EXPOSE 8080

CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8080"]
```

同時這也是最終的結果。

## References

* [Use multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)
