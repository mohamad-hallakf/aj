import { createApp, h } from 'vue';

const Toast = {
  install(app, options = {}) {
    const defaultOptions = {
      position: 'bottom-0 start-0', // Bootstrap positioning classes
      duration: 3000,
      ...options
    };

    const toast = {
      show(message, type = 'primary', options = {}) {
        const mergedOptions = { ...defaultOptions, ...options };
        createToast(message, type, mergedOptions);
      },
      success(message, options = {}) {
        this.show(message, 'success', options);
      },
      error(message, options = {}) {
        this.show(message, 'danger', options);
      },
      warning(message, options = {}) {
        this.show(message, 'warning', options);
      },
      info(message, options = {}) {
        this.show(message, 'info', options);
      }
    };

    app.config.globalProperties.$toast = toast;
    app.provide('toast', toast);
  }
};

function createToast(message, type, options) {
  const toastContainer = document.getElementById('toast-container') || createToastContainer(options.position);
  
  const toastEl = document.createElement('div');
  toastEl.className = `toast show align-items-center text-white bg-${type} border-0 mb-2`;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');

  const toastBody = document.createElement('div');
  toastBody.className = 'd-flex';
  
  const toastMessage = document.createElement('div');
  toastMessage.className = 'toast-body';
  toastMessage.textContent = message;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'btn-close btn-close-white me-2 m-auto';
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('data-bs-dismiss', 'toast');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.addEventListener('click', () => toastEl.remove());

  toastBody.appendChild(toastMessage);
  toastBody.appendChild(closeButton);
  toastEl.appendChild(toastBody);
  toastContainer.appendChild(toastEl);

  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => toastEl.remove(), 300);
  }, options.duration);
}

function createToastContainer(position) {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = `position-fixed ${position} p-3`;
  container.style.zIndex = '9999';
  document.body.appendChild(container);
  return container;
}

export default Toast;