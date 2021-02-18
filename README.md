# cidr-block-check
NPM module that checks if a given IP address is part of a given CIDR block.

Details about CIDR can be found [here](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).

## Usage
```sh
npm i cidr-block-check
```

```js
import cidrBlockCheck from 'cidr-block-check';

const cidr = '192.168.1.17/22';
const ip = '192.168.2.10';

console.log(cidrBlockCheck.v4.isInBlock(cidr,ip));
// true
```
