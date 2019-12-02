import crypto from 'crypto'
const ACCESS_KEY = 'fDEJy1RjgR';
const SECRET_KEY = 'ltu14';
function hashMd5(str) {
    return crypto.createHash('md5').update(str).digest('hex')
}

export const getHashSignature = (body) => {
    return hashMd5(ACCESS_KEY + SECRET_KEY + JSON.stringify(body || {}))
}