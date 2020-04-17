#!/bin/sh

oldsuffix=$1
newsuffix=$2
dir=$(eval pwd)

for file in $(ls $dir | grep .${oldsuffix})
    do
        name=$(ls ${file} | cut -d. -f1)
        mv $file ${name}.${newsuffix}
    done
echo "change successd!"

# 参考：https://blog.csdn.net/buxiaoxindasuile/article/details/50791050