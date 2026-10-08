import { useMemo, useState } from "react";
import {
    LuArrowLeftRight,
    LuCheck,
    LuCopy,
    LuFileCode2,
    LuLockKeyhole,
    LuType,
} from "react-icons/lu";
import { decodeUtf8Base64, encodeUtf8Base64 } from "../../utils/base64.js";
import styles from "./styles.module.css";

const maxCharacters = 120000;

const ConverterPanel = ({
    value,
    onChange,
    mode,
    onModeChange,
    urlSafe,
    onUrlSafeChange,
    onUseOutput,
}) => {
    const [copyMessage, setCopyMessage] = useState("");
    const result = useMemo(() => {
        if (!value) return { output: "", error: "" };
        try {
            return {
                output:
                    mode === "encode"
                        ? encodeUtf8Base64(value, urlSafe)
                        : decodeUtf8Base64(value),
                error: "",
            };
        } catch (error) {
            return { output: "", error: error.message };
        }
    }, [value, mode, urlSafe]);
    const inputCharacters = Array.from(value).length;
    const inputBytes = new TextEncoder().encode(value).length;

    const copyOutput = async () => {
        try {
            await navigator.clipboard.writeText(result.output);
            setCopyMessage("Copied");
        } catch {
            setCopyMessage("Clipboard unavailable");
        }
        window.setTimeout(() => setCopyMessage(""), 1700);
    };

    return (
        <section
            className={styles.converterPanel}
            aria-label="Base64 text conversion"
        >
            <div className={styles.panelToolbar}>
                <div
                    className={styles.modeSwitch}
                    role="group"
                    aria-label="Conversion direction"
                >
                    <button
                        className={mode === "encode" ? styles.modeActive : ""}
                        type="button"
                        aria-pressed={mode === "encode"}
                        onClick={() => onModeChange("encode")}
                    >
                        <LuType aria-hidden="true" /> Encode
                    </button>
                    <button
                        className={mode === "decode" ? styles.modeActive : ""}
                        type="button"
                        aria-pressed={mode === "decode"}
                        onClick={() => onModeChange("decode")}
                    >
                        <LuFileCode2 aria-hidden="true" /> Decode
                    </button>
                </div>
                <label className={styles.urlSafeToggle}>
                    <input
                        type="checkbox"
                        checked={urlSafe}
                        onChange={(event) =>
                            onUrlSafeChange(event.target.checked)
                        }
                    />
                    <span className={styles.toggleTrack} aria-hidden="true">
                        <span />
                    </span>
                    <span>URL-safe output</span>
                    <LuLockKeyhole aria-hidden="true" />
                </label>
            </div>

            <div className={styles.conversionGrid}>
                <div className={styles.textPanel}>
                    <div className={styles.textPanelHeader}>
                        <label htmlFor="base64-input">
                            {mode === "encode" ? "Plain text" : "Base64 text"}
                        </label>
                        <span>INPUT</span>
                    </div>
                    <textarea
                        id="base64-input"
                        maxLength={maxCharacters}
                        spellCheck="false"
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        placeholder={
                            mode === "encode"
                                ? "Type or paste text here..."
                                : "Paste a Base64 string here..."
                        }
                    />
                    <div className={styles.textPanelFooter}>
                        <span>
                            {inputCharacters.toLocaleString()} characters
                        </span>
                        <span>{inputBytes.toLocaleString()} bytes</span>
                    </div>
                </div>

                <div className={styles.directionControl} aria-hidden="true">
                    <LuArrowLeftRight />
                </div>

                <div className={`${styles.textPanel} ${styles.outputPanel}`}>
                    <div className={styles.textPanelHeader}>
                        <label htmlFor="base64-output">
                            {mode === "encode"
                                ? "Base64 output"
                                : "Decoded text"}
                        </label>
                        <button
                            className={styles.copyButton}
                            type="button"
                            disabled={!result.output}
                            onClick={copyOutput}
                        >
                            {copyMessage === "Copied" ? (
                                <LuCheck aria-hidden="true" />
                            ) : (
                                <LuCopy aria-hidden="true" />
                            )}
                            {copyMessage || "Copy"}
                        </button>
                    </div>
                    <textarea
                        id="base64-output"
                        readOnly
                        spellCheck="false"
                        value={result.output}
                        placeholder="Your result will appear here..."
                    />
                    <div className={styles.textPanelFooter}>
                        <span>
                            {result.output.length.toLocaleString()} characters
                        </span>
                        <button
                            type="button"
                            disabled={!result.output}
                            onClick={() =>
                                onUseOutput(
                                    result.output,
                                    mode === "encode" ? "decode" : "encode",
                                )
                            }
                        >
                            Use as input
                        </button>
                    </div>
                </div>
            </div>
            <p
                className={`${styles.feedback} ${result.error ? styles.errorMessage : ""}`}
                role={result.error ? "alert" : "status"}
            >
                {result.error || copyMessage}
            </p>
            <p className={styles.privacyNote}>
                Text is converted in this browser and is not sent to a server.
                Input is limited to 120,000 characters.
            </p>
        </section>
    );
};

export default ConverterPanel;
