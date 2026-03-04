import React from 'react';

const Features = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Core Features</h1>
            <p className="text-gray-600 mb-8 max-w-2xl">
                Explore the powerful features that make ProtecX the ultimate security layer for your applications.
            </p>
            <div className="space-y-6">
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <h3 className="font-bold text-lg mb-2">Automated Threat Detection</h3>
                    <p className="text-gray-500">Real-time analysis to stop attacks before they happen.</p>
                </div>
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <h3 className="font-bold text-lg mb-2">Global Edge Network</h3>
                    <p className="text-gray-500">Zero-latency security deployed worldwide.</p>
                </div>
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <h3 className="font-bold text-lg mb-2">Advanced Analytics</h3>
                    <p className="text-gray-500">Deep insights into every request and security event.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;
