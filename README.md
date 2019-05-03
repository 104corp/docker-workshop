# Docker Workshop

[![Build Status](https://travis-ci.com/104corp/docker-workshop.svg?branch=master)](https://travis-ci.com/104corp/docker-workshop)

[Docker](https://www.docker.com/) 工作坊。

開始前，先對此工作坊做點基本說明：

* 主要使用 command line 操作
* 文件會以 Mac / Linux 環境為主做說明，Windows 10 應該會有 90% 相容性，但不保證完全可用。

## 準備自己的 Docker 環境

不同環境有不同的安裝方法，但最後驗證是否安裝成功，可以打開終端機輸入下面指令：

```
$ docker ps
CONTAINER ID    IMAGE   COMMAND CREATED STATUS  PORTS    NAMES
```

若有正常出現上面表格的話，代表服務有正常啟動，可以開始使用 Docker 了。

### Mac

使用 [Homebrew](https://docs.brew.sh/Installation) 的 [Cask](https://github.com/Homebrew/homebrew-cask) 安裝（需要權限）：

```
brew cask install docker
```

或是下載[安裝包](https://hub.docker.com/editions/community/docker-ce-desktop-mac)安裝（需要權限）。

### Windows 10

參考[官方文件](https://docs.docker.com/docker-for-windows/)，下載並安裝 Docker Desktop 即可。

### Linux

參考[官方文件](https://docs.docker.com/install/)，注意必須要是 64-bit 版本才能運行 Docker。

或使用懶人包安裝：

```
sudo curl -fsSL https://get.docker.com/ | sh
sudo usermod -aG docker your-user
```

> 已使用 Vagrant 測試過 [`ubuntu/trusty64`](https://app.vagrantup.com/ubuntu/boxes/trusty64)、[`debian/jessie64`](https://app.vagrantup.com/debian/boxes/jessie64) 可行。[`centos/7`](https://app.vagrantup.com/centos/boxes/7) 需另外啟動 docker daemon `sudo systemctl start docker`。

### Vagrant

[Vagrant](https://www.vagrantup.com/) 可以使用指令管理虛擬機（VM），並使用程式碼來表達環境（Infrastructure-as-code，IaC）。

Clone 此專案，並使用 `vagrant up` 指令即可得到 Ubuntu trusty 64-bit + Docker 18.06.3-ce 的乾淨環境：

```
vagrant up
vagrant ssh
```

### AWS

除了上述方法外，也可以使用 [RancherOS](https://github.com/rancher/os) 的 AMI。
