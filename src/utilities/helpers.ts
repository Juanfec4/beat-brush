export const makeId = (length: number) => {
  let result: string = "";
  let chars: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let charsLength: number = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
};

export const sha256 = (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

export const base64urlencode = (arrayBuffer: ArrayBuffer): string => {
  const uint8Array = new Uint8Array(arrayBuffer);
  return btoa(String.fromCharCode.apply(null, Array.from(uint8Array)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const pkceChallengeFromVerifier = async (v: string): Promise<string> => {
  const hashed = await sha256(v);
  const base64encoded = base64urlencode(hashed);
  return base64encoded;
};

export const calculateExpiresAt = (expiresIn: number): Date => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expiresAt = currentTimestamp + expiresIn;
  return new Date(expiresAt * 1000);
};

export const msToHMS = (durationInMS: number) => {
  const hours = Math.floor(durationInMS / 3600000);
  const minutes = Math.floor((durationInMS % 3600000) / 60000);
  const seconds = Math.floor(((durationInMS % 3600000) % 60000) / 1000);

  const formattedHours = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
};

export const formatStringOption = (input: string): string => {
  const words = input.split("_").map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return "";
  });
  const formattedString = words.join(" ");

  return formattedString;
};

export const generateRandomPaddedNumber = (
  min: number,
  max: number
): string => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString().padStart(3, "0");
};

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const formatTimestamp = (timestamp: number): string => {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months: string[] = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const date = new Date(timestamp);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayOfWeek.toUpperCase()}, ${month} ${day}, ${year}`;
};

export const getAuthUrl = (code: string) => {
  let url = "https://accounts.spotify.com/authorize";
  let params = new URLSearchParams({
    response_type: "code",
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    scope: "user-top-read user-read-private",
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
    code_challenge: code,
    code_challenge_method: "S256",
  });
  return `${url}?${params.toString()}`;
};
