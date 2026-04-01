const TTL = 5 * 60 * 1000; // 5 minutes

const store = new Map();

export function setPhone(fullPhone) {
  store.set(fullPhone, { verified: false, timestamp: Date.now() });
}

export function markVerified(fullPhone) {
  const entry = store.get(fullPhone);
  if (entry) {
    entry.verified = true;
    entry.timestamp = Date.now();
  }
}

export function isVerified(fullPhone) {
  const entry = store.get(fullPhone);
  if (!entry) return false;
  if (Date.now() - entry.timestamp > TTL) {
    store.delete(fullPhone);
    return false;
  }
  return entry.verified === true;
}

export function removePhone(fullPhone) {
  store.delete(fullPhone);
}

export function cleanup() {
  const now = Date.now();
  for (const [phone, entry] of store) {
    if (now - entry.timestamp > TTL) {
      store.delete(phone);
    }
  }
}
