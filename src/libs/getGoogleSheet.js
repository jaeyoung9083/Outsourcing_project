import { GoogleSpreadsheet } from 'google-spreadsheet';

const getGoogleSheet = async (sheetId) => {
  const doc = new GoogleSpreadsheet(sheetId);

  const creds = {
    type: 'service_account',
    project_id: 'outsourcingproject',
    private_key_id: '580239d784bc7486ad9285777c1e66ab39589930',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCczJ8phGb0kNre\nmnNgURjsx/SI9qc+Z54LfgsvAWfOJL8k0Ogy70OVOQ1gxQzdME/T0dylelS9QKQm\nRHDJFtVT2EPzej4x+Xmv0Qs3g7L0vICTpnTOOCzMhQR+Pa2vFYX7dYinJPqtPEt2\n9Uda7LNpG9lENoBK44MdtKIWVx1QLxM3APmflb1fxMfdp5F5XReukK9Z5TVySsK1\nQt3kOPFIwXh6l6Dgk0XRZZjbJBZXaD0GESRpox8zhvCA9CmKnhyNMcSSVwrXaTYU\nAVrIuXj1ttcdYxu0Vi8ZaNsaqGOl9PjnCYHhp61GsKBd7D/+CguvVUuZ5YoW08yK\ne4ZZv9fPAgMBAAECggEABqp+U74GFdH4tBZTNF446za+/c76ojZhK4eSwySnUfC8\nUueHZO7za8B5V0quoX1Vz3awZN/pWAMLrM15EVt6pe4KSYDCFyQjg7wlOBl4aLDW\nMzC+7itzishW6Lpc4Wt5VDeVdSxRyelHzglfHLhLvPq1nGbywlGfd9+qNRKZXkNo\n/O/JKi+raY4ZJ7aidL2p2OEABN6oI/qGEpqWNot9KUlbXtKl8s4KWWCavmlhqGjp\nS4EjtW5K261+FzZ677I6i5PDTT1XzOQbxRj8JrZTQGjwjkS2ualwZcnycWZWdosU\n/OTfVA3x/1CPnvvblbkugVIHUFmYaaBmZ/czcYTWkQKBgQDYzGWIgiFgWvTDNzLw\nZWFWZuolX2zmgBm0YuwKM/ku66tlMMgtYigXRbf+6aCqisgOh8v9XEFVPeOddZwX\nRvAm1dcva1Mhlasxv3Aw3gPebhwfEeCIv0aMc4Ltq2ZywCrDeXFmfIitTDevYlq+\n6BxFJ9VrhAOi9c+ftgZqHilwkQKBgQC5Jt1XyecR0qyjr36k5xKQfIMohLDoNX7r\n8iOK67WInusbGN2rAq9Aq1nqdi4h5iW6trUTlQAfMthwPnxGUJ6rekjv3u96m9do\nWyyq1yvUQZpaw9zlKFjYTULYaFcxm/Fc9IF/sQWDWLU44GtGWZdS3UTMQADrcT84\n0U7tF5byXwKBgQDFylzLmOV4ciMiQybvGZ8fY880/4VsGezZnPJ6MIajXxFExaer\neATZjpraLy2MygbQ8uWRpexZJ5iU3Grm9ao91BR5R7JVTqYcQerKOpNPCCgR1I6E\nU/W6R9xol1plUJrzMcXa2b0cVg/rq5Dc4QiBs2DLsWpb72VX8YqSoCfwcQKBgAJb\n52gN736/o2l2e/OX6hmjLHygrCxZOiPBcwh7FlYGSFKRD4n1P8xgIoYlOVM/Pm3R\nlB8Kv/SlzjIn6advsYXXygQcYAq835K5zqjikvFiYJgVdMQKro8a9OYS9kFwjjOz\n/c5lr/9LawuteFBuJcptfUno6toVGEweBpZovYibAoGAYqPqXexht+h1mNqjLsHn\nZQIUghOu+wCF61welGqPP5NKd5ADF/Qjv5jEmPt470fVBUoCF980tMbQkqYn+uBZ\nGbS9cktOA6l5kID3wZo9XJwJLMDFm4SbE/kcN7LrjVrQRsDEDykSs6rlBQ23vRdD\nD9LRrO3gi0kFlrs9SwiucLE=\n-----END PRIVATE KEY-----\n',
    client_email: 'fairy-pitta@outsourcingproject.iam.gserviceaccount.com',
    client_id: '118120650270059802846',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/fairy-pitta%40outsourcingproject.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  };

  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  return rows;
};

export default getGoogleSheet;
