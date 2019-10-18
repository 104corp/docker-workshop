# Environment Variable

練習此題，可以了解：

* 如何在 container 設定環境變數

## 指令練習

```bash
# 啟動 mysql 並給予 password 環境變數 
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql

# 啟動 Node.js Interactive shell
docker run --rm -it -e NODE_ENV=testing node

# 查看環境變數
> process.env.NODE_ENV
```

這個練習題目，是解決 [Run Command](exercises-04-run-command.md) 環境設定問題。與 [Volume Mapping](exercises-05-volume-mapping.md) 類似，同樣的指令可以讓程式取到相同的環境變數，進而執行該環境所應該表現的行為。

## 指令說明

### `docker run`

* `-e|--env` 設定該 container 的環境變數

## References

* [The Twelve Factors - III. Config](https://12factor.net/config)
