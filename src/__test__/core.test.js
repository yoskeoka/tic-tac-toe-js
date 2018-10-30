const core = require('../core');

describe('Core logic', () => {
    describe('parse function', () => {
        test('--------- 空のボードになる', () => {
            expect(core.parse('---------')).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        });
        test('x--oox--- 空じゃないよ', () => {
            expect(core.parse('x--oox---')).toEqual([-1, 0, 0, 1, 1, -1, 0, 0, 0]);
        });
    });
    describe('string function', () => {});
});
