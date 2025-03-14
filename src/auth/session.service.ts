import { InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';

export class SessionService {
  public async destroy(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException(
              'Не удалось завершить сессию. Возмоожно, возникла проблема с сервером или сессия уже была завершена',
            ),
          );
        }

        resolve();
      });
    });
  }

  public async save(req: Request, userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.userId = userId;

      req.session.save((err) => {
        if (err) {
          reject(
            new InternalServerErrorException(
              'Не удалось сохранить сессию. Проверьте правильно ли настроены параметры сессии.',
            ),
          );
        }
        resolve();
      });
    });
  }
}
