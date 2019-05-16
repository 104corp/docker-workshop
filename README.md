# Docker Workshop

[![Build Status](https://travis-ci.com/104corp/docker-workshop.svg?branch=master)](https://travis-ci.com/104corp/docker-workshop)

[Docker](https://www.docker.com/) 工作坊。

開始前，先對此工作坊做點基本說明：

* 主要使用 command line 操作，shell 會以 `bash` 為主
* 文件會以 Mac / Linux 環境為主做說明，不保證 Windows 系統完全可用
* 大多 image 裡面的 user 都會是 root，包括執行 docker 也需要 root（Linux）。為方便入門為前提，會以 root 執行來教學

> GUI 可以參考 [Portainer](https://www.portainer.io/)、[Kitematic](https://kitematic.com/)、[DockStation](https://dockstation.io/)，但本 workshop 說明不會討論 GUI。

## 直接在原生系統上安裝 Docker 環境

不同環境的安裝方法當然是不同的，但最後驗證是否安裝成功，可以打開終端機輸入下面指令：

```
$ docker ps
CONTAINER ID    IMAGE   COMMAND CREATED STATUS  PORTS    NAMES
```

若有正常出現上面表格的話，代表服務有正常啟動，可以開始使用 Docker 了。

### Mac

使用 [Homebrew](https://docs.brew.sh/Installation) 的 [Cask](https://github.com/Homebrew/homebrew-cask) 安裝（需要權限）：

```bash
brew cask install docker
```

或是下載[安裝包](https://hub.docker.com/editions/community/docker-ce-desktop-mac)安裝（需要權限）。

### Windows 10

參考[官方文件](https://docs.docker.com/docker-for-windows/)，下載並安裝 Docker Desktop 即可。

### Linux

參考[官方文件](https://docs.docker.com/install/)，注意必須要是 64-bit 版本才能運行 Docker。

或使用懶人包安裝：

```bash
sudo curl -fsSL https://get.docker.com/ | sh
sudo usermod -aG docker your-user
```

> 已使用 Vagrant 測試過 [`ubuntu/trusty64`](https://app.vagrantup.com/ubuntu/boxes/trusty64)、[`debian/jessie64`](https://app.vagrantup.com/debian/boxes/jessie64) 可行。[`centos/7`](https://app.vagrantup.com/centos/boxes/7) 需另外啟動 docker daemon `sudo systemctl start docker`。

## 使用虛擬機安裝 Docker 環境

有時候因為特殊理由，可能會不想或無法（如 Windows 7）在本機安裝 Docker，這時可以考慮使用虛擬機安裝。

### Docker Machine

[Docker Machine](https://docs.docker.com/machine/) 是建立 Docker 虛擬機的首選，預設的 provider 包括以下選擇：

* [VirtualBox](https://docs.docker.com/machine/drivers/virtualbox/)
* [Hyper-V](https://docs.docker.com/machine/drivers/hyper-v/)（Windows only）
* AWS

> 使用 AWS 請注意防火牆要開通 local 機器的連線，Docker 使用 tcp 2376 port 連線，同時也注意不要讓其他人能連到這個 port。

以 VirtualBox 為例，執行以下指令即可建立一個 Docker 虛擬機：

```bash
# 建立 Docker 虛擬機
docker-machine create -d virtualbox my-docker
# 查看這台機器相關的環境參數
docker-machine env my-docker
# export 環境參數，執行 docker 指令即可改直接連線到虛擬機上
eval $(docker-machine env my-docker)
```

### Vagrant

[Vagrant](https://www.vagrantup.com/) 可以使用指令管理虛擬機（VM），並使用程式碼來表達環境（Infrastructure-as-code，IaC）。

Clone 此專案，並使用 `vagrant up` 指令即可得到 Ubuntu trusty 64-bit + Docker CE 的乾淨環境：

```bash
vagrant up
vagrant ssh
```

### AWS

除了上述方法外，也可以在 AWS 上使用 [RancherOS](https://github.com/rancher/os) 的 AMI。

另一個方法是使用 [AWS Cloud9](https://aws.amazon.com/tw/cloud9/) 服務：

1.  起 Cloud9 服務，設定直接用預設值即可
2.  在 Cloud9 服務，下 `curl ifconfig.co` 指令取得公開 IP：
3.  因需要練習 port forwarding，所以必須到 EC2 服務裡，找到對應的 instance，再設定 security group

### Play with Docker

上述方法全部都不行的話，最後一個就是使用 [Play with Docker](https://labs.play-with-docker.com/) 服務，只要準備好 DockerHub 的帳號，即可使用。因為它是一個使用 [DinD](https://hub.docker.com/_/docker/) 做成的線上服務，所以會有兩個問題：

* 它並沒有保證系統一直都可以用，所以什麼時候會壞，這是無法預期的
* 因為使用 DinD，所以跟 port forwarding 相關的練習是無法使用瀏覽器測試的，不過可以使用 curl 指令測試

## 預載 Image

若知道如何使用 docker 指令下載 image 的話，可以先執行下面這些指令，先下載比較大的 image，避免當天大家都在下載造成網路過慢。

```bash
docker pull composer:1.8
docker pull gradle:5.4-alpine
docker pull maven:3.6-alpine
docker pull mysql
docker pull nginx
docker pull node
docker pull node:10.15-alpine
docker pull php:7.3-alpine
docker pull selenium/hub:3.141.59-iron
docker pull selenium/node-chrome-debug:3.141.59-iron
docker pull selenium/node-firefox-debug:3.141.59-iron
```

## References

* [Docker Tutorials and Labs](https://github.com/docker/labs)
