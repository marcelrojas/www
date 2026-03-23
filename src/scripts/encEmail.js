function setupClipboardFlower() {
  const clipboardFlowerElement = document.getElementById('clipboard-clipper');
  if (!clipboardFlowerElement) {
    return;
  }

  const encEmail = clipboardFlowerElement.dataset.encemail;
  if (!encEmail) {
    console.error('data-encemail attribute not found on clipboard-clipper element.');
    return;
  }

  const decodedEmail = atob(encEmail);
  const label = clipboardFlowerElement.querySelector('.label');
  const originalLabelText = label ? label.textContent : '';

  clipboardFlowerElement.addEventListener('click', () => {
    navigator.clipboard.writeText(decodedEmail).then(() => {
      if (label) {
        label.textContent = 'E-mail copied to clipboard!';
        setTimeout(() => {
          label.textContent = originalLabelText;
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy e-mail: ', err);
      window.location.href = `mailto:${decodedEmail}`;
    });
  });
}
document.addEventListener('astro:page-load', setupClipboardFlower);
