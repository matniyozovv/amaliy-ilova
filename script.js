// Ma'lumotlar bazasi
const subjects = [
    { id: 1, name: "Matematika", icon: "fas fa-calculator", price: "300,000", period: "to'lov", desc: "Algebra, geometriya, hisoblash" },
    { id: 2, name: "Fizika", icon: "fas fa-atom", price: "350,000", period: "to'lov", desc: "Mexanika, termodinamika, elektromagnetizm" },
    { id: 3, name: "Kimyo", icon: "fas fa-vial", price: "400,000", period: "to'lov", desc: "Organik, noorganik, fizik kimyo" },
    { id: 4, name: "Ingliz tili", icon: "fas fa-language", price: "400,000", period: "to'lov", desc: "Grammatika, nutq, yozuv" },
    { id: 5, name: "Dasturlash", icon: "fas fa-code", price: "700,000", period: "to'lov", desc: "JavaScript, Python, Web dasturlash" },
    { id: 6, name: "Biologiya", icon: "fas fa-dna", price: "400,000", period: "to'lov", desc: "Anatomiya, genetika, ekologiya" },
    { id: 7, name: "Tarix", icon: "fas fa-landmark", price: "200,000", period: "to'lov", desc: "Jahon tarixi, O'zbekiston tarixi" },
    { id: 9, name: "Rus tili", icon: "fas fa-book", price: "100,000", period: "to'lov", desc: "Grammatika, nutq, yozuv" }
];

const tutors = [
    { id: 1, name: "Azizbek Ismoilov", subject: "Matematika", rating: 4.9, price: "300,000", exp: "5 yil", desc: "Matematikadan oliy ma'lumotli", telegram: "@azizbek_math", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Sevara Karimova", subject: "Ingliz tili", rating: 4.8, price: "400,000", exp: "7 yil", desc: "IELTS 8.5 sohibasi, tajribali o'qituvchi", telegram: "@sevara_english", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Javohir Rustamov", subject: "Dasturlash", rating: 4.9, price: "700,000", exp: "6 yil", desc: "Senior dasturchi, 10+ loyiha tajribasi", telegram: "@javohir_dev", img: "https://randomuser.me/api/portraits/men/67.jpg" },
    { id: 4, name: "Dilnoza Xolmirzayeva", subject: "Fizika", rating: 4.7, price: "350,000", exp: "4 yil", desc: "Fizika Fani ustozi, universitet o'qituvchisi", telegram: "@dilnoza_physics", img: "https://randomuser.me/api/portraits/women/68.jpg" },
    { id: 5, name: "Farhod Abdullayev", subject: "Kimyo", rating: 4.8, price: "400,000", exp: "8 yil", desc: "Kimyo fanlari doktori, 100+ o'quvchi", telegram: "@farhod_chemistry", img: "https://randomuser.me/api/portraits/men/75.jpg" },
    { id: 6, name: "Madina Yusupova", subject: "Biologiya", rating: 4.6, price: "400,000", exp: "5 yil", desc: "Tibbiyot universiteti o'qituvchisi", telegram: "@madina_biology", img: "https://randomuser.me/api/portraits/women/26.jpg" },
    { id: 7, name: "Bekzod Xo'jayev", subject: "Tarix", rating: 4.5, price: "200,000", exp: "10 yil", desc: "Tarix fani ustoz, 3 ta kitob muallifi", telegram: "@bekzod_history", img: "https://randomuser.me/api/portraits/men/55.jpg" },
    { id: 8, name: "Zarina Qodirova", subject: "Rus tili", rating: 4.7, price: "100,000", exp: "6 yil", desc: "Rus tili mutaxassisi, tarjimon", telegram: "@zarina_russian", img: "https://randomuser.me/api/portraits/women/33.jpg" }
];

// DOM elementlari
const subjectsGrid = document.getElementById('subjectsGrid');
const tutorsGrid = document.getElementById('tutorsGrid');
const authModal = document.getElementById('authModal');
const bookingModal = document.getElementById('bookingModal');
const userModal = document.getElementById('userModal');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const closeAuth = document.getElementById('closeAuth');
const closeBooking = document.getElementById('closeBooking');
const closeUserModal = document.getElementById('closeUserModal');
const menuToggle = document.getElementById('menuToggle');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const bookingForm = document.getElementById('bookingForm');
const headerButtons = document.getElementById('headerButtons');
const logoutFromModalBtn = document.getElementById('logoutFromModalBtn');
const editProfileBtn = document.getElementById('editProfileBtn');

// Foydalanuvchi ma'lumotlari
let currentUser = JSON.parse(localStorage.getItem('studypro_user')) || null;

// Chiqish funksiyasi
function logout() {
    const confirmLogout = confirm(`${currentUser.name}, rostdan ham hisobdan chiqmoqchimisiz?`);

    if (confirmLogout) {
        const userProfile = document.getElementById('userProfile');
        if (userProfile) {
            userProfile.style.transition = 'all 0.3s ease';
            userProfile.style.opacity = '0.5';
            userProfile.style.transform = 'translateX(20px)';
        }

        setTimeout(() => {
            currentUser = null;
            localStorage.removeItem('studypro_user');
            updateUserUI();

            // Notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 9999;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                animation: slideIn 0.3s ease;
            `;
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i> Muvaffaqiyatli chiqdingiz!
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 300);
    }
}

// User modalni ochish funksiyasi - QISQARTIRILGAN SANA FORMATI
function openUserModal() {
    if (!currentUser) return;

    // Modalni to'ldirish
    document.getElementById('userModalAvatar').textContent = currentUser.name.charAt(0);
    document.getElementById('userModalName').textContent = currentUser.name;
    document.getElementById('userModalEmail').textContent = currentUser.email;
    document.getElementById('userModalPhone').textContent = currentUser.phone;

    // Qisqartirilgan sana formati
    const currentDate = new Date();
    const monthsUz = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
    const day = currentDate.getDate();
    const month = monthsUz[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    document.getElementById('userModalDate').textContent = `${day} ${month}, ${year}`;

    userModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// User modalni yopish funksiyasi
function closeUserModalFunc() {
    userModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Notification CSS qo'shish
const style = document.createElement('style');
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

// Foydalanuvchini yangilash
function updateUserUI() {
    if (currentUser) {
        headerButtons.innerHTML = `
            <div class="user-profile" id="userProfile">
                <div class="user-avatar">${currentUser.name.charAt(0)}</div>
                <div class="user-name">${currentUser.name}</div>
                <div class="logout-btn" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
            </div>
        `;

        // Chiqish tugmasiga event
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            logout();
        });

        // Profilga klik qilganda - USER MODAL ochiladi
        document.getElementById('userProfile').addEventListener('click', function(e) {
            if (!e.target.closest('#logoutBtn')) {
                openUserModal();
            }
        });

    } else {
        headerButtons.innerHTML = `
            <button class="btn btn-outline" id="loginBtn">Kirish</button>
            <button class="btn btn-primary" id="registerBtn">Ro'yxatdan o'tish</button>
        `;

        document.getElementById('loginBtn').addEventListener('click', () => openAuthModal('login'));
        document.getElementById('registerBtn').addEventListener('click', () => openAuthModal('register'));
    }
}

// Fanlarni chiqarish
function loadSubjects() {
    subjectsGrid.innerHTML = '';

    subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card fade-in';
        card.innerHTML = `
            <div class="subject-icon">
                <i class="${subject.icon}"></i>
            </div>
            <h3 class="subject-title">${subject.name}</h3>
            <p class="subject-desc">${subject.desc}</p>
            <div class="subject-price">${subject.price} UZS</div>
            <div class="subject-period">${subject.period}</div>
        `;

        card.addEventListener('click', () => {
            openBookingModal();
            document.getElementById('bookingSubject').value = subject.name;
        });

        subjectsGrid.appendChild(card);
    });
}

// Repetitorlarni chiqarish - YANGI DIZAYN
function loadTutors() {
    tutorsGrid.innerHTML = '';

    tutors.forEach(tutor => {
        const card = document.createElement('div');
        card.className = 'tutor-card fade-in';
        card.innerHTML = `
            <div class="tutor-card-new">
                <div class="tutor-card-header">
                    <div class="tutor-header-left">
                        <div class="tutor-avatar-new">
                            <img src="${tutor.img}" alt="${tutor.name}">
                        </div>
                        <div class="tutor-basic-info">
                            <h3 class="tutor-name-new">${tutor.name}</h3>
                            <div class="tutor-subject-new">${tutor.subject}</div>
                            <div class="tutor-rating-new">
                                <div class="stars">
                                    ${'<i class="fas fa-star"></i>'.repeat(5)}
                                    <div class="stars-fill" style="width: ${tutor.rating * 20}%">
                                        ${'<i class="fas fa-star"></i>'.repeat(5)}
                                    </div>
                                </div>
                                <span class="rating-number">${tutor.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tutor-card-body">
                    <div class="tutor-info-item">
                        <i class="fas fa-briefcase"></i>
                        <span class="info-text"><strong>Tajriba:</strong> ${tutor.exp}</span>
                    </div>
                    <div class="tutor-info-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span class="info-text">${tutor.desc}</span>
                    </div>
                    <div class="tutor-info-item">
                        <i class="fab fa-telegram"></i>
                        <span class="info-text"><strong>Telegram:</strong> ${tutor.telegram}</span>
                    </div>
                </div>

                <div class="tutor-card-footer">
                    <div class="tutor-price-new">
                        <div class="price-amount-new">${tutor.price} UZS</div>
                        <div class="price-period-new">soatiga</div>
                    </div>
                    <div class="tutor-actions-new">
                        <button class="btn btn-telegram" data-telegram="${tutor.telegram}">
                            <i class="fab fa-telegram"></i> Telegram
                        </button>
                        <button class="btn btn-book" data-tutor-id="${tutor.id}">
                            <i class="fas fa-calendar-plus"></i> Bron qilish
                        </button>
                    </div>
                </div>
            </div>
        `;

        tutorsGrid.appendChild(card);
    });

    // Telegram tugmalariga event listener qo'shish
    document.querySelectorAll('.btn-telegram').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const telegram = this.getAttribute('data-telegram');
            window.open(`https://t.me/${telegram.substring(1)}`, '_blank');
        });
    });

    // Bron qilish tugmalariga event listener qo'shish
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!currentUser) {
                openAuthModal('login');
                return;
            }

            const tutorId = this.getAttribute('data-tutor-id');
            openBookingModal();

            const tutor = tutors.find(t => t.id == tutorId);
            if (tutor) {
                document.getElementById('bookingTutor').value = tutor.name;
                document.getElementById('bookingSubject').value = tutor.subject;
            }
        });
    });
}

// Auth modalini ochish
function openAuthModal(tab = 'login') {
    authModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    authModal.scrollTop = 0;

    authTabs.forEach(t => t.classList.remove('active'));
    authForms.forEach(f => f.classList.remove('active'));

    if (tab === 'login') {
        document.querySelector('[data-tab="login"]').classList.add('active');
        loginForm.classList.add('active');
    } else {
        document.querySelector('[data-tab="register"]').classList.add('active');
        registerForm.classList.add('active');
    }
}

// Auth modalini yopish
function closeAuthModal() {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Booking modalini ochish
function openBookingModal() {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }

    bookingModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
    document.getElementById('bookingDate').value = today;
}

// Booking modalini yopish
function closeBookingModal() {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Form selectlarini to'ldirish
function populateFormSelects() {
    const subjectSelect = document.getElementById('bookingSubject');
    const tutorSelect = document.getElementById('bookingTutor');

    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.name;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
    });

    tutors.forEach(tutor => {
        const option = document.createElement('option');
        option.value = tutor.name;
        option.textContent = `${tutor.name} - ${tutor.subject}`;
        tutorSelect.appendChild(option);
    });
}

// Search funksiyasi
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const citySelect = document.querySelectorAll('.search-select')[0];
    const priceSelect = document.querySelectorAll('.search-select')[1];
    const searchButton = document.querySelector('.search-section .btn-primary');

    // Qidiruv tugmasi bosilganda
    searchButton.addEventListener('click', performSearch);

    // Enter tugmasi bosilganda
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Select'larda o'zgarish bo'lsa
    citySelect.addEventListener('change', performSearch);
    priceSelect.addEventListener('change', performSearch);

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCity = citySelect.value;
        const selectedPrice = priceSelect.value;

        // Fanlarni filtrlash
        let filteredSubjects = subjects;

        if (searchTerm) {
            filteredSubjects = filteredSubjects.filter(subject =>
                subject.name.toLowerCase().includes(searchTerm) ||
                subject.desc.toLowerCase().includes(searchTerm)
            );
        }

        // Repetitorlarni filtrlash
        let filteredTutors = tutors;

        if (searchTerm) {
            filteredTutors = filteredTutors.filter(tutor =>
                tutor.name.toLowerCase().includes(searchTerm) ||
                tutor.subject.toLowerCase().includes(searchTerm) ||
                tutor.desc.toLowerCase().includes(searchTerm)
            );
        }

        if (selectedCity) {
            filteredTutors = filteredTutors.filter(tutor => {
                if (selectedCity === 'online') {
                    return true; // Online uchun hamma repetitor
                }
                return true; // Shaharga qarab filtr keyinroq qo'shiladi
            });
        }

        if (selectedPrice) {
            filteredTutors = filteredTutors.filter(tutor => {
                const priceNum = parseInt(tutor.price.replace(/[^0-9]/g, ''));
                switch (selectedPrice) {
                    case 'cheap':
                        return priceNum <= 50000;
                    case 'medium':
                        return priceNum >= 100000 && priceNum <= 150000;
                    case 'expensive':
                        return priceNum >= 250000;
                    default:
                        return true;
                }
            });
        }

        // Filtrlangan ma'lumotlarni chiqarish
        displayFilteredResults(filteredSubjects, filteredTutors);
    }

    function displayFilteredResults(filteredSubjects, filteredTutors) {
        // Fanlarni yangilash
        subjectsGrid.innerHTML = '';

        if (filteredSubjects.length === 0) {
            subjectsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <i class="fas fa-search" style="font-size: 48px; color: #bdc3c7; margin-bottom: 20px;"></i>
                    <h3 style="color: #7f8c8d; margin-bottom: 10px;">Hech narsa topilmadi</h3>
                    <p style="color: #95a5a6;">Sizning qidiruv so'rovingizga mos keladigan fan topilmadi</p>
                </div>
            `;
        } else {
            filteredSubjects.forEach(subject => {
                const card = document.createElement('div');
                card.className = 'subject-card fade-in';
                card.innerHTML = `
                    <div class="subject-icon">
                        <i class="${subject.icon}"></i>
                    </div>
                    <h3 class="subject-title">${subject.name}</h3>
                    <p class="subject-desc">${subject.desc}</p>
                    <div class="subject-price">${subject.price} UZS</div>
                    <div class="subject-period">${subject.period}</div>
                `;

                card.addEventListener('click', () => {
                    openBookingModal();
                    document.getElementById('bookingSubject').value = subject.name;
                });

                subjectsGrid.appendChild(card);
            });
        }

        // Repetitorlarni yangilash - YANGI DIZAYN
        tutorsGrid.innerHTML = '';

        if (filteredTutors.length === 0) {
            tutorsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <i class="fas fa-user-graduate" style="font-size: 48px; color: #bdc3c7; margin-bottom: 20px;"></i>
                    <h3 style="color: #7f8c8d; margin-bottom: 10px;">Repetitor topilmadi</h3>
                    <p style="color: #95a5a6;">Sizning qidiruv so'rovingizga mos keladigan repetitor topilmadi</p>
                </div>
            `;
        } else {
            filteredTutors.forEach(tutor => {
                const card = document.createElement('div');
                card.className = 'tutor-card fade-in';
                card.innerHTML = `
                    <div class="tutor-card-new">
                        <div class="tutor-card-header">
                            <div class="tutor-header-left">
                                <div class="tutor-avatar-new">
                                    <img src="${tutor.img}" alt="${tutor.name}">
                                </div>
                                <div class="tutor-basic-info">
                                    <h3 class="tutor-name-new">${tutor.name}</h3>
                                    <div class="tutor-subject-new">${tutor.subject}</div>
                                    <div class="tutor-rating-new">
                                        <div class="stars">
                                            ${'<i class="fas fa-star"></i>'.repeat(5)}
                                            <div class="stars-fill" style="width: ${tutor.rating * 20}%">
                                                ${'<i class="fas fa-star"></i>'.repeat(5)}
                                            </div>
                                        </div>
                                        <span class="rating-number">${tutor.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tutor-card-body">
                            <div class="tutor-info-item">
                                <i class="fas fa-briefcase"></i>
                                <span class="info-text"><strong>Tajriba:</strong> ${tutor.exp}</span>
                            </div>
                            <div class="tutor-info-item">
                                <i class="fas fa-graduation-cap"></i>
                                <span class="info-text">${tutor.desc}</span>
                            </div>
                            <div class="tutor-info-item">
                                <i class="fab fa-telegram"></i>
                                <span class="info-text"><strong>Telegram:</strong> ${tutor.telegram}</span>
                            </div>
                        </div>

                        <div class="tutor-card-footer">
                            <div class="tutor-price-new">
                                <div class="price-amount-new">${tutor.price} UZS</div>
                                <div class="price-period-new">soatiga</div>
                            </div>
                            <div class="tutor-actions-new">
                                <button class="btn btn-telegram" data-telegram="${tutor.telegram}">
                                    <i class="fab fa-telegram"></i> Telegram
                                </button>
                                <button class="btn btn-book" data-tutor-id="${tutor.id}">
                                    <i class="fas fa-calendar-plus"></i> Bron qilish
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                tutorsGrid.appendChild(card);
            });

            // Yangilangan event listener'lar
            document.querySelectorAll('.btn-telegram').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const telegram = this.getAttribute('data-telegram');
                    window.open(`https://t.me/${telegram.substring(1)}`, '_blank');
                });
            });

            document.querySelectorAll('.btn-book').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (!currentUser) {
                        openAuthModal('login');
                        return;
                    }

                    const tutorId = this.getAttribute('data-tutor-id');
                    openBookingModal();

                    const tutor = filteredTutors.find(t => t.id == tutorId);
                    if (tutor) {
                        document.getElementById('bookingTutor').value = tutor.name;
                        document.getElementById('bookingSubject').value = tutor.subject;
                    }
                });
            });
        }
    }
}

// Dasturni ishga tushirish
function init() {
    loadSubjects();
    loadTutors();
    populateFormSelects();
    updateUserUI();
    setupSearch();

    // Event listenerlar
    loginBtn.addEventListener('click', () => openAuthModal('login'));
    registerBtn.addEventListener('click', () => openAuthModal('register'));
    closeAuth.addEventListener('click', closeAuthModal);
    closeBooking.addEventListener('click', closeBookingModal);
    closeUserModal.addEventListener('click', closeUserModalFunc);

    // Modal chiqish tugmasi
    logoutFromModalBtn.addEventListener('click', function() {
        closeUserModalFunc();
        setTimeout(() => logout(), 300);
    });

    // Profil tahrirlash tugmasi
    editProfileBtn.addEventListener('click', function() {
        closeUserModalFunc();
        setTimeout(() => {
            alert('Profil tahrirlash funksiyasi yaqinda qoʻshiladi!');
        }, 300);
    });

    window.addEventListener('click', (e) => {
        if (e.target === authModal) closeAuthModal();
        if (e.target === bookingModal) closeBookingModal();
        if (e.target === userModal) closeUserModalFunc();
    });

    // Auth tablarini almashtirish
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(`${tabName}Form`).classList.add('active');
        });
    });

    // Login formasi
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            alert('Iltimos, barcha maydonlarni to\'ldiring!');
            return;
        }

        // Ro'yxatdan o'tgan foydalanuvchilarni localStorage'dan qidirish
        const registeredUsers = JSON.parse(localStorage.getItem('studypro_registered_users')) || [];
        const foundUser = registeredUsers.find(user => user.email === email);

        if (foundUser) {
            // Agar ro'yxatdan o'tgan bo'lsa, uning ismini olish
            currentUser = {
                name: foundUser.name,
                email: foundUser.email,
                phone: foundUser.phone
            };
        } else {
            // Agar yangi foydalanuvchi bo'lsa, emailidan ism yaratish
            const userName = email.split('@')[0];
            const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

            currentUser = {
                name: formattedName,
                email: email,
                phone: "+998901234567"
            };
        }

        localStorage.setItem('studypro_user', JSON.stringify(currentUser));

        alert('Muvaffaqiyatli kirdingiz!');
        closeAuthModal();
        updateUserUI();
        this.reset();
    });

    // Register formasi
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Parollar mos kelmadi!');
            return;
        }

        if (password.length < 8) {
            alert('Parol kamida 8 ta belgidan iborat bo\'lishi kerak!');
            return;
        }

        // Ro'yxatdan o'tgan foydalanuvchilarni olish
        const registeredUsers = JSON.parse(localStorage.getItem('studypro_registered_users')) || [];

        // Email allaqachon ro'yxatdan o'tganligini tekshirish
        const existingUser = registeredUsers.find(user => user.email === email);
        if (existingUser) {
            alert('Bu email allaqachon ro\'yxatdan o\'tgan!');
            return;
        }

        // Yangi foydalanuvchini qo'shish
        const newUser = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        registeredUsers.push(newUser);
        localStorage.setItem('studypro_registered_users', JSON.stringify(registeredUsers));

        // CurrentUser ni o'rnatish
        currentUser = {
            name: name,
            email: email,
            phone: phone
        };

        localStorage.setItem('studypro_user', JSON.stringify(currentUser));

        alert('Ro\'yxatdan muvaffaqiyatli o\'tdingiz!');
        closeAuthModal();
        updateUserUI();
        this.reset();
    });

    // Booking formasi
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('bookingName').value;
        const phone = document.getElementById('bookingPhone').value;
        const subject = document.getElementById('bookingSubject').value;
        const tutor = document.getElementById('bookingTutor').value;
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('bookingTime').value;

        if (!name || !phone || !subject || !tutor || !date || !time) {
            alert('Iltimos, barcha maydonlarni to\'ldiring!');
            return;
        }

        const telegramMessage = `Yangi bron:\nIsm: ${name}\nTelefon: ${phone}\nFan: ${subject}\nRepetitor: ${tutor}\nSana: ${date}\nVaqt: ${time}`;

        alert(`Bron qilindi!\n${tutor} repetitori siz bilan ${date} kuni ${time} da bog'lanadi.\n\nTelegram botga yuborilgan xabar:\n${telegramMessage}`);

        closeBookingModal();
        this.reset();
    });

    // Scroll animatsiyalari
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.subject-card, .tutor-card').forEach(card => {
        observer.observe(card);
    });
}

// DOM yuklanganda dasturni ishga tushirish
document.addEventListener('DOMContentLoaded', init);



const TelegramBot = require('node-telegram-bot-api');

const token = '8661302759:AAHV4xfz43L1JwmWAcboJGHY2vgr-tVS8NI';
const bot = new TelegramBot(token, { polling: true });

// 👉 O'zingni ID yozasan
const ADMIN_ID = 7701637395;

// START
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Salom! Xabaringizni yozing 👇");
});

// USER yozsa → senga keladi
bot.on('message', (msg) => {
  if (msg.chat.id !== ADMIN_ID) {
    bot.sendMessage(ADMIN_ID, `📩 Yangi xabar:\n\n${msg.text}\n\nID: ${msg.chat.id}`);
  }
});

// SEN reply qilsang → userga boradi
bot.on('message', (msg) => {
  if (msg.chat.id === ADMIN_ID && msg.reply_to_message) {
    const text = msg.reply_to_message.text;

    const userId = text.split("ID: ")[1];

    bot.sendMessage(userId, msg.text);
  }
});