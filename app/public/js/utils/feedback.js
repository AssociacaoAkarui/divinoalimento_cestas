const Feedback = {
  show(mensagem, tipo = 'success') {
    const feedback = document.createElement('div');
    feedback.textContent = mensagem;
    feedback.className = `feedback-toast feedback-${tipo}`;
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background: ${tipo === 'success' ? 'var(--success, #10B981)' : 'var(--danger, #EF4444)'};
      color: white;
      border-radius: var(--radius, 0.5rem);
      box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 500;
    `;

    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => feedback.remove(), 300);
    }, 2000);
  },

  success(mensagem) {
    this.show(mensagem, 'success');
  },

  error(mensagem) {
    this.show(mensagem, 'error');
  },

  warning(mensagem) {
    this.show(mensagem, 'warning');
  },

  info(mensagem) {
    this.show(mensagem, 'info');
  }
};

if (!document.querySelector('#feedback-animations-style')) {
  const style = document.createElement('style');
  style.id = 'feedback-animations-style';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
