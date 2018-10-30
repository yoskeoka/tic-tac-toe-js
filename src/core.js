/*
まるばつ Core Logic

内部データは 数値の配列(9要素)で表す

まる 'o' 1
ばつ 'x' -1
空 '-' 0

*/

/**
 * 文字列をtic-tac-toeの内部データに変換
 * @param {string} str
 */
function parse(str) {
    // srt の例  'x--oox---'
    const result = str.split('').map(s => {
        if (s === 'x') {
            return -1;
        } else if (s === 'o') {
            return 1;
        }
        return 0;
    });
    return result;
}

module.exports = {
    parse: parse,
};
