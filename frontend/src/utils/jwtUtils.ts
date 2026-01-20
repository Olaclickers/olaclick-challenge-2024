export function decodeJwt(token: string): any {
    try {
      const [header, payload, signature] = token.split('.');
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }