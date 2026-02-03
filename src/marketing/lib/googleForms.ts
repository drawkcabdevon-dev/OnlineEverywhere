/**
 * Utility to submit lead data to a Google Form in the background.
 * Using 'no-cors' mode allows us to bypass CORS issues, though we won't get a response body.
 */

export const GOOGLE_FORM_ID = '1FAIpQLSer7YpaeYI7wcJqOrjILHNTa6nKGOzqdPn42x-50dKmzrgciA';

export const GOOGLE_FORM_ENTRIES = {
    NAME: 'entry.1117717146',
    EMAIL: 'entry.874130450',
    BUSINESS: 'entry.1603127174',
};

export async function submitToGoogleForm(data: { name: string; email: string; business?: string }) {
    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

    const formData = new URLSearchParams();
    formData.append(GOOGLE_FORM_ENTRIES.NAME, data.name);
    formData.append(GOOGLE_FORM_ENTRIES.EMAIL, data.email);
    if (data.business) {
        formData.append(GOOGLE_FORM_ENTRIES.BUSINESS, data.business);
    }

    try {
        await fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });
        return { success: true };
    } catch (error) {
        console.error('Google Form submission error:', error);
        return { success: false, error };
    }
}
