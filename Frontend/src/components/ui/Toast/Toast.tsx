import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import type { RootState } from '@/store';
import { hideToast } from '@/store/slices/toastSlice';

const Toast: React.FC = () => {
    const { isOpen, message, type } = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen && type !== 'loading') {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, type, dispatch]);

    if (!isOpen) return null;

    const getBackgroundColor = () => {
        switch (type) {
            case 'loading':
                return 'var(--bg-tertiary)';
            case 'success':
                return '#10b981';
            case 'error':
                return '#ef4444';
            default:
                return 'var(--bg-tertiary)';
        }
    };

    return (
        <div
            className="fixed right-[25px] top-[30px] z-[99999]"
            style={{
                animation: 'toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            <div
                style={{
                    backgroundColor: getBackgroundColor(),
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: type === 'loading' ? '1px solid rgba(255,255,255,0.2)' : 'none',
                }}
            >
                <div className="flex shrink-0 items-center justify-center">
                    {type === 'success' && <CheckCircle2 size={20} />}
                    {type === 'error' && <AlertCircle size={20} />}
                    {type === 'loading' && <Loader2 size={20} className="animate-spin" />}
                </div>

                <span style={{ fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {message}
                </span>

                {type !== 'loading' && (
                    <button
                        onClick={() => dispatch(hideToast())}
                        className="ml-2 flex p-1 hover:bg-black/10 rounded-lg transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <style>{`
                @keyframes toastIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Toast;
