import { FaGithub } from "react-icons/fa6";
import { LuBinary } from "react-icons/lu";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
            <a className={styles.brand} href="#top">
                <span className={styles.brandMark}>
                    <LuBinary aria-hidden="true" />
                </span>
                <span>Base64 Studio</span>
            </a>
            <a className={styles.sectionLink} href="#converter">
                Text converter
            </a>
            <a
                className={styles.repositoryLink}
                href="https://github.com/a2rp/base64-converter"
                target="_blank"
                rel="noreferrer"
            >
                <FaGithub aria-hidden="true" />
                <span>Repository</span>
            </a>
        </div>
    </header>
);

export default SiteHeader;
