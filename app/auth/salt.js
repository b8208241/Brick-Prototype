import btoa from 'btoa'

 // Generate 16 bytes salt for bcrypt by seed. Should return the same salt for the same seed.
export default function (seed) {
  let bytes = [];
  for (let i = 0, l = seed.length; i < l; i++) {
    bytes.push(seed.charCodeAt(i))
  }
  while (bytes.length < 16) {
    bytes.push(0)
  }

  // Convert byte array to base64 string
  let salt = btoa(String.fromCharCode.apply(String, bytes.slice(0, 16)))

  // Adding header for bcrypt. Fake 10 rounds.
  return '$2a$10$' + salt
};
