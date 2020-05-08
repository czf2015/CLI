## 1. 搭建 Java 开发环境

此实验教大家如何配置 JDK 、Tomcat 和 Mysql

### 安装 JDK

```sh
echo JDK 是开发Java程序必须安装的软件，我们查看一下 yum 源里面的 JDK：
yum list java*

echo 选择适合本机的JDK，并安装：
yum install java-1.7.0-openjdk* -y

echo 安装完成后，查看是否安装成功：
java -version
```


### 安装 Tomcat

Tomcat 是一个应用服务器，是开发和调试 jsp 程序的首选，可以利用它来响应 HTML 页面的访问请求。

```sh
echo 进入本地文件夹
cd /usr/local

echo 到官网找到 Tomcat 的下载链接，并下载到服务器中, 这里提供了一个快速下载 Tomcat 的地址：
wget https://mc.qcloudimg.com/static/archive/fa66329388f85c08e8d6c12ceb8b2ca3/apache-tomcat-7.0.77.tar.gz

echo 解压这个文件夹：
tar -zxf apache-tomcat-7.0.77.tar.gz

echo 重命名这个文件
# 重命名是为了方便后续操作, 并非必须步骤
mv apache-tomcat-7.0.77 /usr/local/tomcat7 

echo 进入 bin 文件夹
cd /usr/local/tomcat7/bin

echo 给这个文件夹下的所有 shell 脚本授予权限：
chmod 777 *.sh

echo 开启tomcat服务：
./startup.sh
```


### 安装 MySQL

```sh
echo 使用 yum 安装 MySQL：
yum install -y mysql-server mysql mysql-devel

echo 安装完成后，启动 MySQL 服务：
service mysqld restart

echo 设置账户、密码
/usr/bin/mysqladmin -u root password 'Password'
```
> 下面命令中的密码是教程为您自动生成的，为了方便实验的进行，不建议使用其它密码。如果设置其它密码，请把密码记住。


## 2. 访问 Tomcat

访问 http://<您的 CVM IP 地址>:8080 即可访问到刚才启动的 Tomcat 的内置示例页面
