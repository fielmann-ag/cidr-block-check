import assert from 'assert';
import isCidr from 'is-cidr';
import isIp from 'is-ip';

class CidrBlockCheck {
    static get v4() {
        return {
            isInBlock: (cidrBlock, ip) => {
                assert(isCidr.v4(cidrBlock), `${cidrBlock} is not an IPv4 CIDR block`);
                assert(isIp.v4(ip), `${ip} is not an IPv4 address`);

                const cidrComponents = cidrBlock.split('/');
                const cidrPrefixLength = Number(cidrComponents[1]);

                if (cidrPrefixLength === 0) {
                    return true;
                }

                const cidrOctetList = cidrComponents[0].split('.').map(Number);
                const ipOctetList = ip.split('.').map(Number);

                const cidrSuffixLength = 32 - cidrPrefixLength;

                let cidrUnsigned32Bit = 0;
                let ipUnsigned32Bit = 0;

                [24, 16, 8, 0].forEach((shiftBy, index) => {
                    cidrUnsigned32Bit = cidrUnsigned32Bit + ((cidrOctetList[index] << shiftBy) >>> 0);
                    ipUnsigned32Bit = ipUnsigned32Bit + ((ipOctetList[index] << shiftBy) >>> 0);
                });

                const cidrRemainderBits = (cidrUnsigned32Bit >>> cidrSuffixLength) >>> 0;
                const ipRemainderBits = (ipUnsigned32Bit >>> cidrSuffixLength) >>> 0;

                return cidrRemainderBits === ipRemainderBits;
            }
        };
    };
};

export default CidrBlockCheck;
