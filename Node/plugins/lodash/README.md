# lodash：

> referece: 
- [Core build](https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/core.js)
- [Full build](https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/lodash.js)
- [官方手册](https://www.lodashjs.com/docs/latest)
- [文章链接](https://www.cnblogs.com/xinyouhunran/p/11322212.html)

## 一、Array

1. _.chunk(array,size)
将一个数组分割成多个size长度的区块，不足则剩余部分组成一个区块。（新数组）

2. _.compact(array)
去除一个数组中的假值（undefined，null，false，''，0，NaN）。（新数组）

3. _.concat(array,[values])
将array与任何数组或值连接在一起（新数组）

4. _.difference(array,array1)
从array中将array1中有的值过滤掉。（新数组）

5. _.differenceBy(array, [values], [iteratee=_.identity])
同上，不过首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值。（新数组）

6. _.drop(array, n)去除array前面的n个元素，默认值为1。

7. _.dropRight(array,n)去除array尾部的n个元素。默认值为1。

8. _.dropRightWhile(array, [predicate=_.identity])
去除array中从 predicate 返回假值开始到尾部的部分（从右侧开始）。
predicate 会传入3个参数： (value, index, array)。

9. _.dropWhile(array, [predicate=_.identity])
去除array中从起点开始到 predicate 返回假值结束部分。

10. _.fill(array, value, [start=0], [end=array.length])
使用 value 值来填充（替换） array，从start位置开始（默认0）,
到end位置结束（但不包含end位置）。（原数组）

11. _.findIndex(array, [predicate=_.identity], [fromIndex=0])
该方法类似_.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。

12. _.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])
这个方式类似 _.findIndex， 区别是它是从右到左的迭代集合array中的元素。

13. _.head(array)
获取数组 array 的第一个元素。

14. _.flatten(array)
减少一级array嵌套深度

15. _.flattenDeep(array)
将array递归为一维数组

16. _.flattenDepth(array, [depth=1])
根据depth递归减少array的嵌套层级

17. _.fromPairs(pairs)
返回一个由键值对pairs构成的对象。

18. _.indexOf(array, value, [fromIndex=0])
查询数组中存在值得索引（默认起始位置0）

19. _.initial(array)
获取数组中除了最后一个元素之外的所有元素。

20. _.intersection([arrays])
返回一个包含所有传入数组交集元素的新数组。

21. _.last(array)
获取array中的最后一个元素。

22. _.nth(array, [n=0])
获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。

23. _.pull(array, [values])
移除数组array中所有和给定值相等的元素

24. _.pullAll(array, values）
这个方法类似 _.pull，区别是这个方法接收一个要移除值的数组。

25. _.pullAt(array, [indexes])根据索引 indexes，移除array中对应的元素，并返回被移除元素的数组。

26. _.remove(array, [predicate=_.identity])
移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。
predicate（断言） 会传入3个参数： (value, index, array)。 返回移除元素组成的新数组

27. _.sortedIndex(array, value)
使用二进制的方式检索来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。

28. _.sortedIndexOf(array, value)
这个方法类似 _.indexOf，除了它是在已经排序的数组array上执行二进制检索。

29. _.sortedLastIndex(array, value)
此方法类似于 _.sortedIndex，除了它返回 value值 在 array 中插入尽可能大的索引位置（index）。

30. _.sortedLastIndexOf(array, value)
这个方法类似 _.lastIndexOf，除了它是在已经排序的数组array上执行二进制检索。

31. _.sortedUniq(array)
这个方法类似 _.uniq，除了它会优化排序数组。（返回新的不重复的数组）

32. _.tail(array)
获取除了array数组第一个元素以外的全部元素。

33. _.take(array, [n=1])
创建一个数组切片，从array数组的起始元素开始提取n个元素。

34. _.takeRight(array, [n=1])
创建一个数组切片，从array数组的最后一个元素开始提取n个元素。

35. _.union([arrays])
创建一个按顺序排列的唯一值的数组。（返回一个新的联合数组）

36. _.uniq(array)
创建一个去重后的array数组副本。（返回新的去重后的数组）

37. _.without(array, [values])
创建一个剔除所有给定值的新数组（返回过滤值后的新数组）

二、collection集合
1. _.forEach(collection, [iteratee=_.identity])其中函数参数为value，index。
2. _.forEachRight(collection, [iteratee=_.identity])
3. _.every(collection, [predicate=_.identity])通过 predicate（断言函数） 检查 collection（集合）中的 所有 元素是否都返回真值。一旦 predicate（断言函数） 返回假值，迭代就马上停止（检查后都都返回真值，那么就返回true，否则返回 false）
4. _.filter(collection, [predicate=_.identity])
5. _.find(collection, [predicate=_.identity], [fromIndex=0])（返回匹配元素，否则返回 undefined）
6. _.findLast(collection, [predicate=_.identity], [fromIndex=collection.length-1])从右到左遍历
7. _.includes(collection, value, [fromIndex=0])检查 value(值) 是否在 collection(集合) 中
8. _.orderBy(collection, [iteratees=[_.identity]], [orders])如果没指定 orders（排序），所有值以升序排序。 
否则，指定为"desc" 降序，或者指定为 "asc" 升序，排序对应值。
9. _.partition(collection, [predicate=_.identity])创建一个分成两组的元素数组，第一组包含predicate（断言函数）返回为 truthy（真值）的元素，第二组包含predicate（断言函数）返回为 falsey（假值）的元素。
10. _.sample(collection)从collection（集合）中获得一个随机元素。
11. _.sampleSize(collection, [n=1])从collection（集合）中获得 n 个随机元素。
12. _.shuffle(collection)创建一个被打乱值的集合
13. _.size(collection)返回collection（集合）的长度，如果集合是类数组或字符串，返回其 length ；如果集合是对象，返回其可枚举属性的个数。
14. _.some(collection, [predicate=_.identity])通过 predicate（断言函数） 检查collection（集合）中的元素是否存在 任意 truthy（真值）的元素，一旦 predicate（断言函数） 返回 truthy（真值），遍历就停止。predicate 调用3个参数：(value, index|key, collection)。
15. _.sortBy(collection, [iteratees=[_.identity]])
创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。

三、Function
1. _.after(n, func)_.before的反向函数;此方法创建一个函数，当他被调用n或更多次之后将马上触发func 。
2. _.before(n, func)创建一个调用func的函数，通过this绑定和创建函数的参数调用func，调用次数不超过 n 次
3. _.curry(func, [arity=func.length])柯里化函数
4. _.debounce(func, [wait=0], [options={}])防抖动函数
5. _.defer(func, [args])推迟调用func，直到当前堆栈清理完毕
6. _.delay(func, wait, [args])延迟 wait 毫秒后调用 func。
7. _.once(func)创建一个只能调用 func 一次的函数。 重复调用返回第一次调用的结果。
8. _.throttle(func, [wait=0], [options={}])创建一个节流函数，在 wait 秒内最多执行 func 一次的函数

四、Lang
1. _.castArray(value)如果 value 不是数组, 那么强制转为数组。
2. _.clone(value)创建一个value的浅拷贝。
3. _.cloneDeep(value)深拷贝
4. _.conformsTo(object, source)通过调用断言source的属性与 object 的相应属性值，检查 object是否符合 source。
5. _.eq(value, other)执行 SameValueZero 比较两者的值，来确定它们是否相等。
6. _.gt(value, other)检查 value是否大于 other。
7. _.gte(value, other)检查 value是否大于或者等于 other。
8. _.isArguments(value)检查 value 是否是一个类 arguments 对象。
9. _.isArray(value)检查 value 是否是 Array 类对象。
10. _.isArrayBuffer(value)检查 value 是否是 ArrayBuffer 对象。
11. _.isBoolean(value)检查 value 是否是原始 boolean 类型或者对象。
12. _.isDate(value)检查 value 是否是 Date 对象。
13. _.isElement(value)检查 value 是否是可能是 DOM 元素。
14. _.isEmpty(value)检查 value 是否为一个空对象，集合，映射或者set。判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。
15. _.isEqual(value, other)执行深比较来确定两者的值是否相等。
16. _.isFinite(value)检查 value 是否是原始有限数值。 
17. _.isFunction(value)检查 value 是否是 Function 对象。
18. _.isMatch(object, source)执行一个深度比较，来确定 object 是否含有和 source 完全相等的属性值。
19. _.isNative(value)检查 value 是否是一个原生函数。
20. _.isNil(value)检查 value 是否是 null 或者 undefined。 
21. _.isNull(value)检查 valuealue 是否是 null。
22. _.isObject(value)检查 value 是否为 Object 的 language type。
23. _.isPlainObject(value)检查 value 是否是普通对象。 也就是说该对象由 Object 构造函数创建，或者 [[Prototype]] 为 null 。判断是否是什么的太多了，反正你能想到的都有！！！
24. _.lt(value, other)检查 value 是否小于 other。
25. _.lte(value, other)检查 value 是否小于等于 other。
26. _.toInteger(value)转换 value 为一个整数。

五、Math
1. _.add
2. _.ceil（number，[precision=0]）根据precision(精度，可为负值)向上舍入number
3. _.divide
4. _.floor 向下舍入
5. _.max
6. _.maxBy
7. _.mean 平均值
8. _.meanBy
9. _.min 
10. _.minBy
11. _.multiply 
12. _.round 四舍五入
13. _.subtract 
14. _.sum 求和
15. _.sumBy

六、Number
1. _.inRange(number, [start=0], end)检查 n 是否在 start 与 end 之间，但不包括 end。 如果 end 没有指定，那么 start 设置为0。 如果 start 大于 end，那么参数会交换以便支持负范围。
2. _.random([lower=0], [upper=1], [floating])产生一个包括 lower 与 upper 之间的数。 如果只提供一个参数返回一个0到提供数之间的数。 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。

七、Object
1. _.assignIn(object, [sources])这个方法类似 _.assign， 除了它会遍历并继承原型上的属性。 
2. _.findKey(object, [predicate=_.identity])这个方法类似 _.find 。 除了它返回最先被 predicate 判断为真值的元素 key，而不是元素本身。
3. _.keysIn(object)创建一个 object 自身 和 继承的可枚举属性名为数组。
4. _.merge(object, [sources])该方法类似 _.assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。
5. _.omit(object, [props])反向版 _.pick; 这个方法一个对象，这个对象由忽略属性之外的object自身和继承的可枚举属性组成。
（可以理解为删除object对象的属性）。
6. _.pick(object, [props])创建一个从 object 中选中的属性的对象。

八、Seq
1. _.chain(value)创建一个lodash包装实例，包装value以启用显式链模式。要解除链必须使用 _#value 方法。
2. _.tap(value, interceptor)这个方法调用一个 interceptor 并返回 value。interceptor调用1个参数： (value)。 该方法的目的是 进入 方法链序列以便修改中间结果。

九、String
1. _.camelCase([string=''])转换字符串string为 驼峰写法。
2. _.capitalize([string=''])转换字符串string首字母为大写，剩下为小写。
3. _.endsWith([string=''], [target], [position=string.length])检查字符串string是否以给定的target字符串结尾。
position可以指定检索的位置
4. _.escape([string=''])转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
5. _.escapeRegExp([string=''])转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 和 "|" in .
6. _.kebabCase([string=''])转换字符串string为 kebab case.就是以-连接
7. _.lowerCase([string=''])转换字符串string以空格分开单词，并转换为小写。
8. _.lowerFirst([string=''])转换字符串string的首字母为小写。
9. _.repeat([string=''], [n=1])重复 N 次给定字符串。
10. _.snakeCase([string=''])转换字符串string为 snake case.就是以_连接
11. _.startCase([string=''])转换 string 字符串为 start case.每个单词的首字母大写，其余不变。
12. _.startsWith([string=''], [target], [position=0])检查字符串string是否以 target 开头。
13. _.trim([string=''], [chars=whitespace])从string字符串中移除前面和后面的 空格 或 指定的字符。
14. _.truncate([string=''], [options={}])截断string字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."。option包含length，omission，separator属性
15. _.unescape([string='']) _.escape的反向版。
