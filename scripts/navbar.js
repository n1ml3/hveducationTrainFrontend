/**
 * navbar.js — Quản lý trạng thái active của navbar
 *
 * Chức năng:
 * 1. Tự động set active link dựa trên URL trang hiện tại
 * 2. Khi click nav link, re-trigger animation của indicator
 *
 * Cách dùng: Gọi initNavbar() sau khi navbar được load vào DOM.
 */

/**
 * Map đường dẫn file HTML → index của nav link tương ứng.
 * Thứ tự phải khớp với thứ tự nav links trong navbar.html.
 */
const PAGE_MAP = {
    '/':              0,  // Trang chủ
    '/index.html':    0,  // Trang chủ (đường dẫn đầy đủ)
    '/about.html':    1,  // Giới thiệu
    '/introduce.html':1,  // Giới thiệu
    '/courses.html':  2,  // Khoá học
    '/materials.html':3,  // Tài liệu học
    '/blog.html':     4,  // Blog
    '/contact.html':  5,  // Liên hệ
};

/**
 * Xác định nav link nào cần được active dựa trên pathname hiện tại.
 * Trả về index của link, mặc định là 0 (Trang chủ) nếu không tìm thấy.
 *
 * @param {string} pathname - window.location.pathname
 * @returns {number} index của link cần active
 */
function getActiveIndexFromUrl(pathname) {
    // Lấy tên file từ pathname (vd: /pages/about.html → /about.html)
    const filename = '/' + pathname.split('/').pop();

    if (PAGE_MAP[pathname] !== undefined) return PAGE_MAP[pathname];
    if (PAGE_MAP[filename] !== undefined) return PAGE_MAP[filename];

    // Mặc định: Trang chủ
    return 0;
}

/**
 * Re-trigger CSS animation của indicator bằng cách
 * xóa rồi thêm lại class active, buộc browser repaint.
 *
 * @param {Element} linkEl - phần tử <a class="nav-link"> cần animate
 */
function triggerIndicatorAnimation(linkEl) {
    linkEl.classList.remove('active');

    // Dùng requestAnimationFrame để đảm bảo browser đã repaint
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            linkEl.classList.add('active');
        });
    });
}

/**
 * Khởi tạo navbar sau khi đã được load vào DOM.
 * Gọi hàm này trong callback của jQuery .load().
 */
function initNavbar() {
    const navLinks = document.querySelectorAll('#navbar-placeholder .nav-link');

    if (navLinks.length === 0) return;

    // Cập nhật href động để dùng được cả ở trang ngoài lẫn trang trong /pages/
    const inPagesDir = window.location.pathname.includes('/pages/');
    const prefix = inPagesDir ? '../' : './';
    
    if (navLinks[0]) navLinks[0].href = prefix + 'index.html';
    if (navLinks[1]) navLinks[1].href = prefix + 'pages/introduce.html';

    // Bước 1: Set active dựa trên URL hiện tại
    const activeIndex = getActiveIndexFromUrl(window.location.pathname);

    navLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (index === activeIndex) {
            link.classList.add('active');
        }
    });

    // Bước 2: Khi click link, animate indicator trước khi chuyển trang
    navLinks.forEach((link) => {
        link.addEventListener('click', function () {
            const allLinks = document.querySelectorAll('#navbar-placeholder .nav-link');

            // Xóa active khỏi tất cả
            allLinks.forEach(l => l.classList.remove('active'));

            // Trigger animation trên link vừa click
            triggerIndicatorAnimation(this);
        });
    });
}
