// Important: This function must be used server-side only as crypto is a Node.js module

export function generateNonce() {
  return Buffer.from(crypto.randomUUID()).toString('base64');
}
