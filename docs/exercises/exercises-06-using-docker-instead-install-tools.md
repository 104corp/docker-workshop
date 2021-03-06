# Using Docker Instead Install Tools

這個練習是一個應用題，同時也是一個小技巧，讓開發者不需安裝工具也能使用該工具。

## 指令練習

```bash
# 使用 Composer
alias composer="docker container run -it --rm -v \$PWD:/source -w /source composer:1.10"

# 使用 npm
alias npm="docker container run -it --rm -v \$PWD:/source -w /source node:12-alpine npm"

# 使用 Gradle
alias gradle="docker container run -it --rm -v \$PWD:/source -w /source gradle:6.5 gradle"

# 使用 Maven
alias mvn="docker container run -it --rm -v \$PWD:/source -w /source maven:3.6-alpine mvn"

# 使用 pip
alias pip="docker container run -it --rm -v \$PWD:/source -w /source python:3.8-alpine pip"

# 使用 Go
alias go="docker container run -it --rm -v \$PWD:/source -w /source golang:1.14-alpine go"

# 使用 Mix
alias mix="docker container run -it --rm -v \$PWD:/source -w /source elixir:1.10-alpine mix"
```

## 指令說明

### `docker container run`

* `-w|--workdir` 指定預設執行的路徑

## References

* [Composer image](https://hub.docker.com/_/composer)
* [Elixir image](https://hub.docker.com/_/elixir)
* [Golang image](https://hub.docker.com/_/golang)
* [Gradle image](https://hub.docker.com/_/gradle)
* [Node image](https://hub.docker.com/_/node)
* [Maven image](https://hub.docker.com/_/maven)
* [Python image](https://hub.docker.com/_/python)
