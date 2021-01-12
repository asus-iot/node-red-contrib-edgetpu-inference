const meminfo = require('bindings')('meminfo');

// Self Check
if(meminfo.get() === false || meminfo.free() === false){
    throw new Error('Unsupported operating system.');
}

module.exports = meminfo;
