# Backup Database

以下是一個備份資料庫的範例

## 指令練習

```bash
# 啟動 database
docker container run -d -e MYSQL_ROOT_PASSWORD=password --name db mysql

# 停止 database
docker container stop db

# 執行設定好 volume 的 container
docker container run --rm -it --volumes-from db -v `pwd`:/backup busybox

# 執行備份指令
tar cvf /backup/backup.tar /var/lib/mysql
```

> 註：若理解 [Run Command](exercises-04-run-command.md) 用法的話，就會知道第三行指令與第四行指令是可以接在一起用的。

## References

* [Backup, restore, or migrate data volumes](https://docs.docker.com/storage/volumes/#backup-restore-or-migrate-data-volumes)
