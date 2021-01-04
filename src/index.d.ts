/**
 * @returns 1: a > b; 0: a === b; -1: a < b
 */
declare function Compare(
    /** 版本1 */
    a: number | string | Array<string | number>,
    /** 版本2 */
    b: number | string | Array<string | number>,
    /** 是否反转数组 */
    isReverse?: boolean
): 1 | -1 | 0;

export = Compare;
