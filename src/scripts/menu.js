function setupMenu() {
  const menuTrigger = document.getElementById('menutrigger');
  const body = document.body;
  /*const openAnims = [
    document.getElementById('anim-menutrigger-bread-bottom-open'),
    document.getElementById('anim-menutrigger-bread-top-open')
  ];
  const closeAnims = [
    document.getElementById('anim-menutrigger-bread-bottom-close'),
    document.getElementById('anim-menutrigger-bread-top-close')
  ];*/

  if (!menuTrigger || !body /*|| !openAnims[0] || !closeAnims[0]*/) {
    return;
  }

  menuTrigger.addEventListener('click', () => {
    const isMenuOpen = body.classList.toggle('is-menu-open');
    menuTrigger.setAttribute('aria-expanded', String(isMenuOpen));

    /*const animsToRun = isMenuOpen ? openAnims : closeAnims;
    animsToRun.forEach(anim => {
      if (anim && typeof anim.beginElement === 'function') {
        anim.beginElement();
      }
    });*/
  });
}
document.addEventListener('astro:page-load', setupMenu);