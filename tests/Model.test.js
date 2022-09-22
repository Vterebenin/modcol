import {test, expect} from 'vitest';
import {BaseModel} from '../src';
import * as _ from 'lodash';

describe('Model', () => {
    test('should automatically generate unique incrementing ids', () => {
        let base = (new BaseModel())._uid;

        expect((new BaseModel())._uid).to.equal(_.toString(_.toSafeInteger(base) + 1));
        expect((new BaseModel())._uid).to.equal(_.toString(_.toSafeInteger(base) + 2));
        expect((new BaseModel())._uid).to.equal(_.toString(_.toSafeInteger(base) + 3));
    });
});
