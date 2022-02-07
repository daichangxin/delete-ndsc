#!/usr/bin/env zx

const rmFiles = async () => {
    await $`sudo rm -rf /usr/local/lib/ndsc`;
};

const killPids = async () => {
    return $`ps -ef | grep ndsc | grep -v grep | awk '{print $2}' `
        .then((res) => {
            const pids = res.stdout
                .replace('\r', '')
                .split('\n')
                .filter((pid) => !!pid);
            pids.forEach((pid) => {
                $`sudo kill -9 ${pid}`;
            });
        })
        .catch((err) => {
            //
        });
};

const start = async () => {
    await rmFiles();
    await killPids();
};

start();
