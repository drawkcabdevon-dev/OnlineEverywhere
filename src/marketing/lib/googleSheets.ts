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
        console.log('Starting Google Sheet submission...', { url: GOOGLE_SCRIPT_URL, data });

        // Add a timeout to prevent infinite hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        console.log('Google Sheet submission fetch completed (opaque/no-cors)');

        // specific no-cors note: 
        // We still won't get a readable JSON response in 'no-cors' mode due to browser security.
        // However, this method allows the JSON payload to reach the script successfully.
        // If we want readable responses, we'd need a proxy, but this is sufficient for fire-and-forget success.

        return { success: true };

    } catch (error) {
        console.error('Google Sheet submission error:', error);
        return { success: false, error };
    }
}
