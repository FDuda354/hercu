import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import { JwtService } from '../../../services/auth/jwt.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.jwtService.isLoggedIn()) {
      if (state.url !== '/login') {
        this.router.navigate(['/login']);
      }
      return false;
    }
    return true;
  }
}
