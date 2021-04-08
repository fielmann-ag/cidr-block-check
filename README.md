# cidr-block-check [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs) ![build](https://github.com/piraluc/cidr-block-check/actions/workflows/node.js.yml/badge.svg)
NPM module that checks if a given IP address is part of a given CIDR block.

Details about CIDR can be found [here](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).

## Installation
```sh
npm i cidr-block-check
```

## Usage

```js
import cidrBlockCheck from 'cidr-block-check';

const cidr = '192.168.0.0/22';
const ip = '192.168.2.10';

console.log(cidrBlockCheck.v4.isInBlock(cidr,ip));
// true
```
