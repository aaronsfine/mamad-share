/**
 * Sanitize phone number: strip spaces, dashes, and plus signs.
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[\s\-+]/g, '');
}

/**
 * Generate a WhatsApp link with pre-filled message.
 */
export function buildWhatsAppLink(phone: string, hostName: string, city: string): string {
  const sanitized = sanitizePhone(phone);
  const message = encodeURIComponent(
    `Hi ${hostName}, I saw your shelter listing in ${city}. Is it still available?`
  );
  return `https://wa.me/${sanitized}?text=${message}`;
}
