const cache = {};
const TTL = 60 * 1000; 

function set(key, value, ttl = TTL) {
    const expires = Date.now() + ttl;
    cache[key] = { value, expires };
}

function get(key) {
    const data = cache[key];
    if (!data) return null;
    if (Date.now() > data.expires) {
        delete cache[key];
        return null;
    }
    return data.value;
}

function invalidate(key) {
    delete cache[key];
}

module.exports = { set, get, invalidate };
