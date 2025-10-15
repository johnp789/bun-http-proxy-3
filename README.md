# bun-http-proxy-3

To install dependencies:

```bash
bun install
curl -sSLO https://github.com/hatoo/oha/releases/download/v1.10.0/oha-linux-amd64
# or https://github.com/hatoo/oha/releases/download/v1.10.0/oha-linux-arm64
# or https://github.com/hatoo/oha/releases/download/v1.10.0/oha-macos-arm64
chmod a+x oha-*
```

## Results

```
$ OHA_PATH=./oha-linux-amd64 bun test --timeout=10000
bun test v1.3.0 (b0a6feca)

benchmark.test.ts:
    Direct: 8.459e+4 req/s, 5.170e-4 s p50, 1.062e-3 s p95, 1.694e-3 s p99
✓ benchamarks > direct access to hello-world [6163.80ms]
       Bun: 1.060e+4 req/s, 3.859e-3 s p50, 8.187e-3 s p95, 1.169e-2 s p99
✓ benchamarks > proxy with bun [6044.34ms]
      Node: 4.515e+3 req/s, 9.877e-3 s p50, 1.717e-2 s p95, 2.568e-2 s p99
✓ benchamarks > proxy with node [6031.23ms]

 3 pass
 0 fail
 6 expect() calls
Ran 3 tests across 1 file. [18.27s]
```
