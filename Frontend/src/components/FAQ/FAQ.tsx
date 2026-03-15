import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How secure is ProtecX?",
        answer: "ProtecX is built with security as a priority. It uses secure authentication practices, encrypted communication, and signed tokens to protect user data and ensure safe authentication across applications."
    },
    {
        question: "Does ProtecX support multi-factor authentication (MFA)?",
        answer: "Currently, ProtecX does not support multi-factor authentication (MFA). However, MFA support is planned for future updates to provide an additional layer of account security."
    },
    {
        question: "How do other microservices verify authentication tokens?",
        answer: "ProtecX issues JWT tokens for authenticated users. These tokens are signed using a SHA-256–based signing process, and other microservices can verify them using the public key provided by ProtecX to ensure the token is valid and untampered."
    },
    {
        question: "Are errors handled properly?",
        answer: "Yes. ProtecX provides built-in error handling through the SDK. Developers can use the handleError function to manage errors, and the SDK automatically surfaces clear messages that can be displayed in the UI."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className={styles.faqContainer}>
                {/* Header */}
                <div className={styles.faqHeader}>
                    <div className={styles.faqBadge}>Have questions?</div>
                    <h2 className={styles.faqTitle}>
                        <i>Everything you</i><br />
                        need to know
                    </h2>
                    <p className={styles.faqSubtitle}>
                        Here are answers to the most common questions<br />
                        founders ask before getting started.
                    </p>
                </div>

                {/* Accordion */}
                <div className={styles.faqList}>
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={styles.faqItem}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className={styles.faqQuestion}>
                                    <h3 className={styles.questionText}>{faq.question}</h3>
                                    <div className={styles.toggleIcon}>
                                        {isOpen ? <X size={20} /> : <Plus size={20} />}
                                    </div>
                                </div>
                                <div className={`${styles.faqAnswerContainer} ${isOpen ? styles.faqAnswerContainerOpen : ''}`}>
                                    <p className={styles.faqAnswerText}>{faq.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
