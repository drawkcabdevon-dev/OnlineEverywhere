
import React from 'react';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
    <pre className="bg-gray-900 text-sm text-indigo-300 p-3 rounded-md overflow-x-auto">
        <code>{code}</code>
    </pre>
);

export default CodeBlock;