const SUBDOMAIN_ROUTES = {
  'media.marcelrojas.net': '/media',
  'sound.marcelrojas.net': '/sound',
  'cv.marcelrojas.net': '/cv',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prefix = SUBDOMAIN_ROUTES[url.hostname];
    if (!prefix) return env.ASSETS.fetch(request);

    const rewritten = new URL(url);
    rewritten.pathname = url.pathname === '/' ? prefix : prefix + url.pathname;
    return env.ASSETS.fetch(new Request(rewritten, request));
  },
};.