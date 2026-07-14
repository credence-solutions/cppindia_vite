// =============================================================================
// CONTACT API — Submit contact & quote forms
// =============================================================================
import client from './client'

/**
 * Submit contact form
 * @param {Object} payload — { name, email, phone, company, subject, message }
 */
export async function submitContactForm(payload) {
  // In production: return client.post('/contact', payload)
  // Mock response for dev:
  await new Promise((r) => setTimeout(r, 800))
  console.info('[Contact API] Form submitted:', payload)
  return { success: true, message: 'Your message has been received. We will contact you shortly.' }
}

/**
 * Submit quote request
 */
export async function submitQuoteRequest(payload) {
  await new Promise((r) => setTimeout(r, 800))
  console.info('[Quote API] Quote requested:', payload)
  return { success: true, message: 'Quote request received. Our team will respond within 24 hours.' }
}

/**
 * Submit career application
 */
export async function submitJobApplication(payload) {
  await new Promise((r) => setTimeout(r, 1000))
  console.info('[Careers API] Application submitted:', payload)
  return { success: true, message: 'Application submitted successfully!' }
}
