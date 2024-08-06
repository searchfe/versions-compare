/**
 * @file index.js 工具文件
 *
 * @date 2018-08-07
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.myModule = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    /**
     * [compare 比较两个整数的大小]
     *
     * @param  {integer} a 整数
     * @param  {integer} b 整数
     *
     * @return {integer} 1: a > b; 0: a === b; -1: a < b
     */
    function compare(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    }

    /**
     * [arrayCompare 数组形式的比较]
     *
     * @param  {Array}   a  版本1
     * @param  {Array}   b  版本2
     * @param  {boolean} isReverse [是否反转数组]
     *
     * @return {integer} 1: a > b; 0: a === b; -1: a < b
     */
    function arrayCompare(a, b, isReverse) {
        // 有些函数返回的版本号是逆序的，此时 isReverse 传 true 即可
        if (isReverse) {
            a = a.reverse();
            b = b.reverse();
        }

        var lenA = a.length;
        var lenB = b.length;

        for (var i = 0; i < Math.max(lenA, lenB); i++) {
            var t = compare(a[i] || 0, b[i] || 0);

            // 相同位置的数字不一致，则有大小结论
            if (t !== 0) {
                return t;
            }
        }

        return 0;
    }

    var util = {
        isArray: function (param) {
            return (typeof param === 'object') && param.constructor === Array;
        },
        isString: function (param) {
            return (typeof param === 'string') && param.constructor === String;
        },
        isNumber: function (param) {
            return (typeof param === 'number') && param.constructor === Number;
        },
        // 版本号只有数字和小数点组成
        isCorrectVersion: function (version) {
            return /^(\d+\.)*(\d)+$/.test(version);
        },
        toArray: function (param) {
            // 数组直接返回
            if (this.isArray(param)) {
                return param;
            }

            // 数字转换为数组
            if (this.isNumber(param)) {
                return [param];
            }

            // 字符串转换为数组，这里针对版本号字符串
            if (this.isString(param)) {
                return param.split('.').map(parseFloat);
            }

            return [];
        }
    };

    /**
     * [dataPreprocess 数据预处理函数，判断参数格式是否符合预期]
     *
     * @param  {Number/Array/String} version 版本号
     * @return {Array}               转换为数组后的版本号
     */
    function dataPreprocess(version) {
        if (util.isNumber(version)) {
            version = version.toString();
        }
        if (util.isArray(version)) {
            version = version.join('.');
        }

        if (util.isCorrectVersion(version)) {
            return util.toArray(version);
        }

        return 'Wrong Params.';
    }

    /**
     * [main 入口函数]
     *
     * @param  {Array}   a  版本1
     * @param  {Array}   b  版本2
     * @param  {boolean} isReverse [是否反转数组]
     *
     * @return {integer} 1: a > b; 0: a === b; -1: a < b
     */
    function main(a, b, isReverse) {
        a = dataPreprocess(a);
        b = dataPreprocess(b);

        if (a !== 'Wrong Params.' && b !== 'Wrong Params.') {
            return arrayCompare(a, b, isReverse);
        }

        return 'Wrong Params.';
    }

    return main;
}));