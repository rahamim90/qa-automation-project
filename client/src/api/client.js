const BASE_URL = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let errorMessage = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) errorMessage = data.error;
    } catch {
      // ignore parse errors
    }
    const err = new Error(errorMessage);
    err.status = res.status;
    throw err;
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res;
}

export const api = {
  getBarbers: () => request('/barbers'),
  getBarber: (slug) => request(`/barbers/${slug}`),
  getBarberGallery: (slug) => request(`/barbers/${slug}/gallery`),
  getBarberServices: (slug) => request(`/barbers/${slug}/services`),
  getAvailability: (slug, date, serviceId) =>
    request(`/barbers/${slug}/availability?date=${date}&serviceId=${serviceId}`),
  createAppointment: (payload) =>
    request('/appointments', { method: 'POST', body: JSON.stringify(payload) }),
  getProducts: () => request('/products'),
  adminLogin: (username, password) =>
    request('/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  adminLogout: () => request('/admin/logout', { method: 'POST' }),
  adminMe: () => request('/admin/me'),
  adminGetAppointments: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/admin/appointments${qs ? `?${qs}` : ''}`);
  },
};

export function icsDownloadUrl(appointmentId) {
  return `${BASE_URL}/appointments/${appointmentId}/ics`;
}
