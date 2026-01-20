import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
  intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(timeout(120000));
  }
}
