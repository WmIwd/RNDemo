/**
 * Created by yty on 2017/4/15.
 */

export default class ArrayUtils {
    /**
     * 判断两个数组内容是否相等
     * @param a
     * @param b
     */
    static isAbsEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    /**
     * 克隆一个数组
     * @param a
     */
    static clone(a) {
        return a.map(item => {
            let obj = {};
            for (let p in item) {
                obj[p] = item[p];
            }
            return obj;
        });
    }
}