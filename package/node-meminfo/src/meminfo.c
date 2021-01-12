#include <node_api.h>
#include <stdio.h>
#include <string.h>

napi_value createFalse(napi_env env){
        napi_value result;
        napi_get_boolean(env, false, &result);
        return result;
}

napi_value get(napi_env env, napi_callback_info info){
        FILE *file;
        file = fopen("/proc/meminfo", "r");
        if (file) {
                napi_value obj;
                napi_create_object(env, &obj);
                size_t status = 0;
                char c;
                char key[80];
                size_t pointer = 0;
                int64_t sum = 0;
                while (true) {
                        c = getc(file);
                        if(c == ':') {
                                status = 1;
                        }else if((status == 1 || status == 2) && c >= '0' && c <= '9') {
                                if(status != 2) {
                                        status = 2;
                                        sum = 0;
                                }
                                sum = sum * 10 + c - '0';
                        }else if(c == '\n' || c == EOF) {
                                if(status == 2) {
                                        key[pointer] = '\0';
                                        napi_value value;
                                        napi_create_int64(env, sum * 1024, &value);
                                        napi_set_named_property(env, obj, key, value);
                                }
                                if(c == EOF) {
                                        break;
                                }
                                status = 0;
                                pointer = 0;
                        }else if(status == 0) {
                                key[pointer++] = c;
                        }
                }
                fclose(file);
                return obj;
        }
        return createFalse(env);
}

napi_value getFree(napi_env env, napi_callback_info info){
        FILE *file;
        file = fopen("/proc/meminfo", "r");
        if (file) {
                size_t status = 0;
                char c;
                char key[13];
                size_t pointer = 0;
                int64_t sum = 0;
                int64_t MemTotal = -1, MemFree = -1, Buffers = -1, Cached = -1, Slab = -1, Shmem = -1, MemAvailable = -1, SwapTotal = -1, SwapFree = -1, SwapCached = -1;
                int64_t* target;
                uint32_t counter = 0;
                while (true) {
                        c = getc(file);
                        if(status == 0) {
                                if(pointer < 13) {
                                        if(c == ':') {
                                                key[pointer] = '\0';
                                                target = NULL;
                                                if(MemTotal == -1 && strcmp("MemTotal", key) == 0) {
                                                        target = &MemTotal;
                                                }else if(MemFree == -1 && strcmp("MemFree", key) == 0) {
                                                        target = &MemFree;
                                                }else if(Buffers == -1 && strcmp("Buffers", key) == 0) {
                                                        target = &Buffers;
                                                }else if(Cached == -1 && strcmp("Cached", key) == 0) {
                                                        target = &Cached;
                                                }else if(Slab == -1 && strcmp("Slab", key) == 0) {
                                                        target = &Slab;
                                                }else if(Shmem == -1 && strcmp("Shmem", key) == 0) {
                                                        target = &Shmem;
                                                }else if(MemAvailable == -1 && strcmp("MemAvailable", key) == 0) {
                                                        target = &MemAvailable;
                                                }else if(SwapTotal == -1 && strcmp("SwapTotal", key) == 0) {
                                                        target = &SwapTotal;
                                                }else if(SwapFree == -1 && strcmp("SwapFree", key) == 0) {
                                                        target = &SwapFree;
                                                }else if(SwapCached == -1 && strcmp("SwapCached", key) == 0) {
                                                        target = &SwapCached;
                                                }
                                                if(target != NULL) {
                                                        status = 1;
                                                }else{
                                                        status = 3;
                                                }
                                        }else{
                                                key[pointer++] = c;
                                        }
                                }else{
                                        status = 3;
                                }
                        }else if(c >= '0' && c <= '9') {
                                if(status == 1 || status == 2) {
                                        if(status != 2) {
                                                status = 2;
                                                sum = 0;
                                        }
                                        sum = sum * 10 + c - '0';
                                }
                        }else if(c == '\n' || c == EOF) {
                                if(status == 2) {
                                        *target = sum * 1024;
                                        ++counter;
                                }
                                if(c == EOF) {
                                        break;
                                }
                                status = 0;
                                pointer = 0;
                        }
                }
                fclose(file);
                if(counter != 10) {
                        return createFalse(env);
                }
                int64_t totalCached = Cached + Slab;
                napi_value obj, mem, swap;
                napi_create_object(env, &obj);
                napi_create_object(env, &mem);
                napi_create_object(env, &swap);
                napi_set_named_property(env, obj, "mem", mem);
                napi_set_named_property(env, obj, "swap", swap);

                napi_value memTotal, memUsed, memFree, memShared, memBuff, memCache, memAvailable, swapTotal, swapUsed, swapFree;
                napi_create_int64(env, MemTotal, &memTotal);
                napi_create_int64(env, MemTotal - MemFree - Buffers - totalCached, &memUsed);
                napi_create_int64(env, MemFree, &memFree);
                napi_create_int64(env, Shmem, &memShared);
                napi_create_int64(env, Buffers, &memBuff);
                napi_create_int64(env, totalCached, &memCache);
                napi_create_int64(env, MemAvailable, &memAvailable);
                napi_create_int64(env, SwapTotal, &swapTotal);
                napi_create_int64(env, SwapTotal - SwapFree - SwapCached, &swapUsed);
                napi_create_int64(env, SwapFree, &swapFree);

                napi_set_named_property(env, mem, "total", memTotal);
                napi_set_named_property(env, mem, "used", memUsed);
                napi_set_named_property(env, mem, "free", memFree);
                napi_set_named_property(env, mem, "shared", memShared);
                napi_set_named_property(env, mem, "buff", memBuff);
                napi_set_named_property(env, mem, "cache", memCache);
                napi_set_named_property(env, mem, "available", memAvailable);
                napi_set_named_property(env, swap, "total", swapTotal);
                napi_set_named_property(env, swap, "used", swapUsed);
                napi_set_named_property(env, swap, "free", swapFree);
                return obj;
        }
        return createFalse(env);
}

napi_value Init (napi_env env, napi_value exports) {
        napi_property_descriptor allDesc[] = {
                {"get", 0, get, 0, 0, 0, napi_default, 0},
                {"free", 0, getFree, 0, 0, 0, napi_default, 0}
        };
        napi_define_properties(env, exports, 2, allDesc);
        return exports;
}

NAPI_MODULE(meminfo, Init);
