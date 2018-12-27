/*
まるばつ Core Logic

内部データは 数値の配列(9要素)で表す

まる 'o' 1
ばつ 'x' -1
空 '-' 0

*/

const maru = 1;
const batu = -1;
const kara = 0;

/**
 * 文字列をtic-tac-toeの内部データに変換
 * srt の例  'x--oox---'
 * @param {string} str
 */
function parse(str) {
    if (typeof str !== 'string') {
        throw new Error('文字入れて');
    }
    if (str.length !== 9) {
        throw new Error('9桁入れて');
    }
    const result = str.split('').map(s => {
        if (s === 'x') {
            return batu;
        } else if (s === 'o') {
            return maru;
        } else if (s === '-') {
            return kara;
        }
        throw new Error('xかoか-入れて');
    });
    return result;
}

/**
 * tic-tac-toeの内部データを文字列に変換
 * boardの例 [0,0,1,0,-1,0,1,-1,0]
 * @param {Array<number>} board
 * @returns {string}
 */
function convertString(board) {
    if (!Array.isArray(board)) {
        throw new Error('配列入れて');
    }
    if (board.length !== 9) {
        throw new Error('9個入れて');
    }
    const result = board
        .map(n => {
            if (n === maru) {
                return 'o';
            } else if (n === batu) {
                return 'x';
            } else if (n === kara) {
                return '-';
            }
        })
        .join('');

    return result;
}

/**
 * boardのデータを渡して終了しているか判定
 * @param {Array<number>} board
 * @returns {boolean}
 */
function isEnd(board) {
    // 行のチェック
    if (Math.abs(sumAt(board, 0, 1, 2)) === 3) return true;
    if (Math.abs(sumAt(board, 3, 4, 5)) === 3) return true;
    if (Math.abs(sumAt(board, 6, 7, 8)) === 3) return true;
    // 列のチェック
    if (Math.abs(sumAt(board, 0, 3, 6)) === 3) return true;
    if (Math.abs(sumAt(board, 1, 4, 7)) === 3) return true;
    if (Math.abs(sumAt(board, 2, 5, 8)) === 3) return true;
    // 斜めのチェック
    if (Math.abs(sumAt(board, 0, 4, 8)) === 3) return true;
    if (Math.abs(sumAt(board, 2, 4, 6)) === 3) return true;
    // 引き分けのチェック
    return board.every(cell => cell !== kara);
}

/**
 * 配列の指定indexの値を足す
 * @param {Array<number>} board
 * @param  {...number} indexes
 * @returns {number}
 */
function sumAt(board, ...indexes) {
    return indexes.reduce((sum, index) => sum + board[index], kara);
}

function put(board, index) {
    // 配列をコピー
    const b = Array.from(board);
    const emptyCellCount = board.filter(cell => cell === kara).length;
    if (b[index] !== kara) {
        throw new Error('すでに置かれています');
    }
    b[index] = emptyCellCount % 2 ? maru : batu;
    return b;
}

/**
 * 次の手番を返す
 * @param {Array<number>} board
 * @returns {number} 次の手番
 */
function getNextTurn(board) {
    const emptyCellCount = board.filter(cell => cell === kara).length;

    if (emptyCellCount % 2 === 0) {
        return batu;
    } else {
        return maru;
    }
}

/**
 * 勝者を文字列で返す
 * 必ずisEnd後に使用する
 * @param {Array<number>} board
 * @returns {string} 勝者
 */
function getWinner(board) {
    if (!isEnd(board)) {
        throw new Error('まだ終わってない');
    }
    const checkPatterns = [
        // 行のチェック
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // 列のチェック
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // 斜めのチェック
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const pattern of checkPatterns) {
        if (sumAt(board, ...pattern) === 3) {
            return 'o';
        } else if (sumAt(board, ...pattern) === -3) {
            return 'x';
        }
    }
    // 勝者が存在しない場合引き分け
    return '-';
}

module.exports = {
    parse: parse,
    convertString: convertString,
    isEnd: isEnd,
    sumAt: sumAt,
    put: put,
    getNextTurn: getNextTurn,
    getWinner: getWinner,
};
