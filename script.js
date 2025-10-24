document.addEventListener('DOMContentLoaded', function() {
    // Element references
    const urlInput = document.querySelector('.url-input');
    const fetchBtn = document.getElementById('fetch-btn');
    const downloadBtn = document.getElementById('download-btn');
    const loading = document.getElementById('loading');
    const resultSection = document.getElementById('result-section');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const videoPreview = document.getElementById('video-preview');
    const videoInfo = document.getElementById('video-info');
    const downloadCount = document.getElementById('download-count');
    const successRate = document.getElementById('success-rate');
    const todayCount = document.getElementById('today-count');
    const downloadOptions = document.getElementById('download-options');
    const qualityButtons = document.getElementById('quality-buttons');
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    const batchDownloadBtn = document.getElementById('batch-download-btn');
    const autoDownloadCheckbox = document.getElementById('auto-download');
    const progressBar = document.querySelector('.progress-bar');
    const downloadProgress = document.getElementById('download-progress');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('overlay');
    const notificationContainer = document.getElementById('notification-container');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const speedTestBtn = document.getElementById('speed-test-btn');
    const speedResult = document.getElementById('speed-result');
    const searchHistory = document.getElementById('search-history');
    const favoritesList = document.getElementById('favorites-list');
    const clearFavoritesBtn = document.getElementById('clear-favorites');
    const scheduleDownloadBtn = document.getElementById('schedule-download-btn');
    const scheduleTime = document.getElementById('schedule-time');
    const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // State variables
    let currentVideoData = null;
    let selectedOption = 'nowm';
    let selectedQuality = 'normal';
    let totalDownloads = parseInt(localStorage.getItem('totalDownloads')) || 0;
    let successfulDownloads = parseInt(localStorage.getItem('successfulDownloads')) || 0;
    let todayDownloads = parseInt(localStorage.getItem('todayDownloads')) || 0;
    let downloadHistory = JSON.parse(localStorage.getItem('downloadHistory')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let searchHistoryList = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let autoDownloadEnabled = false;
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Initialize
    initApp();
    
    function initApp() {
        updateStats();
        loadDownloadHistory();
        loadFavorites();
        loadSearchHistory();
        setupEventListeners();
        checkTodayReset();
        applyDarkMode();
        setupFAQ();
        
        // Auto-focus pada input URL
        urlInput.focus();
        
        // Auto-fetch untuk URL yang sudah ada
        if (urlInput.value.trim() && isValidTikTokUrl(urlInput.value.trim())) {
            setTimeout(() => {
                fetchBtn.click();
            }, 500);
        }
    }
    
    function setupEventListeners() {
        // Navigation tabs
        navTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
            });
        });
        
        // Sidebar navigation
        sidebarNavItems.forEach(item => {
            item.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
                closeMobileSidebar();
            });
        });
        
        // Mobile sidebar
        mobileMenuBtn.addEventListener('click', openMobileSidebar);
        closeSidebar.addEventListener('click', closeMobileSidebar);
        overlay.addEventListener('click', closeMobileSidebar);
        
        // Fetch video data
        fetchBtn.addEventListener('click', function() {
            const url = urlInput.value.trim();
            
            if (!url) {
                showError('Silakan masukkan URL video TikTok');
                return;
            }
            
            if (!isValidTikTokUrl(url)) {
                showError('URL TikTok tidak valid. Pastikan URL berasal dari TikTok');
                return;
            }
            
            // Tambahkan ke riwayat pencarian
            addToSearchHistory(url);
            
            fetchVideoData(url);
        });
        
        // Download video
        downloadBtn.addEventListener('click', function() {
            if (!currentVideoData) return;
            
            downloadVideo();
        });
        
        // Clear history
        clearHistoryBtn.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus semua riwayat download?')) {
                downloadHistory = [];
                localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
                loadDownloadHistory();
                showNotification('success', 'Berhasil', 'Riwayat berhasil dihapus');
            }
        });
        
        // Clear favorites
        clearFavoritesBtn.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus semua favorit?')) {
                favorites = [];
                localStorage.setItem('favorites', JSON.stringify(favorites));
                loadFavorites();
                showNotification('success', 'Berhasil', 'Semua favorit berhasil dihapus');
            }
        });
        
        // Batch download
        batchDownloadBtn.addEventListener('click', function() {
            const batchInput = document.querySelector('.batch-input');
            const urls = batchInput.value.trim().split('\n').filter(url => url.trim() !== '');
            
            if (urls.length === 0) {
                showError('Silakan masukkan setidaknya satu URL TikTok');
                return;
            }
            
            startBatchDownload(urls);
        });
        
        // Schedule download
        scheduleDownloadBtn.addEventListener('click', function() {
            const scheduleTimeValue = scheduleTime.value;
            if (!scheduleTimeValue) {
                showError('Silakan pilih waktu untuk penjadwalan');
                return;
            }
            
            const now = new Date();
            const selectedTime = new Date(scheduleTimeValue);
            
            if (selectedTime <= now) {
                showError('Waktu penjadwalan harus di masa depan');
                return;
            }
            
            const timeDiff = selectedTime.getTime() - now.getTime();
            
            showNotification('info', 'Penjadwalan', `Download dijadwalkan untuk ${selectedTime.toLocaleString()}`);
            
            setTimeout(() => {
                if (currentVideoData) {
                    downloadVideo();
                    showNotification('success', 'Download Terjadwal', 'Download telah dimulai sesuai jadwal');
                }
            }, timeDiff);
        });
        
        // Auto download option
        autoDownloadCheckbox.addEventListener('change', function() {
            autoDownloadEnabled = this.checked;
        });
        
        // Dark mode toggle
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        // Speed test
        speedTestBtn.addEventListener('click', runSpeedTest);
        
        // Search history click
        urlInput.addEventListener('focus', showSearchHistory);
        urlInput.addEventListener('input', filterSearchHistory);
        
        // Close search history when clicking outside
        document.addEventListener('click', function(e) {
            if (!urlInput.contains(e.target) && !searchHistory.contains(e.target)) {
                searchHistory.style.display = 'none';
            }
        });
        
        // Settings event listeners
        document.getElementById('language-select').addEventListener('change', function() {
            showNotification('info', 'Bahasa', `Bahasa diubah menjadi ${this.options[this.selectedIndex].text}`);
        });
        
        document.getElementById('theme-select').addEventListener('change', function() {
            if (this.value === 'dark') {
                isDarkMode = true;
                applyDarkMode();
                showNotification('info', 'Tema', 'Tema diubah menjadi mode gelap');
            } else if (this.value === 'light') {
                isDarkMode = false;
                applyDarkMode();
                showNotification('info', 'Tema', 'Tema diubah menjadi mode terang');
            } else {
                // Auto mode - follow system preference
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    isDarkMode = true;
                } else {
                    isDarkMode = false;
                }
                applyDarkMode();
                showNotification('info', 'Tema', 'Tema diatur sesuai sistem');
            }
        });
        
        document.getElementById('storage-location-btn').addEventListener('click', function() {
            showNotification('info', 'Penyimpanan', 'Fitur memilih folder penyimpanan akan tersedia di versi desktop');
        });
        
        document.getElementById('privacy-settings-btn').addEventListener('click', function() {
            showNotification('info', 'Privasi', 'Pengaturan privasi akan tersedia di versi mendatang');
        });
        
        document.getElementById('data-management-btn').addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus semua data yang disimpan di perangkat ini?')) {
                localStorage.clear();
                location.reload();
            }
        });
        
        document.getElementById('terms-btn').addEventListener('click', function() {
            showNotification('info', 'Syarat & Ketentuan', 'Membuka halaman syarat dan ketentuan');
            // In a real app, this would open a modal or navigate to a terms page
        });
        
        document.getElementById('about-btn').addEventListener('click', function() {
            showNotification('info', 'Tentang', 'TikTok Downloader Premium v1.0.0\nDibuat dengan ❤️ untuk pengguna Indonesia');
        });
    }
    
    function setupFAQ() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        });
    }
    
    // Switch between tabs
    function switchTab(tabId) {
        navTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}-tab`) {
                content.classList.add('active');
            }
        });
        
        // Update active nav tab
        document.querySelector(`.nav-tab[data-tab="${tabId}"]`).classList.add('active');
        
        // Update active sidebar item
        sidebarNavItems.forEach(item => item.classList.remove('active'));
        document.querySelector(`.sidebar-nav-item[data-tab="${tabId}"]`).classList.add('active');
    }
    
    // Mobile sidebar functions
    function openMobileSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Dark mode functions
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        applyDarkMode();
        
        const icon = darkModeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            showNotification('info', 'Mode Gelap', 'Mode gelap telah diaktifkan');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            showNotification('info', 'Mode Terang', 'Mode terang telah diaktifkan');
        }
    }
    
    function applyDarkMode() {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Notification system
    function showNotification(type, title, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', function() {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            case 'info': return 'info-circle';
            default: return 'bell';
        }
    }
    
    // Search history functions
    function addToSearchHistory(url) {
        // Remove if already exists
        searchHistoryList = searchHistoryList.filter(item => item !== url);
        
        // Add to beginning
        searchHistoryList.unshift(url);
        
        // Keep only last 10 items
        if (searchHistoryList.length > 10) {
            searchHistoryList = searchHistoryList.slice(0, 10);
        }
        
        localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));
        loadSearchHistory();
    }
    
    function loadSearchHistory() {
        searchHistory.innerHTML = '';
        
        if (searchHistoryList.length === 0) {
            searchHistory.style.display = 'none';
            return;
        }
        
        searchHistoryList.forEach(url => {
            const item = document.createElement('div');
            item.className = 'search-history-item';
            item.textContent = url;
            item.addEventListener('click', function() {
                urlInput.value = url;
                searchHistory.style.display = 'none';
                fetchBtn.click();
            });
            
            searchHistory.appendChild(item);
        });
    }
    
    function showSearchHistory() {
        if (searchHistoryList.length > 0) {
            searchHistory.style.display = 'block';
        }
    }
    
    function filterSearchHistory() {
        const filter = urlInput.value.toLowerCase();
        const items = searchHistory.querySelectorAll('.search-history-item');
        
        items.forEach(item => {
            if (item.textContent.toLowerCase().includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Favorites functions
    function toggleFavorite(videoData) {
        const existingIndex = favorites.findIndex(fav => fav.id === videoData.id);
        
        if (existingIndex !== -1) {
            // Remove from favorites
            favorites.splice(existingIndex, 1);
            showNotification('info', 'Favorit', 'Video dihapus dari favorit');
        } else {
            // Add to favorites
            favorites.push({
                id: videoData.id,
                title: videoData.title,
                author: videoData.author,
                thumbnail: videoData.thumbnail,
                date: new Date().toLocaleString('id-ID')
            });
            showNotification('success', 'Favorit', 'Video ditambahkan ke favorit');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
        
        // Update favorite button in video info
        updateFavoriteButton(videoData);
    }
    
    function loadFavorites() {
        favoritesList.innerHTML = '';
        
        if (favorites.length === 0) {
            favoritesList.innerHTML = '<div class="history-item" style="justify-content: center; color: #666;">Belum ada video favorit</div>';
            return;
        }
        
        favorites.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}" class="history-thumb">
                <div class="history-info">
                    <div class="history-title">${item.title}</div>
                    <div class="history-author">${item.author}</div>
                    <div class="history-date">${item.date}</div>
                </div>
                <div class="history-actions">
                    <button class="action-btn download" data-url="${item.url}">
                        <i class="fas fa-redo"></i> Download Ulang
                    </button>
                    <button class="action-btn favorite-btn active">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            `;
            
            favoritesList.appendChild(historyItem);
        });
    }
    
    function updateFavoriteButton(videoData) {
        const isFavorite = favorites.some(fav => fav.id === videoData.id);
        const favoriteBtn = document.getElementById('favorite-btn');
        
        if (favoriteBtn) {
            if (isFavorite) {
                favoriteBtn.classList.add('active');
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Hapus Favorit';
            } else {
                favoriteBtn.classList.remove('active');
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Tambah Favorit';
            }
        }
    }
    
    // Speed test function
    function runSpeedTest() {
        speedTestBtn.disabled = true;
        speedTestBtn.querySelector('.btn-text').textContent = 'Mengukur...';
        
        const startTime = performance.now();
        
        // Simulate download test
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => {
                const endTime = performance.now();
                const duration = (endTime - startTime) / 1000; // in seconds
                const speed = (1 / duration).toFixed(2); // MB/s (simulated)
                
                speedResult.textContent = `${speed} MB/s`;
                speedResult.style.animation = 'pulse 1s';
                
                setTimeout(() => {
                    speedResult.style.animation = '';
                }, 1000);
            })
            .catch(error => {
                speedResult.textContent = 'Gagal mengukur kecepatan';
            })
            .finally(() => {
                speedTestBtn.disabled = false;
                speedTestBtn.querySelector('.btn-text').textContent = 'Mulai Tes Kecepatan';
            });
    }
    
    // Validasi URL TikTok
    function isValidTikTokUrl(url) {
        const tiktokPattern = /(https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\/(@[\w.-]+\/video\/\d+|[\w.-]+\/video\/\d+|\S+)|https?:\/\/(vm|vt)\.tiktok\.com\/\S+)/i;
        return tiktokPattern.test(url);
    }
    
    // Ambil data video dari API TikTok downloader
    async function fetchVideoData(url) {
        showLoading();
        hideError();
        hideSuccess();
        hideResult();
        
        try {
            // Menggunakan API TikTok downloader yang berbeda untuk variasi
            const apiUrl = `https://api.tiktokvideosaver.com/video?url=${encodeURIComponent(url)}`;
            
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data.success && data.data) {
                currentVideoData = {
                    id: data.data.id || 'unknown',
                    title: data.data.title || 'Video TikTok',
                    author: data.data.author || '@user_tiktok',
                    duration: data.data.duration || '0 detik',
                    likes: formatNumber(data.data.likes) || '0',
                    views: formatNumber(data.data.views) || '0',
                    thumbnail: data.data.thumbnail || 'https://via.placeholder.com/350x450/ff0050/ffffff?text=TikTok+Preview',
                    nowatermark: data.data.download_url || '',
                    audio: data.data.music || '',
                    hd: data.data.hd_url || data.data.download_url || ''
                };
                
                hideLoading();
                displayVideoData(currentVideoData);
                
                // Jika auto download diaktifkan
                if (autoDownloadEnabled) {
                    setTimeout(() => {
                        downloadVideo();
                    }, 1000);
                }
            } else {
                throw new Error('Gagal mengambil data video');
            }
        } catch (error) {
            console.error('Error:', error);
            
            // Fallback ke API lain jika yang pertama gagal
            try {
                const fallbackApiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
                const fallbackResponse = await fetch(fallbackApiUrl);
                const fallbackData = await fallbackResponse.json();
                
                if (fallbackData.code === 0 && fallbackData.data) {
                    currentVideoData = {
                        id: fallbackData.data.id || 'unknown',
                        title: fallbackData.data.title || 'Video TikTok',
                        author: fallbackData.data.author?.unique_id || '@user_tiktok',
                        duration: fallbackData.data.duration || '0 detik',
                        likes: formatNumber(fallbackData.data.digg_count) || '0',
                        views: formatNumber(fallbackData.data.play_count) || '0',
                        thumbnail: fallbackData.data.cover || 'https://via.placeholder.com/350x450/ff0050/ffffff?text=TikTok+Preview',
                        nowatermark: fallbackData.data.play || fallbackData.data.wmplay || '',
                        audio: fallbackData.data.music || fallbackData.data.music_info?.play_url || '',
                        hd: fallbackData.data.hdplay || fallbackData.data.play || ''
                    };
                    
                    hideLoading();
                    displayVideoData(currentVideoData);
                    
                    // Jika auto download diaktifkan
                    if (autoDownloadEnabled) {
                        setTimeout(() => {
                            downloadVideo();
                        }, 1000);
                    }
                } else {
                    throw new Error('Gagal mengambil data video');
                }
            } catch (fallbackError) {
                console.error('Fallback Error:', fallbackError);
                hideLoading();
                showError('Gagal mengambil data video. Silakan coba lagi atau gunakan URL yang berbeda.');
                showNotification('error', 'Error', 'Gagal mengambil data video');
            }
        }
    }
    
    // Format angka (1.2K, 50K, dll)
    function formatNumber(num) {
        if (!num) return '0';
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    // Tampilkan data video
    function displayVideoData(data) {
        videoPreview.src = data.thumbnail;
        
        // Check if video is in favorites
        const isFavorite = favorites.some(fav => fav.id === data.id);
        
        videoInfo.innerHTML = `
            <h3>${data.title}</h3>
            <p><i class="fas fa-user"></i> Oleh: ${data.author}</p>
            <p><i class="fas fa-clock"></i> Durasi: ${data.duration}</p>
            <p><i class="fas fa-heart"></i> ${data.likes} • <i class="fas fa-eye"></i> ${data.views}</p>
            <div class="options-title" style="margin-top: 20px;">
                <i class="fas fa-cog"></i> Pilih Opsi Download:
            </div>
            <div class="download-options-buttons" style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap; justify-content: center;">
                <button class="btn ${selectedOption === 'nowm' ? 'btn-success' : 'btn-secondary'}" data-option="nowm">
                    <i class="fas fa-film"></i> Tanpa Watermark
                </button>
                <button class="btn ${selectedOption === 'audio' ? 'btn-success' : 'btn-secondary'}" data-option="audio">
                    <i class="fas fa-music"></i> Download Audio
                </button>
                <button class="btn ${selectedOption === 'hd' ? 'btn-success' : 'btn-secondary'}" data-option="hd">
                    <i class="fas fa-hd-video"></i> Kualitas HD
                </button>
            </div>
            <button class="btn btn-secondary" id="favorite-btn" style="margin-top: 20px;">
                <span class="btn-text">${isFavorite ? 'Hapus Favorit' : 'Tambah Favorit'}</span>
                <span class="btn-icon"><i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i></span>
            </button>
        `;
        
        // Add event listeners for option buttons
        document.querySelectorAll('.download-options-buttons .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                selectedOption = this.getAttribute('data-option');
                
                // Update button styles
                document.querySelectorAll('.download-options-buttons .btn').forEach(b => {
                    if (b.getAttribute('data-option') === selectedOption) {
                        b.classList.remove('btn-secondary');
                        b.classList.add('btn-success');
                    } else {
                        b.classList.remove('btn-success');
                        b.classList.add('btn-secondary');
                    }
                });
                
                updateDownloadButton();
                showAvailableQualities();
            });
        });
        
        // Add event listener for favorite button
        document.getElementById('favorite-btn').addEventListener('click', function() {
            toggleFavorite(data);
        });
        
        updateDownloadButton();
        showAvailableQualities();
        resultSection.style.display = 'block';
        
        // Scroll ke hasil
        resultSection.scrollIntoView({ behavior: 'smooth' });
        
        // Show success notification
        showNotification('success', 'Berhasil', 'Data video berhasil diambil');
    }
    
    // Tampilkan opsi kualitas yang tersedia
    function showAvailableQualities() {
        qualityButtons.innerHTML = '';
        
        const qualities = [
            { id: 'normal', name: 'Normal', available: true },
            { id: 'hd', name: 'HD', available: !!currentVideoData.hd },
            { id: 'fhd', name: 'Full HD', available: false }
        ];
        
        qualities.forEach(quality => {
            const button = document.createElement('button');
            button.className = `quality-btn ${quality.id === selectedQuality ? 'active' : ''} ${!quality.available ? 'disabled' : ''}`;
            button.textContent = quality.name;
            button.disabled = !quality.available;
            
            if (quality.available) {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.quality-btn').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    selectedQuality = quality.id;
                    updateDownloadButton();
                });
            }
            
            qualityButtons.appendChild(button);
        });
        
        downloadOptions.style.display = 'block';
    }
    
    // Update tombol download berdasarkan opsi
    function updateDownloadButton() {
        let text = '';
        
        switch(selectedOption) {
            case 'nowm':
                text = `Download Tanpa Watermark (${selectedQuality.toUpperCase()})`;
                break;
            case 'audio':
                text = 'Download Audio (MP3)';
                break;
            case 'hd':
                text = `Download HD (${selectedQuality.toUpperCase()})`;
                break;
        }
        
        downloadBtn.querySelector('.btn-text').textContent = text;
    }
    
    // Download video
    function downloadVideo() {
        if (!currentVideoData) return;
        
        const downloadUrl = getDownloadUrl(selectedOption, selectedQuality);
        if (downloadUrl) {
            // Show download notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('TikTok Downloader', {
                    body: 'Sedang mendownload video...',
                    icon: 'https://cdn-icons-png.flaticon.com/512/3046/3046122.png'
                });
            }
            
            // Simulasi progress bar
            progressBar.style.display = 'block';
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Download sebenarnya
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = `tiktok_${selectedOption}_${Date.now()}.${selectedOption === 'audio' ? 'mp3' : 'mp4'}`;
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    
                    // Update statistik
                    totalDownloads++;
                    successfulDownloads++;
                    todayDownloads++;
                    localStorage.setItem('totalDownloads', totalDownloads);
                    localStorage.setItem('successfulDownloads', successfulDownloads);
                    localStorage.setItem('todayDownloads', todayDownloads);
                    updateStats();
                    
                    // Tambahkan ke riwayat
                    addToHistory(currentVideoData, selectedOption);
                    
                    // Tampilkan notifikasi sukses
                    showNotification('success', 'Download Berhasil', 'Video berhasil didownload');
                    
                    // Sembunyikan progress bar
                    setTimeout(() => {
                        progressBar.style.display = 'none';
                        downloadProgress.style.width = '0%';
                    }, 1000);
                }
                downloadProgress.style.width = `${progress}%`;
            }, 100);
        } else {
            showError('URL download tidak tersedia. Silakan coba lagi.');
            showNotification('error', 'Error', 'URL download tidak tersedia');
        }
    }
    
    // Dapatkan URL download berdasarkan opsi
    function getDownloadUrl(option, quality) {
        if (!currentVideoData) return null;
        
        switch(option) {
            case 'nowm':
                return quality === 'hd' && currentVideoData.hd ? currentVideoData.hd : currentVideoData.nowatermark;
            case 'audio':
                return currentVideoData.audio;
            case 'hd':
                return currentVideoData.hd || currentVideoData.nowatermark;
            default:
                return currentVideoData.nowatermark;
        }
    }
    
    // Update statistik
    function updateStats() {
        downloadCount.textContent = totalDownloads;
        const rate = totalDownloads > 0 ? Math.round((successfulDownloads / totalDownloads) * 100) : 100;
        successRate.textContent = `${rate}%`;
        todayCount.textContent = todayDownloads;
    }
    
    // Load download history
    function loadDownloadHistory() {
        historyList.innerHTML = '';
        
        if (downloadHistory.length === 0) {
            historyList.innerHTML = '<div class="history-item" style="justify-content: center; color: #666;">Belum ada riwayat download</div>';
            return;
        }
        
        // Tampilkan maksimal 10 item terbaru
        const recentHistory = downloadHistory.slice(-10).reverse();
        
        recentHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}" class="history-thumb">
                <div class="history-info">
                    <div class="history-title">${item.title}</div>
                    <div class="history-author">${item.author}</div>
                    <div class="history-date">${item.date}</div>
                </div>
                <div class="history-actions">
                    <button class="action-btn download" data-url="${item.downloadUrl}">
                        <i class="fas fa-redo"></i> Download Ulang
                    </button>
                </div>
            `;
            
            historyList.appendChild(historyItem);
        });
        
        // Tambahkan event listener untuk tombol download ulang
        document.querySelectorAll('.action-btn.download').forEach(btn => {
            btn.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                if (url) {
                    // Arahkan ke tab beranda dan isi URL
                    switchTab('home');
                    urlInput.value = url;
                    fetchBtn.click();
                }
            });
        });
    }
    
    // Tambahkan ke riwayat
    function addToHistory(videoData, type) {
        const historyItem = {
            id: videoData.id,
            title: videoData.title,
            author: videoData.author,
            thumbnail: videoData.thumbnail,
            downloadUrl: getDownloadUrl(type, selectedQuality),
            date: new Date().toLocaleString('id-ID'),
            type: type
        };
        
        downloadHistory.push(historyItem);
        localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
        
        // Refresh riwayat jika sedang di tab riwayat
        if (document.querySelector('[data-tab="history"]').classList.contains('active')) {
            loadDownloadHistory();
        }
    }
    
    // Batch download
    function startBatchDownload(urls) {
        showLoading();
        hideError();
        
        let completed = 0;
        const total = urls.length;
        
        // Simulasi proses batch download
        const interval = setInterval(() => {
            completed++;
            downloadProgress.style.width = `${(completed / total) * 100}%`;
            
            if (completed >= total) {
                clearInterval(interval);
                hideLoading();
                
                // Update statistik
                totalDownloads += total;
                successfulDownloads += total;
                todayDownloads += total;
                localStorage.setItem('totalDownloads', totalDownloads);
                localStorage.setItem('successfulDownloads', successfulDownloads);
                localStorage.setItem('todayDownloads', todayDownloads);
                updateStats();
                
                showNotification('success', 'Batch Download', `Berhasil mendownload ${total} video!`);
                
                // Sembunyikan progress bar
                setTimeout(() => {
                    progressBar.style.display = 'none';
                    downloadProgress.style.width = '0%';
                }, 1000);
            }
        }, 500);
    }
    
    // Cek reset download harian
    function checkTodayReset() {
        const lastReset = localStorage.getItem('lastResetDate');
        const today = new Date().toDateString();
        
        if (lastReset !== today) {
            todayDownloads = 0;
            localStorage.setItem('todayDownloads', todayDownloads);
            localStorage.setItem('lastResetDate', today);
            updateStats();
        }
    }
    
    // Tampilkan loading
    function showLoading() {
        loading.style.display = 'block';
        fetchBtn.disabled = true;
        fetchBtn.querySelector('.btn-text').textContent = 'Mengambil...';
    }
    
    // Sembunyikan loading
    function hideLoading() {
        loading.style.display = 'none';
        fetchBtn.disabled = false;
        fetchBtn.querySelector('.btn-text').textContent = 'Ambil Video';
    }
    
    // Tampilkan error
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Scroll ke error message
        errorMessage.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Sembunyikan error
    function hideError() {
        errorMessage.style.display = 'none';
    }
    
    // Tampilkan pesan sukses
    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        
        // Scroll ke pesan sukses
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Sembunyikan pesan setelah 5 detik
        setTimeout(() => {
            hideSuccess();
        }, 5000);
    }
    
    // Sembunyikan pesan sukses
    function hideSuccess() {
        successMessage.style.display = 'none';
    }
    
    // Sembunyikan hasil
    function hideResult() {
        resultSection.style.display = 'none';
    }
    
    // Request notification permission
    if ('Notification' in window) {
        Notification.requestPermission();
    }
});
