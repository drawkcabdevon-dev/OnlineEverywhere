const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYa56Gg7GOW2hi0__aBW_v0E1pWQaIfLLczbSfrFKSaFSSK-RIA_aiTCsd4gyOUZRt/exec';

async function submitToGoogleSheet(data) {
    console.log('--- START TEST ---');
    try {
        console.log('1. Starting submission...', { data });

        // Add a timeout to prevent infinite hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.log('!!! TIMEOUT TRIGGERED !!!');
            controller.abort();
        }, 10000); // 10s timeout

        console.log('2. Sending fetch request...');
        const start = Date.now();

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            // mode: 'no-cors', // Node doesn't use mode, strictly speaking, but good to note
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });

        const duration = Date.now() - start;
        clearTimeout(timeoutId);
        console.log(`3. Fetch completed in ${duration}ms`);
        console.log('4. Response Status:', response.status, response.statusText);

        // In Node we can actually read the text to verify it works
        const text = await response.text();
        console.log('5. Response Body:', text);

        return { success: true };

    } catch (error) {
        console.error('XXX Submission error:', error.message);
        return { success: false, error };
    }
}

// Run the test
console.log('Running test...');
submitToGoogleSheet({
    name: 'Local Repro Test',
    email: 'local@repro.com',
    source: 'NodeJS Script',
    business: 'Debug Inc'
});
