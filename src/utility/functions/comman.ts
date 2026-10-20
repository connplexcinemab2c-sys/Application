import moment from 'moment';
import {Platform} from 'react-native';

const appActiveOpacity = 0.7;

const crypt = (salt: string, text: string) => {
  const textToChars = (text: string) =>
    text.split('').map(c => c.charCodeAt(0));
  const byteHex: any = (n: string) => ('0' + Number(n).toString(16)).slice(-2);
  const applySaltToChar: any = (code: number) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

const getLatestStoreVersion = async ({
  iosBundleId,
  androidPackageName,
}: {
  iosBundleId: string;
  androidPackageName: string;
}): Promise<string | null> => {
  try {
    if (Platform.OS === 'ios') {
      const response = await fetch(
        `https://itunes.apple.com/lookup?bundleId=${iosBundleId}`,
      );
      const json = await response.json();
      const version = json?.results?.[0]?.version;
      return version ?? null;
    } else if (Platform.OS === 'android') {
      const response = await fetch(
        `https://play.google.com/store/apps/details?id=${androidPackageName}&hl=en&gl=us`,
      );
      const html = await response.text();

      // Look for "Current Version" string and extract the version
      const versionMatch = html.match(
        /<span[^>]*>Current Version<\/span><span[^>]*><div[^>]*><span[^>]*>(.*?)<\/span>/,
      );

      if (versionMatch && versionMatch[1]) {
        return versionMatch[1].trim();
      } else {
        // Fallback: Try generic regex
        const fallbackMatch = html.match(
          /<span[^>]*class="htlgb">([\d.]+)<\/span>/,
        );
        return fallbackMatch ? fallbackMatch[1].trim() : null;
      }
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error fetching store version:', err);
    return null;
  }
};

const getStoreUpdateLink = () => {
  if (Platform.OS === 'android') {
    return 'https://play.google.com/store/apps/details?id=com.connplex';
  } else {
    return 'https://apps.apple.com/in/app/connplex-cinemas-tickets/id6497171599';
  }
};

const getRemainingTimeUntil10Min = (selectedSeatTime: Date) => {
  const isPastTime = moment().isBefore(selectedSeatTime);
  if (!selectedSeatTime) return 'Invalid time';
  if (isPastTime) return 'Time expired';
  const targetTime = moment.utc(selectedSeatTime).add(10, 'minutes');
  const now = moment.utc();
  const duration = moment.duration(targetTime.diff(now));
  if (duration.asMilliseconds() <= 0) {
    return 'Time expired';
  }
  const minutes = Math.floor(duration.asMinutes());
  const seconds = Math.floor(duration.asSeconds()) % 60;

  return `${minutes}m ${seconds.toString().padStart(2, '0')}s left`;
};

export {
  appActiveOpacity,
  crypt,
  getLatestStoreVersion,
  getRemainingTimeUntil10Min,
  getStoreUpdateLink,
};
