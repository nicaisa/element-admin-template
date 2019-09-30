/*
*图片过滤
*value： 图片名字
* file：图片路径（imgs下面的文件）
*  */
export default function (value, file = '') {
    return [undefined, '', null].includes(file) ? require(`@/assets/img/${value}`) :
        require(`@/assets/img/${file}/${value}`);
}
