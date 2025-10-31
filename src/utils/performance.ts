// Utilidades de rendimiento para optimizar la aplicación

// Preload de recursos críticos
export const preloadCriticalResources = () => {
  // Solo preload si estamos en el navegador
  if (typeof window === 'undefined') return;
  
  try {
    // Preload de fuentes críticas
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
  } catch (error) {
    console.warn('Error preloading fonts:', error);
  }
};

// Lazy loading para imágenes
export const lazyLoadImage = (img: HTMLImageElement) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement;
        if (image.dataset.src) {
          image.src = image.dataset.src;
          image.classList.remove('lazy');
          observer.unobserve(image);
        }
      }
    });
  });

  observer.observe(img);
};

// Debounce para eventos de scroll y resize
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle para eventos frecuentes
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Optimización de memoria
export const cleanupEventListeners = (element: HTMLElement) => {
  const newElement = element.cloneNode(true) as HTMLElement;
  element.parentNode?.replaceChild(newElement, element);
  return newElement;
};
