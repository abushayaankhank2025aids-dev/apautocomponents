export function buildMailtoHref(recipient: string, subject: string, body: string) {
  const encodedBody = encodeURIComponent(body.replace(/\r?\n/g, "\r\n"));
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
}
