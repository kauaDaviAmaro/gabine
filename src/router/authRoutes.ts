import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

export default async function authRoutes(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {

  const authToken = window.localStorage.getItem("AUTH_TOKEN");

  const isAuthenticated = Boolean(authToken);
  const { requiresAuthentication } = to.meta;

  if (!isAuthenticated && requiresAuthentication) {
    next({ name: 'signin' });
    return;
  }
  next();
}