import { I18nContext } from 'nestjs-i18n';

export class I18nMessageHelper {
  static getMessage(key: string, args?: Record<string, any>): string {
    const ctx = I18nContext.current();
    if (!ctx) {
      throw new Error('I18nContext is undefined');
    }
    return ctx.t(key, args);
  }
}
