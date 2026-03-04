import React from 'react';

const DocsOverview = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Documentation Overview</h1>
            <p className="text-gray-600 mb-6">
                Welcome to the ProtecX Documentation. Get a quick high-level overview of our platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Secure</h3>
                    <p className="text-gray-500">Advanced protection for your applications.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Fast</h3>
                    <p className="text-gray-500">Optimized performance and global reach.</p>
                </div>
            </div>
        </div>
    );
};

export default DocsOverview;
