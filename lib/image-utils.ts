/**
 * Image utilities for optimized loading and Cloudways CDN support
 * 
 * Para usar con Cloudways:
 * 1. Sube las imagenes a tu servidor Cloudways
 * 2. Configura el CDN_BASE_URL con tu dominio
 * 3. Las imagenes se cargaran desde tu servidor
 */

// Configurar esta URL cuando tengas tu servidor Cloudways listo
// Ejemplo: 'https://cdn.lumee.mx' o 'https://tuapp.cloudwaysapps.com'
export const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || ''

// Flag para usar CDN externo vs imagenes locales
export const USE_CDN = !!CDN_BASE_URL

/**
 * Construye la URL de la imagen basada en la configuracion
 * Si CDN_BASE_URL esta configurado, usa el CDN
 * Si no, usa la ruta local
 */
export function getImageUrl(localPath: string): string {
  if (!localPath) return '/placeholder.png'
  
  // Si ya es una URL completa, devolverla tal cual
  if (localPath.startsWith('http://') || localPath.startsWith('https://')) {
    return localPath
  }
  
  // Si hay CDN configurado, usar CDN
  if (USE_CDN && CDN_BASE_URL) {
    // Quitar el slash inicial si existe
    const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath
    return `${CDN_BASE_URL}/${cleanPath}`
  }
  
  // Usar ruta local
  return localPath
}

/**
 * Genera URLs para diferentes tamanos de imagen (para srcset)
 */
export function getResponsiveImageUrls(basePath: string) {
  const sizes = [320, 640, 768, 1024, 1280]
  
  return sizes.map(size => ({
    size,
    url: getImageUrl(basePath),
  }))
}

/**
 * Placeholder blur data URL para transiciones suaves
 */
export const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsLCgwMDRAQDAwNDgwMDA4MDAwODxAQEBAQEBAQEBAQEBD/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAUGEQAHEiEIE0Ex/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAaEQACAwEBAAAAAAAAAAAAAAABAgADESES/9oADAMBEEhEPwAaJ+jxVq3UZ1pVOHCpVNuJd1xRlTGXJEKMiA0y2lLbjaSpKlqdOeFIUB0CQdaW2L5iu2vI1MZ3Cprl8TYcKnwUpXVJsWBBUwEBYASnnzKlIB/CQoE/Bo0ahZKYqsFB7j//2Q=='

/**
 * Verifica si una imagen existe (util para fallbacks)
 */
export async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}
