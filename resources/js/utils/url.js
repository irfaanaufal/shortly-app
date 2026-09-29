const BASE_URL = 'https://sindangasih-makmur.com';

export const formatUrl = (url) => {
    const trimmed = (url || '').trim();
    if (!trimmed) return trimmed;
    if (/^[a-zA-Z][a-zA-Z0-9.+-]*:\/\//.test(trimmed)) {
        return trimmed;
    }
    if (trimmed.startsWith('/')) {
        return `${BASE_URL}${trimmed}`;
    }
    return `${BASE_URL}/${trimmed}`;
};

export const cleanUrlInput = (value) => {
    const baseHttps = BASE_URL.replace(/^http:\/\//, 'https://');
    const baseHttp = BASE_URL.replace(/^https:\/\//, 'http://');
    let cleaned = value;
    if (cleaned.startsWith(baseHttps)) {
        cleaned = cleaned.substring(baseHttps.length);
    } else if (cleaned.startsWith(baseHttp)) {
        cleaned = cleaned.substring(baseHttp.length);
    }
    return cleaned;
};

export const stripBaseUrl = (url) => {
    if (!url) return '';
    const baseHttps = BASE_URL.replace(/^http:\/\//, 'https://');
    const baseHttp = BASE_URL.replace(/^https:\/\//, 'http://');
    if (url.startsWith(baseHttps)) {
        return url.substring(baseHttps.length);
    }
    if (url.startsWith(baseHttp)) {
        return url.substring(baseHttp.length);
    }
    return url;
};
