## 2025-02-14 - Defensive email decryption and external link security
**Vulnerability:** Unhandled base64 decoding errors in email obfuscation client script could break client-side execution, and external link on colophon page was missing `rel="noopener noreferrer"`.
**Learning:** Client-side email obfuscation decoding scripts must catch decoding errors to prevent runtime exceptions when processing invalid input attributes.
**Prevention:** Always wrap browser `atob()` decodes in try/catch blocks and ensure external `target="_blank"` links specify `rel="noopener noreferrer"`.
