// =========================
// MOBILE MENU TOGGLE
// =========================
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const navigation = document.querySelector('nav');

menuBtn.addEventListener('click', () => navigation.classList.add('active'));
closeBtn.addEventListener('click', () => navigation.classList.remove('active'));

// =========================
// FORM SUBMISSION TO TELEGRAM BOT (RESERVATION)
// =========================
document.addEventListener('DOMContentLoaded', () => {
  // ==================== BRON QILISH FORMASI ====================
  const form = document.getElementById('reservation-form');
  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('form-message');

    // BOT SOZLAMALARI - O'ZGARTIRING!
    const BOT_TOKEN = '8490496219:AAGY_nNT8VlSnveJUzkJsUxE3s726XizBhw'; // SIZNING BOT TOKEN
    const CHAT_ID = '1830045630'; // SIZNING CHAT ID

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Form ma'lumotlarini olish
      const name = document.getElementById('name')?.value.trim() || '';
      const phone = document.getElementById('phone')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const persons = document.getElementById('persons')?.value.trim() || '';
      const date = document.getElementById('date')?.value.trim() || '';
      const time = document.getElementById('time')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';

      // Validatsiya
      if (!name || !phone || !persons || !date || !time) {
        showMessage("❌ Iltimos, barcha majburiy maydonlarni to'ldiring!", 'error', messageDiv);
        return;
      }

      // Telefon raqam validatsiyasi
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(phone)) {
        showMessage("❌ Telefon raqam noto'g'ri formatda! Masalan: +998991234567", 'error', messageDiv);
        return;
      }

      // Tugmani yuklash holati
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner"></span> Yuborilyapti...';
      submitBtn.disabled = true;

      // Telegram xabar matni
      const telegramMessage = `
🆕 <b>YANGI BRON QILISH</b>
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Ism:</b> ${escapeHtml(name)}
📞 <b>Telefon:</b> ${escapeHtml(phone)}
📧 <b>Email:</b> ${email ? escapeHtml(email) : '❌ Kiritilmagan'}
👥 <b>Odamlar soni:</b> ${escapeHtml(persons)}
📅 <b>Sana:</b> ${formatDate(date)}
⏰ <b>Vaqt:</b> ${escapeHtml(time)}
💬 <b>Xabar:</b> ${message ? escapeHtml(message) : '❌ Yo\'q'}
━━━━━━━━━━━━━━━━━━━━━━
🏢 <b>Manba:</b> Capanna Restoran
🕐 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
      `;

      try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            chat_id: CHAT_ID, 
            text: telegramMessage, 
            parse_mode: 'HTML' 
          })
        });

        const data = await response.json();
        
        if (data.ok) {
          form.reset();
          showMessage("✅ Sizning so'rovingiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.", 'success', messageDiv);
        } else {
          throw new Error(data.description || "Yuborilmadi.");
        }
      } catch (error) {
        console.error('Telegramga yuborish xatosi:', error);
        showMessage('❌ Bron qilinmadi. Iltimos, yana urinib ko‘ring yoki bizga telefon orqali murojaat qiling.', 'error', messageDiv);
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // ==================== INPUT VALIDATION ====================
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^\d+]/g, '');
      // Avtomatik formatlash
      if (this.value.startsWith('998') && this.value.length > 3) {
        let val = this.value;
        if (val.length > 12) val = val.slice(0, 12);
        let formatted = '+998 ';
        if (val.length > 3) formatted += val.slice(3, 5) + ' ';
        if (val.length > 5) formatted += val.slice(5, 8) + ' ';
        if (val.length > 8) formatted += val.slice(8, 12);
        this.value = formatted.trim();
      }
    });
  }

  const personsInput = document.getElementById('persons');
  if (personsInput) {
    personsInput.addEventListener('input', function() {
      let val = parseInt(this.value);
      if (isNaN(val)) val = 1;
      if (val < 1) this.value = 1;
      if (val > 20) this.value = 20;
    });
  }

  // ==================== MENU CATEGORY FILTERING ====================
  const categoryButtons = document.querySelectorAll('.btn-cat');
  const menuItems = document.querySelectorAll('.img_cards');

  if (categoryButtons.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const category = this.getAttribute('data-id');
        menuItems.forEach(item => {
          item.style.display = (category === 'all' || item.getAttribute('data-category') === category) ? 'block' : 'none';
        });
      });
    });
  }

  // ==================== HEADER SCROLL EFFECT ====================
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.padding = '10px 0';
      } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        header.style.padding = '15px 0';
      }
    }
  });

  // ==================== CLOSE MENU WHEN LINK CLICKED ====================
  document.querySelectorAll('nav a').forEach(link => 
    link.addEventListener('click', () => {
      if (navigation) navigation.classList.remove('active');
    })
  );

  // ==================== ORDER SECTION FUNCTIONALITY ====================
  initOrderSection();
});

// ==================== UMUMIY YORDAMCHI FUNKSIYALAR ====================
function showMessage(text, type, messageDiv) {
  if (!messageDiv) return;
  
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
  
  if (messageDiv.scrollIntoView) {
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  setTimeout(() => { 
    messageDiv.textContent = ''; 
    messageDiv.className = ''; 
    messageDiv.style.display = 'none';
  }, 5000);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/[&<>"']/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      if (m === '"') return '&quot;';
      if (m === "'") return '&#39;';
      return m;
    });
}

function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('uz-UZ', options);
  } catch {
    return dateString;
  }
}

// ==================== ORDER SECTION (BUYURTMA) ====================
function initOrderSection() {
  const orderForm = document.getElementById('order-form');
  if (!orderForm) return;

  const orderSubmit = document.getElementById('order-submit');
  const orderMessageDiv = document.getElementById('order-form-message');
  const mapWrap = document.getElementById('map-wrap');
  const orderAddress = document.getElementById('order-address');
  const useLocBtn = document.getElementById('use-location');
  const clearMarkerBtn = document.getElementById('clear-marker');
  const summaryCount = document.getElementById('summary-count');
  const summaryTotal = document.getElementById('summary-total');

  let map = null;
  let marker = null;
  
  const MIN_ORDER = 50000;
  const DELIVERY_FEE = 10000;
  const FREE_DELIVERY_THRESHOLD = 100000;

  // BUYURTMA BOT SOZLAMALARI
  const ORDER_BOT_TOKEN = '8066097716:AAFJdKA8X2y3liKiA-O_KiBQ5xy3VmM81DY';
  const ORDER_CHAT_ID = '7701637395';

  // Expand/collapse categories
  document.querySelectorAll('#order_section .cat-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      const items = this.nextElementSibling;
      const isOpen = items.style.display === 'block';
      items.style.display = isOpen ? 'none' : 'block';
      this.textContent = isOpen ? this.textContent.replace('▴', '▾') : this.textContent.replace('▾', '▴');
    });
  });

  // Delivery / Pickup change
  document.querySelectorAll('input[name="orderType"]').forEach(r => {
    r.addEventListener('change', function() {
      if (this.value === 'Delivery') {
        if (mapWrap) mapWrap.classList.remove('hidden');
        if (!map) initMap();
      } else {
        if (mapWrap) mapWrap.classList.add('hidden');
        if (marker && map) { map.removeLayer(marker); marker = null; }
        if (orderAddress) orderAddress.value = '';
      }
      updateSummary();
    });
  });

  // Initialize Leaflet map
  function initMap() {
    const center = [41.2995, 69.2401];
    map = L.map('map').setView(center, 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', e => placeMarkerAndReverse(e.latlng));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        map.setView([lat, lng], 15);
        placeMarkerAndReverse({ lat, lng });
      }, () => console.warn('Geolocation failed'));
    }
  }

  async function placeMarkerAndReverse(latlng) {
    if (!map) return;
    if (marker) { 
      marker.setLatLng(latlng); 
    } else { 
      marker = L.marker(latlng, { draggable: true }).addTo(map); 
    }

    marker.on('dragend', () => {
      const ll = marker.getLatLng();
      if (orderAddress) orderAddress.value = `Lat:${ll.lat.toFixed(6)},Lng:${ll.lng.toFixed(6)}`;
      reverseGeocode(ll.lat, ll.lng);
    });

    if (orderAddress) orderAddress.value = `Lat:${latlng.lat.toFixed(6)},Lng:${latlng.lng.toFixed(6)}`;
    await reverseGeocode(latlng.lat, latlng.lng);
  }

  async function reverseGeocode(lat, lon) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (data?.display_name && orderAddress) orderAddress.value = data.display_name;
    } catch { 
      if (orderAddress) orderAddress.value = 'Manzilni qo‘lda kiriting'; 
    }
  }

  if (useLocBtn) {
    useLocBtn.addEventListener('click', () => {
      if (!navigator.geolocation) { 
        showOrderMessage('Geolocation qo‘llab-quvvatlanmaydi', 'error', orderMessageDiv); 
        return; 
      }
      useLocBtn.disabled = true; 
      useLocBtn.textContent = 'Locating...';
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude; 
        const lng = pos.coords.longitude;
        if (!map) initMap();
        map.setView([lat, lng], 15);
        placeMarkerAndReverse({ lat, lng });
        useLocBtn.disabled = false; 
        useLocBtn.textContent = 'Use my location';
      }, err => {
        showOrderMessage('Unable to get location: ' + err.message, 'error', orderMessageDiv);
        useLocBtn.disabled = false; 
        useLocBtn.textContent = 'Use my location';
      });
    });
  }

  if (clearMarkerBtn) {
    clearMarkerBtn.addEventListener('click', () => {
      if (marker && map) { 
        map.removeLayer(marker); 
        marker = null; 
        if (orderAddress) orderAddress.value = ''; 
      }
    });
  }

  // Summary update
  document.querySelectorAll('#order_section input[name="order-item"], #order_section .item-qty').forEach(el => {
    if (el) el.addEventListener('change', updateSummary);
  });

  function updateSummary() {
    const selected = Array.from(document.querySelectorAll('#order_section input[name="order-item"]:checked'));
    let count = 0, total = 0;
    
    selected.forEach(el => {
      let qty = 1;
      const parent = el.closest('.dish-single');
      if (parent) { 
        const qEl = parent.querySelector('.item-qty'); 
        if (qEl) qty = parseInt(qEl.value) || 1; 
      }
      const price = Number(el.dataset.price) || extractPriceFromValue(el.value) || 0;
      count += qty; 
      total += price * qty;
    });
    
    const orderType = document.querySelector('input[name="orderType"]:checked')?.value;
    if (orderType === 'Delivery' && total < FREE_DELIVERY_THRESHOLD && total > 0) {
      total += DELIVERY_FEE;
    }
    
    if (summaryCount) summaryCount.textContent = count;
    if (summaryTotal) summaryTotal.textContent = total.toLocaleString('en-US');
  }

  function extractPriceFromValue(val) { 
    const m = val.match(/(\d[\d\s]*)\s*so'm$/); 
    return m ? Number(m[1].replace(/\s+/g, '')) : 0; 
  }

  // Submit order
  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const selectedEls = Array.from(document.querySelectorAll('#order_section input[name="order-item"]:checked'));
      if (!selectedEls.length) { 
        showOrderMessage('Iltimos, kamida bitta taom tanlang!', 'error', orderMessageDiv); 
        return; 
      }

      const items = []; 
      let total = 0;
      
      selectedEls.forEach(el => {
        let qty = 1;
        const parent = el.closest('.dish-single');
        if (parent) { 
          const qEl = parent.querySelector('.item-qty'); 
          if (qEl) qty = parseInt(qEl.value) || 1; 
        }
        const price = Number(el.dataset.price) || extractPriceFromValue(el.value) || 0;
        total += price * qty; 
        items.push({name: el.value, qty, price});
      });

      const orderType = document.querySelector('input[name="orderType"]:checked')?.value;
      if (orderType === 'Delivery' && total < MIN_ORDER) { 
        showOrderMessage(`Yetkazib berish uchun minimal buyurtma: ${MIN_ORDER.toLocaleString('en-US')} so'm.`, 'error', orderMessageDiv); 
        return; 
      }

      const name = document.getElementById('order-name')?.value.trim() || '';
      const phone = document.getElementById('order-phone')?.value.trim() || '';
      const address = orderAddress?.value.trim() || '';
      const note = document.getElementById('order-note')?.value.trim() || '';
      
      if (!name || !phone) { 
        showOrderMessage('Iltimos, ism va telefon raqamni kiriting!', 'error', orderMessageDiv); 
        return; 
      }
      
      if (orderType === 'Delivery' && !address) { 
        showOrderMessage('Iltimos, manzilni tanlang yoki kiriting!', 'error', orderMessageDiv); 
        return; 
      }

      if (orderType === 'Delivery' && total < FREE_DELIVERY_THRESHOLD) {
        total += DELIVERY_FEE;
      }

      const itemsText = items.map(it => `${it.qty} x ${it.name} (${it.price.toLocaleString('en-US')} so'm)`).join('\n');
      const deliveryFeeText = orderType === 'Delivery' && total >= FREE_DELIVERY_THRESHOLD ? 'Bepul' : `${DELIVERY_FEE.toLocaleString('en-US')} so'm`;
      
      const telegramText = `
🛒 <b>YANGI BUYURTMA</b>
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Ism:</b> ${escapeHtml(name)}
📞 <b>Telefon:</b> ${escapeHtml(phone)}
🚚 <b>Tur:</b> ${escapeHtml(orderType)}
${orderType === 'Delivery' ? `📍 <b>Manzil:</b> ${escapeHtml(address)}\n💸 <b>Yetkazish haqqi:</b> ${deliveryFeeText}` : ''}
━━━━━━━━━━━━━━━━━━━━━━
<b>🍽️ Buyurtma qilingan taomlar:</b>
${escapeHtml(itemsText)}
━━━━━━━━━━━━━━━━━━━━━━
💰 <b>Jami:</b> ${total.toLocaleString('en-US')} so'm
📝 <b>Izoh:</b> ${escapeHtml(note || '—')}
━━━━━━━━━━━━━━━━━━━━━━
🏢 <b>Manba:</b> Capanna Restoran (Buyurtma)
🕐 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
      `;

      const originalText = orderSubmit?.textContent || 'Buyurtma berish';
      if (orderSubmit) {
        orderSubmit.innerHTML = '<span class="spinner"></span> Yuborilmoqda...';
        orderSubmit.disabled = true;
      }

      try {
        const res = await fetch(`https://api.telegram.org/bot${ORDER_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            chat_id: ORDER_CHAT_ID, 
            text: telegramText, 
            parse_mode: 'HTML' 
          })
        });
        
        const data = await res.json();
        
        if (data.ok) {
          orderForm.reset();
          if (marker && map) { 
            map.removeLayer(marker); 
            marker = null; 
          }
          if (mapWrap) mapWrap.classList.add('hidden');
          updateSummary();
          showOrderMessage("✅ Buyurtma muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.", 'success', orderMessageDiv);
        } else {
          throw new Error(data.description || 'Telegram error');
        }
      } catch(err) { 
        console.error('Send error', err); 
        showOrderMessage('❌ Buyurtmani yuborib bo‘lmadi. Iltimos, yana urinib ko‘ring yoki bizga qo‘ng‘iroq qiling.', 'error', orderMessageDiv); 
      } finally { 
        if (orderSubmit) {
          orderSubmit.innerHTML = originalText; 
          orderSubmit.disabled = false;
        }
      }
    });
  }

  function showOrderMessage(text, type, messageDiv) {
    if (!messageDiv) return;
    messageDiv.textContent = text;
    messageDiv.className = `form-message message ${type}`;
    messageDiv.style.display = 'block';
    
    if (type === 'success') { 
      setTimeout(() => { 
        messageDiv.textContent = ''; 
        messageDiv.className = 'form-message'; 
        messageDiv.style.display = 'none';
      }, 5000);
    }
  }

  updateSummary();
}