const core = require('../core');

describe('Core logic', () => {
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
});
