import React from 'react';

const SDKs = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Official SDKs</h1>
            <p className="text-gray-600 mb-8">
                Explore our official SDKs for your favorite languages and frameworks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md cursor-pointer">
                    <h3 className="text-xl font-bold mb-2">JavaScript / TypeScript</h3>
                    <p className="text-sm text-gray-500">Perfect for React, Vue, Svelte, and Node.js.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md cursor-pointer">
                    <h3 className="text-xl font-bold mb-2">Python</h3>
                    <p className="text-sm text-gray-500">Official SDK for Django and Flask.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md cursor-pointer">
                    <h3 className="text-xl font-bold mb-2">Go</h3>
                    <p className="text-sm text-gray-500">Native Go package for high-performance apps.</p>
                </div>
            </div>
        </div>
    );
};

export default SDKs;
