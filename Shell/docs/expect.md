```bash
# 命令行参数 
# $argv，参数数组，使用[lindex $argv n]获取，$argv 0为脚本名字
# $argc，参数个数
set username [lindex $argv 1]  # 获取第1个参数
set passwd [lindex $argv 2]    # 获取第2个参数

set timeout 30 # 设置超时

# spawn是expect内部命令，开启ssh连接
spawn ssh -l username 192.168.1.1

# 判断上次输出结果里是否包含“password:”的字符串，如果有则立即返回，否则就等待一段时间(timeout)后返回
expect "password:"

# 发送内容ispass(密码、命令等)
send "ispass\r"

# 发送内容给用户
send_user "$argv0 [lrange $argv 0 2]\n"
send_user "It's OK\r"
# 执行完成后保持交互状态，控制权交给控制台(手工操作)。否则会完成后会退出。
interact
```