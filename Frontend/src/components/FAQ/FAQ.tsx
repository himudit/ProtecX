import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Do I need any coding experience?",
        answer: "No. ProtecX is completely no-code and designed for founders of all technical backgrounds."
    },
    {
        question: "Can I use my own domain?",
        answer: "Yes, you can easily connect your own custom domain to your project."
    },
    {
        question: "Is ProtecX suitable for solo founders?",
        answer: "Absolutely. Our platform is designed to help solo founders build and scale quickly without needing a large team."
    },
    {
        question: "Can I upgrade or downgrade my plan later?",
        answer: "Yes, you can change your plan at any time from your billing dashboard."
    },
    {
        question: "What happens after my free trial ends?",
        answer: "You will be automatically downgraded to the free tier, unless you choose to upgrade to a paid plan."
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
