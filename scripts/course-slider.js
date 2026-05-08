/**
 * course-slider.js
 * Xử lý cuộn ngang cho danh sách khoá học:
 *  - Kéo chuột (drag) để cuộn tự do trên desktop
 *  - Touch swipe hoạt động tự nhiên nhờ overflow-x: auto
 */
(function () {
    'use strict';

    var list = document.querySelector('.course-list');
    if (!list) return;

    /* === Drag-to-scroll bằng chuột === */
    var isDragging = false;
    var startX = 0;
    var scrollStart = 0;

    list.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.pageX - list.offsetLeft;
        scrollStart = list.scrollLeft;
        list.classList.add('is-dragging');
    });

    // Dùng document để bắt event ngay cả khi chuột rời khỏi list
    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
        var x = e.pageX - list.offsetLeft;
        var walk = (x - startX) * 1.2; // Hệ số tốc độ kéo
        list.scrollLeft = scrollStart - walk;
    });

    document.addEventListener('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;
        list.classList.remove('is-dragging');
    });
})();
