import { $ } from "bun";
import { test, expect, describe, beforeEach, afterEach } from "bun:test";

const OHA_PATH = process.env.OHA_PATH || "./oha-linux-amd64";

type OhaOutput = {
  summary: {
    requestsPerSec: number;
    successRate: number;
  };
  latencyPercentiles: {
    p50: number;
    p95: number;
    p99: number;
  };
};

function logResult(out: OhaOutput, label: string): void {
  console.info(
    `${label.padStart(10)}: ${Number(out.summary.requestsPerSec).toExponential(
      3
    )} req/s, ${Number(out.latencyPercentiles.p50).toExponential(
      3
    )} s p50, ${Number(out.latencyPercentiles.p95).toExponential(
      3
    )} s p95, ${Number(out.latencyPercentiles.p99).toExponential(3)} s p99`
  );
}

let hello: Bun.Subprocess;
let nodeProxy: Bun.Subprocess;
let bunProxy: Bun.Subprocess;

describe("benchamarks", () => {
  beforeEach(async () => {
    // Start the hello world server
    hello = Bun.spawn({
      cmd: ["bun", "hello.ts"],
      stdout: "pipe",
      stderr: "pipe",
      env: {
        PATH: process.env.PATH || "",
      },
    });

    // Start the node proxy server
    nodeProxy = Bun.spawn({
      cmd: ["bun", "run", "start:node"],
      stdout: "pipe",
      stderr: "pipe",
      env: {
        PATH: process.env.PATH || "",
      },
    });

    // Start the bun proxy server
    bunProxy = Bun.spawn({
      cmd: ["bun", "run", "start:bun"],
      stdout: "pipe",
      stderr: "pipe",
      env: {
        PATH: process.env.PATH || "",
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  afterEach(() => {
    hello.kill();
    nodeProxy.kill();
    bunProxy.kill();
  });

  test.serial("direct access to hello-world", async () => {
    const out: OhaOutput =
      await $`${OHA_PATH} http://localhost:9000/ -z 5s -w --no-tui --output-format=json`.json();
    expect(out.summary.successRate).toEqual(1);
    expect(out.summary.requestsPerSec).toBeGreaterThan(100);
    logResult(out, "Direct");
  });

  test.serial("proxy with bun", async () => {
    const out: OhaOutput =
      await $`${OHA_PATH} http://localhost:8001/ -z 5s -w --no-tui --output-format=json`.json();
    expect(out.summary.successRate).toEqual(1);
    expect(out.summary.requestsPerSec).toBeGreaterThan(100);
    logResult(out, "Bun");
  });

  test.serial("proxy with node", async () => {
    const out: OhaOutput =
      await $`${OHA_PATH} http://localhost:8000/ -z 5s -w --no-tui --output-format=json`.json();
    expect(out.summary.successRate).toEqual(1);
    expect(out.summary.requestsPerSec).toBeGreaterThan(100);
    logResult(out, "Node");
  });
});
