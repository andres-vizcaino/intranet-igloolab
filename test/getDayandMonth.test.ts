import { getDayandMonthName } from '../config/utils/getDayandMonth'

describe('test get String and Month of Full Date String', () => {
    test('test1', () => {
        expect(getDayandMonthName('1999-10-21T05:00:00.000Z')).toEqual(
            '21 de Octubre'
        )
    })
})
