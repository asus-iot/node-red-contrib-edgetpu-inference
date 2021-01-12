meminfo For Node.js
=================================

## Introduction

Get memory information on Linux.

## Installation

Run `npm i` or `npm install` to install.

```bash
npm install node-meminfo
```

If you want to save this module to package.json, please add `--save` option.

```bash
npm install node-meminfo --save
```

## Initialization

Import this module by using `require` function.

```javascript
const meminfo = require('node-meminfo');
```

## Usage

You can use `get` function to get the fields and values from `/proc/meminfo`.

```javascript
var result = meminfo.get();
// { MemTotal: 33638309888,
//   MemFree: 6813110272,
//   MemAvailable: 25217355776,
//   Buffers: 45658112,
//   Cached: 17956536320,
//   SwapCached: 0,
//   Active: 20752044032,
//   Inactive: 4362379264,
//   'Active(anon)': 7117885440,
//   'Inactive(anon)': 199598080,
//   'Active(file)': 13634158592,
//   'Inactive(file)': 4162781184,
//   Unevictable: 1343488,
//   Mlocked: 1343488,
//   SwapTotal: 0,
//   SwapFree: 0,
//   Dirty: 1826816,
//   Writeback: 0,
//   AnonPages: 6723411968,
//   Mapped: 1297338368,
//   Shmem: 205258752,
//   Slab: 1387651072,
//   SReclaimable: 1089368064,
//   SUnreclaim: 298283008,
//   KernelStack: 23089152,
//   PageTables: 84766720,
//   NFS_Unstable: 0,
//   Bounce: 0,
//   WritebackTmp: 0,
//   CommitLimit: 16819154944,
//   Committed_AS: 18899087360,
//   VmallocTotal: 35184372087808,
//   VmallocUsed: 0,
//   VmallocChunk: 0,
//   HardwareCorrupted: 0,
//   AnonHugePages: 3951034368,
//   ShmemHugePages: 0,
//   ShmemPmdMapped: 0,
//   CmaTotal: 0,
//   CmaFree: 0,
//   HugePages_Total: 0,
//   HugePages_Free: 0,
//   HugePages_Rsvd: 0,
//   HugePages_Surp: 0,
//   Hugepagesize: 2097152,
//   DirectMap4k: 3071623168,
//   DirectMap2M: 26895974400,
//   DirectMap1G: 5368709120 }
```

If you like to use `free` command on Linux, you probably prefer to use `free` function to get the objects which have the same fields as `free` command's.

```javascript
var result = meminfo.free();
// { mem:
//    { total: 33638309888,
//      used: 7504060416,
//      free: 6697676800,
//      shared: 211382272,
//      buff: 45658112,
//      cache: 19390914560,
//      available: 25142546432 },
//   swap: { total: 0, used: 0, free: 0 } }
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
npm install
npm test
```

## License

[MIT](LICENSE)
