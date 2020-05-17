var fs = require('fs');
var XLSX = require('xlsx');

function readFile1(path) {
    /*
    读取附表2，3，4，5，6，9
    */
    var workbook = XLSX.readFile(path);
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];

    json_data = XLSX.utils.sheet_to_json(worksheet);


    keyMap = {};// key映射表
    header = json_data[0] // 提取表格头
    data = json_data.slice(1) //去除表头后的数据
    for (key in header) {
        keyMap[key] = header[key]
    }
    //console.log(data)
    // var keyMap = { id: '序列', name: '姓名' };
    res = data.map(
        function (item) {
            var objs = Object.keys(item).reduce((newData, key) => {
                let newKey = keyMap[key] || key
                newData[newKey] = item[key]
                return newData
            }, {})
            return objs
        }
    )
    //console.log(res)
    return res
}

function readFile2(path) {
    /*
    读取附表7 8
    */
    var workbook = XLSX.readFile(path);
    var worksheet = workbook.Sheets[workbook.SheetNames[3]];
    header = [];
    for (let key in worksheet) {
        re1 = /^[a-zA-Z]+[1|2]$/;
        re2 = /^[a-zA-Z]+[1|2]$/;
        item = {};
        if (re1.test(key)) {
            header.push(worksheet[key].v)
        }
    }

    json_data = XLSX.utils.sheet_to_json(worksheet);
    
    let res = json_data.slice(1).map(
        (item) => {

            let = obj = {};
            obj[header[1]] = {};
            obj[header[2]] = {};


            obj["地区"] = item["地区"];

            obj[header[1]][header[3]] = item[header[1]]
            obj[header[1]][header[4]] = item["__EMPTY"]
            obj[header[1]][header[5]] = item["__EMPTY_1"]
            obj[header[1]][header[6]] = item["__EMPTY_2"]


            obj[header[2]][header[7]] = item[header[2]]
            obj[header[2]][header[8]] = item["__EMPTY_3"]
            obj[header[2]][header[9]] = item["__EMPTY_4"]
            obj[header[2]][header[10]] = item["__EMPTY_5"]
            return obj
        }
    )
    //console.log(res)
    return res
}

// readFile2("./upload/广西外资企业和外贸企业复工情况表-1583221454202.xlsx")

//readFile1("./upload/广西规模以上工业企业复工情况表-1583221525629.xlsx")
module.exports = {
    readFile1,
    readFile2
}


const result = readFile1('./开放发展.xlsx')

fs.writeFileSync('./cash.json', JSON.stringify(result))
