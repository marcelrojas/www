const SUBDOMAIN_ROUTES = {
  'links.marcelrojas.net': '/links',
  'sound.marcelrojas.net': '/sound',
  'brand.marcelrojas.net': '/brand',
  'media.marcelrojas.net': '/media',
  'cv.marcelrojas.net': '/cv',
};

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  const prefix = SUBDOMAIN_ROUTES[url.hostname];
  if (!prefix) return next();

  const rewritten = new URL(url);
  rewritten.pathname = prefix + (url.pathname === '/' ? '/' : url.pathname);
  return env.ASSETS.fetch(new Request(rewritten, request));
}