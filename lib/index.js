#!/usr/bin/env zx
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { $ } from 'zx';
const rmFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    yield $ `sudo rm -rf /usr/local/lib/ndsc`;
});
const killPids = () => __awaiter(void 0, void 0, void 0, function* () {
    return $ `ps -ef | grep ndsc | grep -v grep | awk '{print $2}' `
        .then((res) => {
        const pids = res.stdout
            .replace('\r', '')
            .split('\n')
            .filter((pid) => !!pid);
        pids.forEach((pid) => {
            $ `sudo kill -9 ${pid}`;
        });
    })
        .catch((err) => {
        console.log(err);
    });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield rmFiles();
    yield killPids();
});
start();
