import { useState } from "react";
import BackToTop from "./components/backToTop/index.jsx";
import ConverterPanel from "./components/converterPanel/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const sampleText = "Hello from Base64 Studio 👋\nUTF-8 keeps café, 東京, and emoji readable.";

const App = () => {
    const [value, setValue] = useState(sampleText);
    const [mode, setMode] = useState("encode");
    const [urlSafe, setUrlSafe] = useState(false);

    const useOutputAsInput = (nextValue, nextMode) => {
        setValue(nextValue);
        setMode(nextMode);
    };

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.pageContent}>
                <section className={styles.introduction} id="converter">
                    <div>
                        <h1>Encode and decode<br /><span>text with Base64.</span></h1>
                        <p>Convert UTF-8 text in either direction and keep the result ready to copy.</p>
                    </div>
                    <div className={styles.localBadge}><span />Runs in your browser</div>
                </section>
                <ConverterPanel
                    value={value}
                    onChange={setValue}
                    mode={mode}
                    onModeChange={setMode}
                    urlSafe={urlSafe}
                    onUrlSafeChange={setUrlSafe}
                    onUseOutput={useOutputAsInput}
                />
                <div className={styles.encodingNotes}>
                    <span><strong>UTF-8 aware</strong> Accented text and emoji stay intact.</span>
                    <span><strong>Standard or URL-safe</strong> Choose the output format for your use case.</span>
                    <span><strong>Private by design</strong> Your text stays on this device.</span>
                </div>
            </main>
            <SiteFooter />
            <BackToTop />
        </div>
    );
};

export default App;
