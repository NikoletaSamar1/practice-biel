import { HttpInterceptorFn } from '@angular/common/http';
import { TOKEN_NAME } from './constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_NAME); // Get token from localStorage
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next(req);
};
