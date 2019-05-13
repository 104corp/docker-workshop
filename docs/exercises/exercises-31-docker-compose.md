# Docker Compose

參考 Selenium 在 [DockerHub](https://hub.docker.com/u/selenium) 的 image 說明，與 [Selenium 的範例](https://mileschou.github.io/selenium-docker-example/)，實作如下的 Docker Compose file：

```yaml
version: "3"

services:
  tester:
    build: .
    working_dir: /source
    volumes:
      - .:/source
    depends_on:
      - chrome
      - firefox

  hub:
    image: selenium/hub:3.141.59-iron
    container_name: hub
    ports:
      - "4444:4444"

  chrome:
    image: selenium/node-chrome-debug:3.141.59-iron
    volumes:
      - /dev/shm:/dev/shm
    depends_on:
      - hub
    environment:
      - HUB_HOST=hub
      - HUB_PORT=4444
    ports:
      - "5900:5900"

  firefox:
    image: selenium/node-firefox-debug:3.141.59-iron
    volumes:
      - /dev/shm:/dev/shm
    depends_on:
      - hub
    environment:
      - HUB_HOST=hub
      - HUB_PORT=4444
    ports:
      - "5901:5900"
```

先啟動依賴的容器：

```
docker-compose up -d hub chrome firefox
```

接著就能執行測試：

```
docker-compose run --rm --no-deps tester
```

這兩個指令，`-d` 和 `--rm` 與 `docker run` 的參數意義相同，`--no-deps` 則是不額外啟動 `depends_on` 的 container。

## References

* [Selenium Docker Example](https://mileschou.github.io/selenium-docker-example/)
