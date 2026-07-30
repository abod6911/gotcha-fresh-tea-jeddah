---
name: web-security-hardening
description: Industry-standard web security practices, OWASP Top 10 mitigation, CSRF protection, Content Security Policies (CSP), input sanitization, secure auth token management, and data privacy safeguards.
---

# Web Security & Application Hardening Skill

## Overview
This skill provides comprehensive security engineering rules to safeguard web applications against OWASP Top 10 vulnerabilities, data leakage, script injection, and unauthorized authentication access.

---

## Security Engineering Directives

### 1. Cross-Site Scripting (XSS) & Input Sanitization
- **Strict Escaping**: Never use `dangerouslySetInnerHTML` unless input is thoroughly sanitized with DOMPurify.
- **Contextual Encoding**: Encode all user inputs before rendering into HTML attributes, URLs, or script tags.
- **Content Security Policy (CSP)**: Configure strict HTTP headers to block unauthorized script execution and unapproved domain connects.

### 2. Authentication & Session Security
- **Token Security**: Store sensitive access tokens in `HttpOnly`, `SameSite=Strict`, `Secure` cookies or scoped memory context, avoiding localStorage for sensitive tokens.
- **CSRF Defense**: Require anti-CSRF tokens for all state-modifying requests (POST, PUT, DELETE).

### 3. Header Hardening & Network Security
- **Security Headers**: Enforce `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
- **HTTPS Enforcement**: Require SSL/TLS for all assets and enable HSTS (`Strict-Transport-Security`).

### 4. Data Privacy & Least Privilege
- **Minimal Exposure**: Never log or leak sensitive credentials, PII (personally identifiable information), or internal API keys to client-side bundles or browser logs.
- **Input Validation**: Validate all inputs both client-side and server-side using strict schema validators (Zod/Yup).
