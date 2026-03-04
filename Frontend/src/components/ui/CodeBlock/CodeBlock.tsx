import React, { useState, useEffect } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { codeToHtml } from 'shiki';
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
    text: string;
    width?: string | number;
    height?: string | number;
    label?: string;
    filename?: string;
    showLineNumbers?: boolean;
    language?: string;
    highlightLines?: number[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({
    text,
    width = "100%",
    height = "auto",
    label = "Code",
    filename,
    showLineNumbers = true,
    language,
    highlightLines = [],
}) => {
    const [copied, setCopied] = useState(false);
    const [highlightedHtml, setHighlightedHtml] = useState<string>("");
    const [isLoading, setIsLoading] = useState(!!language);

    useEffect(() => {
        let isMounted = true;

        const highlightCode = async () => {
            if (!language) {
                setHighlightedHtml("");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const html = await codeToHtml(text, {
                    lang: language.toLowerCase() === 'js' ? 'javascript' : language.toLowerCase(),
                    theme: 'dark-plus', // Official VS Code Dark+ theme
                });

                if (isMounted) {
                    setHighlightedHtml(html);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Highlighting failed:", err);
                if (isMounted) {
                    setHighlightedHtml("");
                    setIsLoading(false);
                }
            }
        };

        highlightCode();
        return () => { isMounted = false; };
    }, [text, language]);

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
                    {filename ? (
                        <div className={styles.filename}>{filename}</div>
                    ) : (
                        <div className={styles.pill}>{label}</div>
                    )}
                    {isLoading && <Loader2 size={12} className="animate-spin text-gray-500" />}
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
                            <div
                                key={i}
                                className={highlightLines.includes(i + 1) ? styles.highlightLineNumber : ""}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.codeArea}>
                    {language && highlightedHtml ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                            className={styles.shikiWrapper}
                        />
                    ) : (
                        <pre className={styles.plainCode}>{text}</pre>
                    )}

                    {/* Line highlight overlays */}
                    <div className={styles.highlightOverlayContainer} aria-hidden="true">
                        {lines.map((_, i) => (
                            <div
                                key={i}
                                className={highlightLines.includes(i + 1) ? styles.lineHighlight : styles.emptyLine}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeBlock;
