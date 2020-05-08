# [Shell编程中Shift的用法](https://www.cnblogs.com/image-eye/archive/2011/08/20/2147153.html)

位置参数可以用shift命令左移。比如shift 3表示原来的$4现在变成$1，原来的$5现在变成$2等等，原来的$1、$2、$3丢弃，$0不移动。不带参数的shift命令相当于shift 1。

非常有用的 Unix 命令:shift。我们知道，对于位置变量或命令行参数，其个数必须是确定的，或者当 Shell 程序不知道其个数时，可以把所有参数一起赋值给变量$*。若用户要求 Shell 在不知道位置变量个数的情况下，还能逐个的把参数一一处理，也就是在 $1 后为 $2,在 $2 后面为 $3 等。在 shift 命令执行前变量 $1 的值在 shift 命令执行后就不可用了。

示例如下：

#测试 shift 命令(x_shift.sh)
until [ $# -eq 0 ]
do
echo "第一个参数为: $1 参数个数为: $#"
shift
done
执行以上程序x_shift.sh：
$./x_shift.sh 1 2 3 4

结果显示如下：

第一个参数为: 1 参数个数为: 4
第一个参数为: 2 参数个数为: 3
第一个参数为: 3 参数个数为: 2
第一个参数为: 4 参数个数为: 1

从上可知 shift 命令每执行一次，变量的个数($#)减一，而变量值提前一位，下面代码用 until 和 shift 命令计算所有命令行参数的和。

#shift 上档命令的应用(x_shift2.sh)
if [ $# -eq 0 ]
then
echo "Usage:x_shift2.sh 参数"
exit 1
fi
sum=0
until [ $# -eq 0 ]
do
sum=`expr $sum + $1`
shift
done
echo "sum is: $sum"

执行上述程序:

$x_shift2.sh 10 20 15

其显示结果为：

45

　　Shift 命令还有另外一个重要用途, Bsh 定义了9个位置变量，从 $1 到 $9,这并不意味着用户在命令行只能使用9个参数，借助 shift 命令可以访问多于9个的参数。

　　Shift 命令一次移动参数的个数由其所带的参数指定。例如当 shell 程序处理完前九个命令行参数后，可以使用 shift 9 命令把 $10 移到 $1。
