import bcrypt from "bcrypt";

export async function encrypt(password) {
  const encrypted = await bcrypt.hash(password, Number(process.env.SALT));
  return encrypted;
}

export async function decrypt(password, hash) {
  return await bcrypt.compare(password, hash);
}
