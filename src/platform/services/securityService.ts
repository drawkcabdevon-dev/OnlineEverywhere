
/**
 * Security Service
 * 
 * Handles input sanitization and validation to prevent prompt injection 
 * and other security risks before sending data to the AI.
 */

// Basic control character stripping
export const stripControlCharacters = (input: string): string => {
    // eslint-disable-next-line
    return input.replace(/[\x00-\x1F\x7F-\x9F]/g, " ");
};

// Known injection patterns to watch for (and potentially escape or warn)
const INJECTION_PATTERNS = [
    "ignore all previous instructions",
    "ignore previous instructions",
    "forget everything",
    "system prompt",
    "you are not",
    "new rule",
    "jailbreak",
    "prompt injection",
    "execute javascript",
    "<script",
    "onload=",
    "onerror="
];

export const sanitizePromptInput = (input: string, maxLength: number = 5000): string => {
    if (!input) return "";

    // 1. Truncate to avoid token overflow attacks
    let sanitized = input.slice(0, maxLength);

    // 2. Strip Control Characters
    sanitized = stripControlCharacters(sanitized);

    // 3. Simple Pattern Check (Logging only for now, could act on it)
    // We don't want to aggressively block legitimate text, but awareness is key.
    const lowerInput = sanitized.toLowerCase();
    INJECTION_PATTERNS.forEach(pattern => {
        if (lowerInput.includes(pattern)) {
            console.warn(`[Security] Potential prompt injection pattern detected and neutralized: "${pattern}"`);
            // Aggressively neutralize the pattern
            const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            sanitized = sanitized.replace(regex, `[NEUTRALIZED: ${pattern}]`);
        }
    });

    // 4. Escape special prompt delimiters if used by our system
    // (Assuming we use something like "---" or "Context:")
    // sanitized = sanitized.replace(/---/g, " - ");

    return sanitized;
};

export const validateProjectFoundation = (foundation: any): boolean => {
    if (!foundation) return false;
    // Ensure critical fields aren't too long
    if (foundation.businessName?.length > 200) return false;
    if (foundation.businessDescription?.length > 10000) return false;
    return true;
};
