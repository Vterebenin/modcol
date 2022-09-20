import { test, expect } from 'vitest';
import {BaseModel} from '../src';

// Edit an assertion and save to see HMR in action
class Task extends BaseModel {
    constructor() {
        super();
        console.log('hello world');
    }
}

test('Should have validations', () => {
    const task = new Task();
    const validation = task.validation();
    expect(validation).toStrictEqual({});
});
