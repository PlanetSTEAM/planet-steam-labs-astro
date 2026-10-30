const CONTACT_EMAIL: string = 'admin@planetsteam.app';

function focusTarget(): void {
  let id: string;
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
  if (!/^[qce]\d\d$/.test(id)) return;
  const card = document.getElementById(id);
  if (!card) return;
  const details = card.querySelector<HTMLDetailsElement>('details');
  if (details) details.open = true;
  card.classList.add('is-highlight');
  window.setTimeout(() => card.classList.remove('is-highlight'), 2200);
}
window.addEventListener('hashchange', focusTarget);
focusTarget();

const form = document.querySelector<HTMLFormElement>('#contacto form');
const message = form?.querySelector<HTMLTextAreaElement>('textarea[name="proceso"]');

document.querySelectorAll<HTMLAnchorElement>('a[aria-label^="Solicitar"]').forEach((link) => {
  link.addEventListener('click', () => {
    let label = link.getAttribute('aria-label')?.split(': ')[1] ?? '';
    const choice = link.closest('article')?.querySelector<HTMLSelectElement>('.service-option');
    if (choice?.value) label += ` — ${choice.value}`;
    if (!message || !label) return;
    message.value = `Me interesa: ${label}.\n` + (message.value.startsWith('Me interesa:') ? '' : message.value);
    window.setTimeout(() => message.focus({ preventScroll: true }), 600);
  });
});

form?.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const text = (name: string): string => String(values.get(name) ?? '').trim();
  const email = text('correo');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    form.querySelector<HTMLInputElement>('[name="correo"]')?.focus();
    return;
  }
  const company = text('empresa');
  const subject = 'Solicitud de diagnóstico' + (company ? ` — ${company}` : '');
  const body = [`Nombre: ${text('nombre')}`, `Empresa: ${company}`, `Cargo: ${text('cargo')}`, `Correo: ${email}`, '', text('proceso')].join('\n');
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
