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
    const cleaned = value
        .replace(/\s/g, "")
        .replace(/-/g, "+")
        .replace(/_/g, "/");
    if (cleaned.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) {
        throw new Error("Enter valid Base64 text, then try again.");
    }
    const padded = cleaned + "=".repeat((4 - (cleaned.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) =>
        character.charCodeAt(0),
    );
    try {
        return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
        throw new Error("This Base64 value does not contain valid UTF-8 text.");
    }
};
