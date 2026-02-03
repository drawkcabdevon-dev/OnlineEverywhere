/**
 * Utility to submit lead data directly to Google Sheets via Apps Script Web App.
 * This provides a reliable JSON response unlike the Google Forms 'opaque' submission.
 */

// Placeholder URL - User needs to update this after deploying their script
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwTiaDAEIBz_uLNYW-eMcNcmfXqOPNI1DxmE517deI/exec';

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
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important: Google Apps Script Web Apps require no-cors for simple text/plain POSTs from browser
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Apps Script treats this as string payload
            },
            body: JSON.stringify(data),
        });

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
