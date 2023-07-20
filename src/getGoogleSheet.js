import { GoogleSpreadsheet } from 'google-spreadsheet';

const getGoogleSheet = async (sheetId) => {
  const doc = new GoogleSpreadsheet(sheetId);

  const creds = {
    type: "service_account",
    project_id: "mbti-8team",
    private_key_id: "6deb648980e76c08495bc83ca55a849550b0e915",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9bdcpMXSd7gZ0\njEAv+mmF9PYYkYdOR1aMyIyRmQQw4ntEQr9tglcpglVqfprqEbeqJMuQr49MVt1s\nt+i0vT3UfzHPxwT32ij16Hhdl9CZCSRjmipmHgi7uzx7zPfaXrW4hjCqqvd5t+Bq\nbyozMauNGs9BzapQ7wVzt5k73oeYkB90D1AdcygvRikkRuw8dwDoyelMlfeCLayv\nbtKS94IZO+FUcc2ua0whHoQi27GT7NA43mADw8rr52yCCziPwiYgX2tBn2195ZJW\nL+HVOPXG4PppIchPp+lt53Qs1bw3XItFzUEyvxyEMPkMazoTQFbaF5e/osnFHNjx\nNW7vwWbzAgMBAAECggEAGdGRTHOJrgblyVfeXcu3O0NekY2wT/qIMOsawbOF7zXH\nUE/6sG3d/HHfu4KjEbk1e9LFDiTnlqOWTX2pkYzjkwV9IBFDu5Z4E8BKO5N4Ious\n8ohuM/nu/ctw3Hzc4V4cTZi4pGJmFah6xXb+XPjtpW9chV8HUj2p1BJXp+HWQHRU\nRby9i54XS4y1X/nzZcBCqipbjwocMr41v789AcIU0Wbq8pyTm7PcJGLr3mNeJcCj\nu4St0oh0UeYNLK4B8lPHto9gT2RM0V8ZQ1HxeA8Wd9eRK1zKF47+CZ0X3gUk/gh5\n99HzGU4SkyLp8c8W7VHsSohV9A/slc23UNouuSQsuQKBgQDmbo7FSeoovEx8xCaR\ne2idZs9KjmdOiFV5Tnfn1UHO+QbwMa1NaDVdicrpCDH9+g8KTgoY3Lw5jGd1h6Pc\ngUFnr/r+dSoJs9T8g9QQbebPQ4z8KdvFx3d4aIkbot4W9O13jypXbW8hBo4QZWJt\nuIy+Mxynujq4MlqjNiXtvOK4GQKBgQDScpf97S5vyjbgrG/fpFXAxHuCX4BKHhnu\nZZfnX6lUvJDQXOqynu097XXnYva4//iy9GAVQBk9l26uWT8s7lcvxvSV38zshLJ2\nxYcV20LGHoDb7ffMunSTkRukRKPUr4qEsc9EEbakzfC3exzlZBAptonkGgt3R2eK\n4DQDu6Ko6wKBgQDR5s+ioyvro2rBFCRVzWaESsx0i7dK8CF7+KB8y+PAV1OcpIPK\nySwjYos1LsPrKEdfCatk7l1+xojPpJj9GbisbL9j3vJGGEvhIWyg8puXHV9lq/OH\n+6S2R/Ls+7T2kHFnwT++l+7s1H3ALbo1XDDIaOKnXppyg1vQ5Fg0cSTMsQKBgDva\nKY4nebCDk238vOifJWBowTPIE4WA4CEkNbqxQ0h9RLZt5rYcax7UvVasl7zv1/yV\ncgo5K7SPsAPYEBaoRpWpAQDrIK4X42XSMeQucuRD4qQqHvLUCLm7aGAkwW+I6V1p\n8KfMXeSrSY31brdy6QHkD32XRrGK1lDyCPkS0WU3AoGAA6pR6391IWe/B0cwnxKC\nQtcge0LWiKJk1Yba09GNzGSxZu0wNKBt7mu9rLMBUzCp2ktiwcIrWhUWuqCFAh9I\nW2e14t3N7wbG0BzhAkcpOO7/GqnuVVas9QxoVB2DRNWajYeRG6uj4OuFgn8VsCBR\ncxqOXInr1CiZfQnGTHmepIA=\n-----END PRIVATE KEY-----\n",
    client_email: "hogwart-quiz@mbti-8team.iam.gserviceaccount.com",
    client_id: "104455080706758150006",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/hogwart-quiz%40mbti-8team.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  };

  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  return rows;
};

export default getGoogleSheet;