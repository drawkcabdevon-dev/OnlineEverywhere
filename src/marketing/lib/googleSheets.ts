/**
 * Utility to submit lead data directly to Google Sheets via Apps Script Web App.
 * This provides a reliable JSON response unlike the Google Forms 'opaque' submission.
 */

// Placeholder URL - User needs to update this after deploying their script
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYa56Gg7GOW2hi0__aBW_v0E1pWQaIfLLczbSfrFKSaFSSK-RIA_aiTCsd4gyOUZRt/exec';

export async function submitToGoogleSheet(data: {
    name: string;
    email: string;
    business?: string;
    role?: string;
    service?: string;
    message?: string;
    source?: string;
}) {
    // URL is configured

    try {
        const payload = JSON.stringify(data);
        console.log('[Sheets] Starting submission...', {
            url: GOOGLE_SCRIPT_URL,
            payloadSize: payload.length,
            data
        });

        // Add a timeout to prevent infinite hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            console.warn('[Sheets] TIMEOUT - aborting fetch');
            controller.abort();
        }, 15000); // Increased to 15s timeout

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: payload,
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        console.log('[Sheets] Fetch completed (Opaque/no-cors mode)');

        // Note: in 'no-cors' mode, we can't read the response body or status.
        return { success: true };

    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('[Sheets] Request timed out or was aborted');
        } else {
            console.error('[Sheets] Submission error:', error);
        }
        return { success: false, error };
    }
}
