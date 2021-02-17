import cidrBlockCheck from './index.js';
import {expect} from 'chai';
import {describe, it} from "mocha";

describe('unit tests IPv4', () => {
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
});
