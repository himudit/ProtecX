import React from 'react';

const API = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 font-mono">REST API</h1>
            <p className="text-gray-600 mb-8 max-w-2xl">
                The ProtecX REST API allows you to interact with our platform programmatically.
                Everything from managing projects to retrieving logs.
            </p>
            <div className="space-y-4">
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900/50 p-3 rounded border border-gray-100 dark:border-gray-800">
                    <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-mono font-bold">GET</span>
                    <code className="text-sm font-mono text-gray-700 dark:text-gray-300">/api/v1/projects</code>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900/50 p-3 rounded border border-gray-100 dark:border-gray-800">
                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-xs font-mono font-bold">POST</span>
                    <code className="text-sm font-mono text-gray-700 dark:text-gray-300">/api/v1/projects</code>
                </div>
            </div>
        </div>
    );
};

export default API;
