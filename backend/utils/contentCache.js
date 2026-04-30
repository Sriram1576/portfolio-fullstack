const DEFAULT_TTL_MS = 5 * 60 * 1000;
const CONTENT_CACHE_TTL_MS = Number(process.env.HOME_CONTENT_CACHE_TTL_MS || DEFAULT_TTL_MS);

let cachedHomeContent = null;
let cachedAt = 0;

const isExpired = () => {
  if (!cachedHomeContent || !cachedAt) return true;
  return Date.now() - cachedAt > CONTENT_CACHE_TTL_MS;
};

const getHomeContentCache = () => {
  if (isExpired()) {
    cachedHomeContent = null;
    cachedAt = 0;
    return null;
  }
  return cachedHomeContent;
};

const setHomeContentCache = (payload) => {
  cachedHomeContent = payload;
  cachedAt = Date.now();
};

const invalidateHomeContentCache = () => {
  cachedHomeContent = null;
  cachedAt = 0;
};

module.exports = {
  CONTENT_CACHE_TTL_MS,
  getHomeContentCache,
  setHomeContentCache,
  invalidateHomeContentCache
};
