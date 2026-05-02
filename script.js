const parseCssTimeToMs = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  if (trimmed.endsWith('ms')) return Number.parseFloat(trimmed);
  if (trimmed.endsWith('s')) return Number.parseFloat(trimmed) * 1000;
  return Number.parseFloat(trimmed) || 0;
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.body.classList.remove('intro-pending');
  document.body.classList.add('reveal-site');
} else {
  const pageStyles = window.getComputedStyle(document.body);
  const revealDelay = parseCssTimeToMs(pageStyles.getPropertyValue('--intro-reveal-delay'));

  window.setTimeout(() => {
    document.body.classList.add('reveal-site');
  }, revealDelay);
}

const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-list');
const year = document.getElementById('year');
const orderForm = document.getElementById('order-form');
const orderItems = document.getElementById('order-items');
const addOrderItemButton = document.getElementById('add-order-item');
const orderMessage = document.getElementById('order-message');
const copyOrderMessageButton = document.getElementById('copy-order-message');
const orderItemTemplate = document.getElementById('order-item-template');

if (year) year.textContent = new Date().getFullYear();
if (btn && nav) {
  const setMenuState = (isOpen) => {
    btn.setAttribute('aria-expanded', String(isOpen));
    nav.classList.toggle('open', isOpen);
  };

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    setMenuState(!expanded);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    if (event.target instanceof Node && !event.target.closest('.nav')) {
      setMenuState(false);
    }
  });
}

if (
  orderForm &&
  orderItems &&
  orderMessage &&
  addOrderItemButton &&
  orderItemTemplate instanceof HTMLTemplateElement
) {
  const pickupDateInput = document.getElementById('pickup-date');
  const pickupTimeInput = document.getElementById('pickup-time');
  const customerPhoneInput = document.getElementById('customer-phone');
  const orderNotesInput = document.getElementById('order-notes');

  const visibleMenuItems = Array.from(
    document.querySelectorAll('.menu-item:not(.menu-item--hidden)'),
  )
    .map((item) => {
      const name = item.querySelector('h3')?.textContent?.trim() ?? '';
      const price = item.querySelector('.price')?.textContent?.trim() ?? '';
      return { name, price };
    })
    .filter((item) => item.name);

  const createItemOptionMarkup = () => {
    const placeholder = '<option value="">Choose an item</option>';
    const options = visibleMenuItems
      .map(({ name, price }) => {
        const label = price ? `${name} — ${price}` : name;
        return `<option value="${name}">${label}</option>`;
      })
      .join('');

    return `${placeholder}${options}`;
  };

  const updateRemoveButtons = () => {
    const rows = Array.from(orderItems.querySelectorAll('.order-item-row'));
    rows.forEach((row) => {
      const button = row.querySelector('.order-remove');
      if (!(button instanceof HTMLButtonElement)) return;
      const isOnlyRow = rows.length === 1;
      button.disabled = isOnlyRow;
      button.hidden = isOnlyRow;
    });
  };

  const formatDate = (rawDate) => {
    if (!rawDate) return 'Pickup date not selected';
    const parsed = new Date(`${rawDate}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return rawDate;
    return parsed.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const buildOrderMessage = () => {
    const selectedItems = Array.from(orderItems.querySelectorAll('.order-item-row'))
      .map((row) => {
        const itemSelect = row.querySelector('.order-item-select');
        const quantitySelect = row.querySelector('.order-quantity-select');
        if (!(itemSelect instanceof HTMLSelectElement) || !(quantitySelect instanceof HTMLSelectElement)) {
          return null;
        }
        if (!itemSelect.value && !quantitySelect.value) return null;
        return `- ${quantitySelect.value || 'Quantity not selected'} of ${itemSelect.value || 'item not selected'}`;
      })
      .filter(Boolean);

    const pickupDateValue = pickupDateInput instanceof HTMLInputElement ? pickupDateInput.value : '';
    const pickupTimeValue = pickupTimeInput instanceof HTMLSelectElement ? pickupTimeInput.value : '';
    const phoneValue = customerPhoneInput instanceof HTMLInputElement ? customerPhoneInput.value.trim() : '';
    const notesValue = orderNotesInput instanceof HTMLTextAreaElement ? orderNotesInput.value.trim() : '';

    return [
      'Order request',
      '',
      'Items:',
      ...(selectedItems.length ? selectedItems : ['- Add your pastries']),
      '',
      `Pickup date: ${formatDate(pickupDateValue)}`,
      `Pickup time: ${pickupTimeValue || 'Pickup window not selected'}`,
      `Phone number: ${phoneValue || 'Phone number not added'}`,
      '',
      'Notes:',
      notesValue || 'No additional notes.',
    ].join('\n');
  };

  const syncOrderMessage = () => {
    orderMessage.textContent = buildOrderMessage();
  };

  const addOrderItemRow = () => {
    const fragment = orderItemTemplate.content.cloneNode(true);
    const row = fragment.querySelector('.order-item-row');
    if (!(row instanceof HTMLElement)) return;

    const itemSelect = row.querySelector('.order-item-select');
    const quantitySelect = row.querySelector('.order-quantity-select');
    const removeButton = row.querySelector('.order-remove');

    if (itemSelect instanceof HTMLSelectElement) {
      itemSelect.innerHTML = createItemOptionMarkup();
      itemSelect.addEventListener('change', syncOrderMessage);
    }

    if (quantitySelect instanceof HTMLSelectElement) {
      quantitySelect.addEventListener('change', syncOrderMessage);
    }

    if (removeButton instanceof HTMLButtonElement) {
      removeButton.addEventListener('click', () => {
        row.remove();
        updateRemoveButtons();
        syncOrderMessage();
      });
    }

    orderItems.appendChild(fragment);
    updateRemoveButtons();
    syncOrderMessage();
  };

  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;
  const localDateIso = new Date(today.getTime() - timezoneOffset).toISOString().slice(0, 10);

  if (pickupDateInput instanceof HTMLInputElement) {
    pickupDateInput.min = localDateIso;
    pickupDateInput.addEventListener('input', syncOrderMessage);
  }

  if (pickupTimeInput instanceof HTMLSelectElement) {
    pickupTimeInput.addEventListener('change', syncOrderMessage);
  }

  if (customerPhoneInput instanceof HTMLInputElement) {
    customerPhoneInput.addEventListener('input', syncOrderMessage);
  }

  if (orderNotesInput instanceof HTMLTextAreaElement) {
    orderNotesInput.addEventListener('input', syncOrderMessage);
  }

  addOrderItemButton.addEventListener('click', addOrderItemRow);

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!(orderForm instanceof HTMLFormElement) || !orderForm.reportValidity()) return;
    syncOrderMessage();
  });

  if (copyOrderMessageButton instanceof HTMLButtonElement) {
    copyOrderMessageButton.addEventListener('click', async () => {
      syncOrderMessage();

      try {
        await navigator.clipboard.writeText(orderMessage.textContent ?? '');
        copyOrderMessageButton.textContent = 'Copied';
      } catch {
        copyOrderMessageButton.textContent = 'Copy failed';
      }

      window.setTimeout(() => {
        copyOrderMessageButton.textContent = 'Copy order details';
      }, 1600);
    });
  }

  addOrderItemRow();
}
