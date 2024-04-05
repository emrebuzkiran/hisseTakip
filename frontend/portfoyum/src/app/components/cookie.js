import { jwtDecode } from "jwt-decode";

// Token'i çözümler ve gerekli bilgileri döndürür
export const getTokenData = () => {
  // Tokeni al
  const rawToken = document.cookie;

  // Eğer token yoksa veya boşsa, null döndür
  if (!rawToken || rawToken === "") {
    return { token: null, username: null };
  }

  // Tokeni ayıkla
  const token = rawToken.substring("jwt=".length);

  // Tokeni çözümle
  const decoded = jwtDecode(token);

  // Kullanıcı adını al
  const username = decoded.sub;

  // Token ve kullanıcı adını döndür
  return { token, username };
};
