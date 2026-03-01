import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
    text: string;
    width?: string | number;
    height?: string | number;
    label?: string;
    showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
    text,
    width = "100%",
    height = "auto",
    label = "Shell",
    showLineNumbers = true,
}) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code: ", err);
        }
    };

    const lines = text.split("\n");

    return (
        <div
            className={styles.codeBlockContainer}
            style={{ width, height }}
        >
            <div className={styles.header}>
                <div className={styles.labelWrapper}>
                    <div className={styles.pill}>{label}</div>
                </div>
                <button
                    onClick={copyToClipboard}
                    className={styles.copyButton}
                    aria-label="Copy to Clipboard"
                    title="Copy to Clipboard"
                >
                    {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                </button>
            </div>

            <div className={styles.contentWrapper}>
                {showLineNumbers && (
                    <div className={styles.lineNumbers} aria-hidden="true">
                        {lines.map((_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>
                )}
                <div className={styles.codeArea}>
                    {text}
                </div>
            </div>
        </div>
    );
};

export default CodeBlock;
