interface Mem {
    total: number;
    used: number;
    free: number;
    shared: number;
    buff: number;
    cache: number;
    available: number;
}

interface Swap {
    total: number;
    used: number;
    free: number;
}

interface Free {
    mem: Mem;
    swap: Swap;
}

declare module "node-meminfo" {
    /**
     * Get memory information. The unit is byte.
     * @returns {object} An object including all fields in /proc/meminfo.
     */
    export function get(): object;

    /**
     * Get memory information to "free" style. The unit is byte.
     * @returns {Free}
     */
    export function free(): Free;
}
