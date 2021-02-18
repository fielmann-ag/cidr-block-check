import cidrBlockCheck from './index.js';
import {expect} from 'chai';
import {describe, it} from "mocha";
import {AssertionError} from 'assert'

describe('unit tests', () => {
    it('When IP addresses match Then true is returned', () => {
        // arrange
        const cidrBlock = '192.168.1.23/28';
        const ipAddress = '192.168.1.23';

        // act
        const result = cidrBlockCheck.v4.isInBlock(cidrBlock, ipAddress);

        // assert
        expect(result).to.be.true;
    });

    it('When given IP is in CIDR block Then true is returned', () => {
        // arrange
        const cidrBlock = '192.168.1.8/28';
        const ipAddress = '192.168.1.12';

        // act
        const result = cidrBlockCheck.v4.isInBlock(cidrBlock, ipAddress);

        // assert
        expect(result).to.be.true;
    });

    it('When given IP is not in CIDR block Then false is returned', () => {
        // arrange
        const cidrBlock = '192.168.1.8/16';
        const ipAddress = '192.169.2.12';

        // act
        const result = cidrBlockCheck.v4.isInBlock(cidrBlock, ipAddress);

        // assert
        expect(result).to.be.false;
    });

    it('When prefix length is 0 Then for any IP addresses true is returned', () => {
        // arrange
        const cidrBlock = '192.168.1.24/0';
        const ipAddress = '10.17.5.23';

        // act
        const result = cidrBlockCheck.v4.isInBlock(cidrBlock, ipAddress);

        // assert
        expect(result).to.be.true;
    });

    it('When prefix length is 32 Then true is returned when IP addresses match', () => {
        // arrange
        const cidrBlock = '192.168.1.42/32';
        const ipAddress = '192.168.1.42';

        // act
        const result = cidrBlockCheck.v4.isInBlock(cidrBlock, ipAddress);

        // assert
        expect(result).to.be.true;
    });

    it('When CIDR is not valid Then assertion error is thrown', () => {
        // arrange
        const cidrBlock = 'this_is_not_a_valid_cidr_block';
        const ipAddress = '192.168.1.42';

        // act
        const result = () => cidrBlockCheck.v4.isInBlock(cidrBlock, ipAddress);

        // assert
        expect(result).to.throw(AssertionError, /CIDR/);
    });

    it('When IP is not valid Then assertion error is thrown', () => {
        // arrange
        const cidrBlock = '192.168.1.42/32';
        const ipAddress = 'not_a_valid_ip_address';

        // act
        const result = () => cidrBlockCheck.v4.isInBlock(cidrBlock, ipAddress);

        // assert
        expect(result).to.throw(AssertionError, /IP/);
    });

    describe('variant set test', () => {
        [
            ['55.27.53.70/0', '100.65.201.133', true],
            ['128.27.53.70/1', '167.65.201.133', true],
            ['128.27.53.70/1', '127.65.201.133', false],
            ['56.53.60.205/2', '62.207.53.222', true],
            ['191.53.60.205/2', '192.207.53.222', false],
            ['100.65.201.133/3', '97.207.53.222', true]
        ].forEach((testCase) => {
            // arrange
            const cidrBlock = testCase[0];
            const ipAddress = testCase[1];
            const expected = testCase[2];

            it(`When CIDR is ${cidrBlock} and IP is ${ipAddress} Then ${expected} is returned`, () => {
                // act
                const result = cidrBlockCheck.v4.isInBlock(cidrBlock, ipAddress);

                // assert
                expect(result).to.equal(expected);
            });
        });
    });
});

describe('benchmark', () => {
    const buildTestSet = (size) => {
        const set = [];
        [...Array(size-1).keys()].map(() => {
            const cidr = [0, 1, 2, 3].map(() => Math.floor(Math.random() * 255)).join('.') + '/' + (Math.floor(Math.random() * 33));
            const ip = [0, 1, 2, 3].map(() => Math.floor(Math.random() * 255)).join('.');
            set.push([cidr, ip]);
        });
        return set;
    };

    [10000, 25000, 100000, 1000000].map((size) => {
        const set =  buildTestSet(size);
        it(size.toLocaleString(), () => {
            set.map((sample) => cidrBlockCheck.v4.isInBlock(sample[0], sample[1]));
        }).timeout(0);
    });
});
