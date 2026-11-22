const SUBDOMAIN_ROUTES = {
  'curriculum.marcelrojas.net': '/subdomains/curriculum',
  'sound.marcelrojas.net': '/subdomains/sound',
};

const ROOT_PATH_ALIASES = {
  '/curriculum': '/subdomains/curriculum',
  '/sound': '/subdomains/sound',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prefix = SUBDOMAIN_ROUTES[url.hostname];

    if (prefix) {
      const rewritten = new URL(url);
      rewritten.pathname = url.pathname === '/' ? prefix : prefix + url.pathname;
      return env.ASSETS.fetch(new Request(rewritten, request));
    }

    const normalizedPath = url.pathname.replace(/\/+$/, '') || '/';
    const aliasTarget = ROOT_PATH_ALIASES[normalizedPath];
    if (aliasTarget) {
      const rewritten = new URL(url);
      rewritten.pathname = aliasTarget;
      return env.ASSETS.fetch(new Request(rewritten, request));
    }

    return env.ASSETS.fetch(request);
  },
};