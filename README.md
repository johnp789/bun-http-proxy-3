# bun-http-proxy-3

To install dependencies:

```bash
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm install 22
fnm use 22

bun install

curl -sSLO https://github.com/hatoo/oha/releases/download/v1.10.0/oha-linux-amd64
# or https://github.com/hatoo/oha/releases/download/v1.10.0/oha-linux-arm64
# or https://github.com/hatoo/oha/releases/download/v1.10.0/oha-macos-arm64
chmod a+x oha-*
mv oha-* ~/.local/bin # or somewhere in PATH
```

## Results with Intel Core i4-1240P laptop in WSL2

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

## Results with EC2 c6g.xlarge (Graviton2)

```
$ OHA_PATH=./oha-linux-arm64 bun test --timeout=10000
bun test v1.3.0 (b0a6feca)

benchmark.test.ts:
    Direct: 4.194e+4 req/s, 1.131e-3 s p50, 1.470e-3 s p95, 2.232e-3 s p99
✓ benchamarks > direct access to hello-world [6065.82ms]
       Bun: 5.199e+3 req/s, 8.699e-3 s p50, 1.264e-2 s p95, 1.856e-2 s p99
✓ benchamarks > proxy with bun [6022.82ms]
      Node: 2.563e+3 req/s, 1.667e-2 s p50, 3.042e-2 s p95, 3.913e-2 s p99
✓ benchamarks > proxy with node [6028.16ms]

 3 pass
 0 fail
 6 expect() calls
Ran 3 tests across 1 file. [18.13s]
```

## Results with EC2 c8g.xlarge (Graviton4)

```
$ OHA_PATH=./oha-linux-arm64 bun test --timeout=10000
bun test v1.3.0 (b0a6feca)

benchmark.test.ts:
    Direct: 7.778e+4 req/s, 6.342e-4 s p50, 6.906e-4 s p95, 8.525e-4 s p99
✓ benchamarks > direct access to hello-world [6067.41ms]
       Bun: 1.287e+4 req/s, 3.558e-3 s p50, 4.600e-3 s p95, 6.614e-3 s p99
✓ benchamarks > proxy with bun [6019.30ms]
      Node: 8.188e+3 req/s, 5.652e-3 s p50, 7.572e-3 s p95, 1.157e-2 s p99
✓ benchamarks > proxy with node [6016.26ms]

 3 pass
 0 fail
 6 expect() calls
Ran 3 tests across 1 file. [18.11s]
```

## Results with MacBook Pro (M1 Pro, Linux vz VM)

```
$ OHA_PATH=./oha-linux-arm64 bun test --timeout=10000
bun test v1.3.0 (b0a6feca)

benchmark.test.ts:
    Direct: 1.379e+5 req/s, 3.190e-4 s p50, 6.425e-4 s p95, 7.972e-4 s p99
✓ benchamarks > direct access to hello-world [6157.02ms]
       Bun: 1.946e+4 req/s, 2.278e-3 s p50, 4.077e-3 s p95, 5.456e-3 s p99
✓ benchamarks > proxy with bun [6044.40ms]
      Node: 8.163e+3 req/s, 5.710e-3 s p50, 7.975e-3 s p95, 1.150e-2 s p99
✓ benchamarks > proxy with node [6023.15ms]

 3 pass
 0 fail
 6 expect() calls
Ran 3 tests across 1 file. [18.23s]
```
