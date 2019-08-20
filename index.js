import { cloneJSON, cloneRecursion } from './function';
import getRawType from './check';

const a = {
    a1: {
        a11: 'a11'
    }
};
const c = ['1', {c1: 'c1'}];
// const b = cloneRecursion(c);
// console.log(b);
// console.log(getRawType(b));
console.log(getRawType);