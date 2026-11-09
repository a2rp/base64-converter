export const encodeUtf8Base64 = (value, urlSafe = false) => {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    for (let index = 0; index < bytes.length; index += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
    }
    const encoded = btoa(binary);
    return urlSafe
        ? encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
        : encoded;
};

export const decodeUtf8Base64 = (value) => {
    const invalidBase64 = new Error("Enter valid Base64 text, then try again.");
    const cleaned = value
        .replace(/\s/g, "")
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    if (cleaned.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) {
        throw invalidBase64;
    }
    const unpadded = cleaned.replace(/=+$/g, "");
    const existingPadding = cleaned.length - unpadded.length;
    const requiredPadding = (4 - (unpadded.length % 4)) % 4;
    if (existingPadding && (cleaned.length % 4 !== 0 || existingPadding !== requiredPadding)) {
        throw invalidBase64;
    }
    const padded = unpadded + "=".repeat(requiredPadding);
    let binary;
    try {
        binary = atob(padded);
    } catch {
        throw invalidBase64;
    }
    if (btoa(binary) !== padded) throw invalidBase64;
    const bytes = Uint8Array.from(binary, (character) =>
        character.charCodeAt(0),
    );
    try {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
        throw new Error("This Base64 value does not contain valid UTF-8 text.");
    }
};
