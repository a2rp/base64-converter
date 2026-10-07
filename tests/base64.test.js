import assert from "node:assert/strict";
import test from "node:test";
import { decodeUtf8Base64, encodeUtf8Base64 } from "../src/utils/base64.js";

test("encodes and decodes UTF-8 text", () => {
    const sample = "café 東京 👋";
    assert.equal(decodeUtf8Base64(encodeUtf8Base64(sample)), sample);
});

test("encodes URL-safe Base64 and decodes it without padding", () => {
    const sample = "ûÿ";
    const encoded = encodeUtf8Base64(sample, true);
    assert.doesNotMatch(encoded, /[+/=]/);
    assert.equal(decodeUtf8Base64(encoded), sample);
});

test("accepts standard Base64 without padding", () => {
    const encoded = encodeUtf8Base64("hello").replace(/=+$/g, "");
    assert.equal(decodeUtf8Base64(encoded), "hello");
});

test("rejects invalid Base64 and invalid UTF-8 byte sequences", () => {
    assert.throws(() => decodeUtf8Base64("%%%"), /valid Base64/);
    assert.throws(() => decodeUtf8Base64("/w=="), /valid UTF-8/);
});
