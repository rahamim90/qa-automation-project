function normalizePhone(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return `972${digits.slice(1)}`;
  }
  return digits;
}

/**
 * @param {{barberName: string, serviceName: string, date: string, time: string, customerName: string, customerPhone: string}} appointment
 * @returns {{provider: string, whatsappUrl: string, sent: boolean}}
 */
function notifyCustomer(appointment) {
  const { barberName, serviceName, date, time, customerPhone } = appointment;
  const message =
    `תזכורת: קבעת תור אצל ${barberName} במספרה, ` +
    `בתאריך ${date} בשעה ${time}, ל${serviceName}. נתראה!`;

  const whatsappUrl = `https://wa.me/${normalizePhone(customerPhone)}?text=${encodeURIComponent(message)}`;

  return { provider: 'wa-link', whatsappUrl, sent: false };
}

module.exports = { notifyCustomer };
