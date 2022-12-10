import {
    describe, test, expect,
} from '@jest/globals'

import { getCoefficient } from '../get-coefficient'

describe('Grid', () => {
    test('Get Coefficient', () => {
        expect(getCoefficient([0.2, 1000], 0.9, 10)).toBe(50)
        expect(getCoefficient([0.2, 1000], 1, 10)).toBe(10)
        expect(getCoefficient([0.2, 1000], 5, 10)).toBe(2)
        expect(getCoefficient([0.2, 1000], 25, 10)).toBe(0.4)
        expect(getCoefficient([0.2, 1000], 125, 10)).toBe(0.08)
    })
})
