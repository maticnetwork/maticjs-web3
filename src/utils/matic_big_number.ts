import { BaseBigNumber } from "@maticnetwork/maticjs";
import BN  from "bignumber.js";

export class MaticBigNumber extends BaseBigNumber {
    private bn_: BN;

    constructor(value) {
        super();
        this.bn_ = new BN(value);

        // this.bn_.toString()
    }

    static isBN(value) {
        if (value instanceof MaticBigNumber) {
            return true;
        }
        return BN.isBigNumber(value);
    }

    toString(base?) {
        return this.bn_.toString(base);
    }

    toNumber() {
        return this.bn_.toNumber();
    }

    // static from(value) {
    //     return new MaticBigNumber(value);
    // }

    add(value: BaseBigNumber) {
        const bn = this.bn_.plus(
            new BN(value.toString())
        );
        return new MaticBigNumber(bn);
    }

    sub(value: BaseBigNumber) {
        const bn = this.bn_.minus(
            new BN(value.toString())
        );
        return new MaticBigNumber(bn);
    }

    mul(value: BaseBigNumber) {
        const bn = this.bn_.times(
            new BN(value.toString())
        );
        return new MaticBigNumber(bn);
    }

    div(value: BaseBigNumber) {
        const bn = this.bn_.div(
            new BN(value.toString())
        );
        return new MaticBigNumber(bn);
    }

    lte(value: BaseBigNumber) {
        return this.bn_.lte(
            new BN(value.toString())
        );
    }

    lt(value: BaseBigNumber) {
        return this.bn_.lt(
            new BN(value.toString())
        );
    }

    gte(value: BaseBigNumber) {
        return this.bn_.gte(
            new BN(value.toString())
        );
    }

    gt(value: BaseBigNumber) {
        return this.bn_.gt(
            new BN(value.toString())
        );
    }

    eq(value: BaseBigNumber) {
        return this.bn_.eq(
            new BN(value.toString())
        );
    }
}
