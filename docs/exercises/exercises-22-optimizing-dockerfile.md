# Optimizing Dockerfile

上一個練習 [Docker Build](exercises-21-docker-build.md) 最後產生的 Dockerfile 如下：

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

事實上，這個 Dockerfile 存在非常多問題：

* 建置過程傳入了太多非必要的檔案，這會讓建置時間變久，以及增加不穩定因素

## References

* [Docker Build](https://docs.google.com/presentation/d/1OrcP6FKFpLwmzPhmFH8-O9SHJEyu-_K69tPw2gqqsHs) | Miles
* [管理貨櫃的碼頭工人－－ Docker （ 2/3 ）](https://ithelp.ithome.com.tw/articles/10186279) | CI 從入門到入坑
