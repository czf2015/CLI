/** 
 * Unix 系统基本命令 cat 的一个实现。
 * cat 可以从标准输入取得文件， 再逐行把文件内容送出到标准输出上。
 */
async function cat(filenames: string[]) {
  for (const filename of filenames) {
    const file = await Deno.open(filename);
    await Deno.copy(file, Deno.stdout);
    file.close();
  }
}

cat(Deno.args);
