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
    });
    describe('string function', () => {});
});
