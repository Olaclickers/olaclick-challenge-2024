import { Injectable } from '@nestjs/common';
// import { Home } from './Home';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class AppService {
  constructor(
    private readonly i18n: I18nService

  ) { }

  async getTranslateTest(lastName: string): Promise<object> {

    const i18n = I18nContext.current();
    
    
    const hello = this.i18n.t('lang.NAME_USER', { lang: i18n!.lang, args: { lastName } });
    const error = this.i18n.t('lang.AUTH.INVALID', { lang: i18n!.lang });
    return { hello, error }
  }
  getHello(): string {
    return 'Home'
  }

}
