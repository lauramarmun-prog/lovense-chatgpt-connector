import assert from "node:assert/strict";
import test from "node:test";
import io from "socket.io-client";

test("the security-patched Socket.IO 2 client can parse Lovense socket URLs", () => {
  const socket = io("https://example.com:443", { transports: ["websocket"], reconnection: false });
  assert.equal(typeof socket.close, "function");
  socket.close();
});
