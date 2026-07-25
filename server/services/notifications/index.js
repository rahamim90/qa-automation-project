const waLinkProvider = require('./waLinkProvider');

const providers = {
  'wa-link': waLinkProvider,
};

/**
 * @param {{barberName: string, serviceName: string, date: string, time: string, customerName: string, customerPhone: string}} appointment
 * @returns {{provider: string, whatsappUrl?: string, sent: boolean}}
 */
function notifyCustomer(appointment) {
  const providerKey = process.env.NOTIFICATION_PROVIDER || 'wa-link';
  const provider = providers[providerKey] || waLinkProvider;
  return provider.notifyCustomer(appointment);
}

module.exports = { notifyCustomer };
