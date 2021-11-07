import { expect } from 'chai'
import { Converter, utils } from '@maticnetwork/maticjs'

describe('Hex test', () => {


    it('Converter.toHex', () => {
        const value = Converter.toHex('10');

        expect(value).equal('0xa');
    })

    it('BigNumber.toHex', () => {
        const value = new utils.BN('10').toString(16)

        expect(value).equal('a');
    })

    it('Converter.toHex with BN', () => {
        const value = Converter.toHex(
            new utils.BN(10)
        );

        expect(value).equal('0xa');
    })

    it('amount is 593390000', () => {
        const amount = 593390000;
        const value = Converter.toHex(
            new utils.BN(amount)
        );

        expect(value).equal('0x235e69b0');
        expect('235e69b0').equal(
            new utils.BN(amount).toString(16)
        );
    })

});