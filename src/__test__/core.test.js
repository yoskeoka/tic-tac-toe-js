const core = require('../core');

describe('Core logic', () => {
    const emptyBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    describe('parse function', () => {
        test('--------- 空のボードになる', () => {
            expect(core.parse('---------')).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });
        test('x--oox--- 空じゃないよ', () => {
            expect(core.parse('x--oox---')).toEqual([-1, 0, 0, 1, 1, -1, 0, 0, 0]);
        });
        test('ooox-x-x- マルの勝ち', () => {
            expect(core.parse('ooox-x-x-')).toEqual([1, 1, 1, -1, 0, -1, 0, -1, 0]);
        });
        test('xo-ox-o-x バツの勝ち', () => {
            expect(core.parse('xo-ox-o-x')).toEqual([-1, 1, 0, 1, -1, 0, 1, 0, -1]);
        });
        test('abc------ 変な文字は例外発生', () => {
            expect(() => core.parse('abc------')).toThrowError();
        });
        test('0 数字は例外発生', () => {
            expect(() => core.parse(0)).toThrowError();
        });
        test('null nullは例外発生', () => {
            expect(() => core.parse(null)).toThrowError();
        });
        test('-- 少なければ例外発生', () => {
            expect(() => core.parse('--')).toThrowError();
        });
    });

    describe('convertString function', () => {
        test('空のボードになる', () => {
            expect(core.convertString([0, 0, 0, 0, 0, 0, 0, 0, 0])).toEqual('---------');
        });
        test('配列じゃないもの', () => {
            expect(() => core.convertString(0)).toThrowError();
        });
        test('マルバツいくつか入った状態', () => {
            expect(core.convertString([1, 1, 1, -1, 0, -1, 0, -1, 0])).toEqual('ooox-x-x-');
        });
    });

    describe('isEnd function', () => {
        test('マルの勝ち', () => {
            expect(core.isEnd([1, 1, 1, -1, 0, -1, 0, -1, 0])).toBe(true);
        });
        test('バツの勝ち', () => {
            expect(core.isEnd([-1, 1, 0, 1, -1, 0, 1, 0, -1])).toBe(true);
        });
        test('引き分け', () => {
            expect(core.isEnd([1, 1, -1, -1, -1, 1, 1, -1, 1])).toBe(true);
        });
    });

    describe('sumAt function', () => {
        test('配列の指定indexの値を足します', () => {
            expect(core.sumAt([1, 2, 3, 4, 5], 0, 2)).toBe(4);
        });
        test('配列の指定indexの値を足します', () => {
            expect(core.sumAt([1, 2, 3, 4, 5, 6], 1, 3, 4)).toBe(11);
        });
    });

    describe('put function', () => {
        test('まっさらな状態の時にど真ん中にマルがおける', () => {
            expect(core.put(emptyBoard, 4)).toEqual(core.parse('----o----'));
        });
        test('次はバツ', () => {
            const got = core.put(core.parse('----o----'), 0);
            const want = core.parse('x---o----');
            expect(got).toEqual(want);
        });
        test('真ん中にすでに存在していたら、置けない', () => {
            const 真ん中に置かれている = core.parse('----o----');
            expect(() => core.put(真ん中に置かれている, 4)).toThrowError();
        });
    });
    //TODO: テストを実装する。
    describe('getNextTurn function', () => {
        test('ターンが切り替わる', () => {
            expect(core.put(emptyBoard, 4)).toEqual(core.parse('----o----'));
        });
    });
});
