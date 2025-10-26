<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TikTok Downloader - Download Video TikTok Tanpa Watermark</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #fe2c55;
            --primary-dark: #d91c45;
            --dark: #121212;
            --dark-light: #1e1e1e;
            --text: #ffffff;
            --text-secondary: #a8a8a8;
            --border: #2f2f2f;
            --card-bg: #242424;
            --sidebar-width: 280px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--dark);
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }

        /* Header Styles */
        header {
            background-color: var(--dark-light);
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
        }

        .logo i {
            color: var(--primary);
        }

        .menu-toggle {
            display: none;
            background: none;
            border: none;
            color: var(--text);
            font-size: 1.5rem;
            cursor: pointer;
        }

        /* Main Layout */
        .main-layout {
            display: flex;
            min-height: calc(100vh - 70px);
        }

        /* Sidebar Styles */
        .sidebar {
            width: var(--sidebar-width);
            background-color: var(--dark-light);
            padding: 20px 0;
            transition: all 0.3s ease;
            height: calc(100vh - 70px);
            position: sticky;
            top: 70px;
            overflow-y: auto;
            order: 2; /* Pindahkan sidebar ke kanan */
        }

        .sidebar-menu {
            list-style: none;
        }

        .sidebar-menu li {
            margin-bottom: 5px;
        }

        .sidebar-menu a {
            display: flex;
            align-items: center;
            padding: 12px 20px;
            color: var(--text-secondary);
            text-decoration: none;
            transition: all 0.3s;
            border-left: 3px solid transparent;
        }

        .sidebar-menu a:hover, .sidebar-menu a.active {
            background-color: rgba(255, 255, 255, 0.05);
            color: var(--text);
            border-left-color: var(--primary);
        }

        .sidebar-menu i {
            margin-right: 10px;
            width: 20px;
            text-align: center;
        }

        .sidebar-section {
            padding: 15px 20px;
            border-bottom: 1px solid var(--border);
        }

        .sidebar-title {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .history-item {
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .history-thumb {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            object-fit: cover;
            margin-right: 10px;
        }

        .history-info {
            flex: 1;
        }

        .history-title {
            font-size: 0.85rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 3px;
        }

        .history-author {
            font-size: 0.75rem;
            color: var(--text-secondary);
        }

        .history-date {
            font-size: 0.7rem;
            color: var(--text-secondary);
        }

        .history-actions {
            display: flex;
            gap: 5px;
        }

        .action-btn {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 0.8rem;
            padding: 5px;
            border-radius: 3px;
            transition: all 0.3s;
        }

        .action-btn:hover {
            color: var(--primary);
            background-color: rgba(255, 255, 255, 0.05);
        }

        /* Content Area */
        .content {
            flex: 1;
            padding: 30px;
            background-color: var(--dark);
            order: 1; /* Konten utama di kiri */
        }

        .page-title {
            margin-bottom: 25px;
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .page-title i {
            color: var(--primary);
        }

        /* Download Card */
        .download-card {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            margin-bottom: 30px;
        }

        .input-group {
            display: flex;
            margin-bottom: 20px;
        }

        .input-group input {
            flex: 1;
            padding: 15px;
            background-color: var(--dark-light);
            border: 1px solid var(--border);
            border-radius: 8px 0 0 8px;
            color: var(--text);
            font-size: 1rem;
        }

        .input-group button {
            padding: 0 25px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 0 8px 8px 0;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s;
        }

        .input-group button:hover {
            background-color: var(--primary-dark);
        }

        .input-group button:disabled {
            background-color: #555;
            cursor: not-allowed;
        }

        /* Preview Section */
        .preview-section {
            display: none;
            margin-top: 20px;
        }

        .video-preview {
            max-width: 300px;
            margin: 0 auto 20px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }

        .video-preview video {
            width: 100%;
            display: block;
        }

        .video-info {
            margin-bottom: 20px;
        }

        .video-info h3 {
            margin-bottom: 10px;
            font-size: 1.2rem;
        }

        .video-info p {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 5px;
        }

        .video-stats {
            display: flex;
            gap: 15px;
            margin-top: 10px;
        }

        .video-stats span {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .download-options {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .download-btn {
            flex: 1;
            min-width: 150px;
            padding: 12px 15px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s;
        }

        .download-btn:hover {
            background-color: var(--primary-dark);
            transform: translateY(-2px);
        }

        .download-btn.secondary {
            background-color: var(--dark-light);
        }

        .download-btn.secondary:hover {
            background-color: #2a2a2a;
        }

        /* Stats Section */
        .stats-section {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }

        .stat-card {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }

        .stat-icon {
            font-size: 2rem;
            color: var(--primary);
            margin-bottom: 10px;
        }

        .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .stat-label {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        /* Loading Animation */
        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-left: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Toast Notification */
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .toast.show {
            transform: translateY(0);
            opacity: 1;
        }

        .toast i {
            font-size: 1.2rem;
        }

        /* Halaman Pilihan Download */
        .download-page {
            display: none;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .back-btn {
            background: none;
            border: none;
            color: var(--text);
            font-size: 1.2rem;
            cursor: pointer;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: color 0.3s;
        }

        .back-btn:hover {
            color: var(--primary);
        }

        .download-options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .download-option-card {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            border: 2px solid transparent;
        }

        .download-option-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
        }

        .download-option-icon {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 15px;
        }

        .download-option-title {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }

        .download-option-desc {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }

            .sidebar {
                position: fixed;
                top: 70px;
                right: -280px; /* Ubah dari kiri ke kanan */
                height: calc(100vh - 70px);
                z-index: 99;
                overflow-y: auto;
            }

            .sidebar.active {
                right: 0; /* Ubah dari kiri ke kanan */
            }

            .overlay {
                display: none;
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                height: calc(100vh - 70px);
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 98;
            }

            .overlay.active {
                display: block;
            }

            .main-layout {
                flex-direction: column;
            }

            .content {
                padding: 20px 15px;
            }

            .download-options {
                flex-direction: column;
            }

            .stats-section {
                grid-template-columns: 1fr;
            }

            .download-options-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <i class="fab fa-tiktok"></i>
                    <span>TikTok Downloader</span>
                </div>
                <button class="menu-toggle" id="menuToggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </header>

    <div class="overlay" id="overlay"></div>

    <div class="main-layout">
        <main class="content">
            <!-- Halaman Utama -->
            <div class="main-page" id="mainPage">
                <h1 class="page-title">
                    <i class="fas fa-download"></i> Download Video TikTok
                </h1>

                <div class="stats-section">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-download"></i>
                        </div>
                        <div class="stat-value" id="downloadCount">0</div>
                        <div class="stat-label">Total Download</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-value" id="successRate">100%</div>
                        <div class="stat-label">Tingkat Keberhasilan</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-calendar-day"></i>
                        </div>
                        <div class="stat-value" id="todayCount">0</div>
                        <div class="stat-label">Download Hari Ini</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <div class="stat-value" id="speedTest">-</div>
                        <div class="stat-label">Kecepatan Download</div>
                    </div>
                </div>

                <div class="download-card">
                    <div class="input-group">
                        <input type="text" id="urlInput" placeholder="Tempel link TikTok di sini..." value="https://vm.tiktok.com/ZSHvuTfxyway5-dPA2v/">
                        <button id="downloadBtn">Download</button>
                    </div>

                    <div class="loading" id="loading">
                        <div class="spinner"></div>
                        <p>Mengambil informasi video...</p>
                    </div>
                </div>
            </div>

            <!-- Halaman Pilihan Download -->
            <div class="download-page" id="downloadPage">
                <button class="back-btn" id="backBtn">
                    <i class="fas fa-arrow-left"></i> Kembali
                </button>

                <h1 class="page-title">
                    <i class="fas fa-download"></i> Pilih Format Download
                </h1>

                <div class="download-card">
                    <div class="video-info">
                        <h3 id="videoTitle">Judul Video TikTok</h3>
                        <p id="videoAuthor"><i class="fas fa-user"></i> Oleh: @username</p>
                        <p id="videoDesc">Deskripsi video TikTok akan muncul di sini...</p>
                        <div class="video-stats">
                            <span id="videoLikes"><i class="fas fa-heart"></i> 0</span>
                            <span id="videoComments"><i class="fas fa-comment"></i> 0</span>
                            <span id="videoShares"><i class="fas fa-share"></i> 0</span>
                        </div>
                    </div>

                    <div class="download-options-grid">
                        <div class="download-option-card" id="downloadVideoBtn">
                            <div class="download-option-icon">
                                <i class="fas fa-video"></i>
                            </div>
                            <div class="download-option-title">Video HD</div>
                            <div class="download-option-desc">Download video tanpa watermark</div>
                        </div>
                        <div class="download-option-card" id="downloadAudioBtn">
                            <div class="download-option-icon">
                                <i class="fas fa-music"></i>
                            </div>
                            <div class="download-option-title">Audio MP3</div>
                            <div class="download-option-desc">Download audio saja</div>
                        </div>
                        <div class="download-option-card" id="downloadVideoWMBtn">
                            <div class="download-option-icon">
                                <i class="fas fa-water"></i>
                            </div>
                            <div class="download-option-title">Video WM</div>
                            <div class="download-option-desc">Download dengan watermark</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <aside class="sidebar" id="sidebar">
            <ul class="sidebar-menu">
                <li><a href="#" class="active"><i class="fas fa-home"></i> Beranda</a></li>
                <li><a href="#"><i class="fas fa-download"></i> Download</a></li>
                <li><a href="#"><i class="fas fa-history"></i> Riwayat</a></li>
                <li><a href="#"><i class="fas fa-star"></i> Favorit</a></li>
                <li><a href="#"><i class="fas fa-cog"></i> Pengaturan</a></li>
            </ul>

            <div class="sidebar-section">
                <div class="sidebar-title">Riwayat Download</div>
                <div id="historyList">
                    <!-- History items will be added here dynamically -->
                </div>
            </div>

            <div class="sidebar-section">
                <div class="sidebar-title">Statistik</div>
                <div class="stats-mini">
                    <div class="stat-mini">
                        <div class="stat-mini-value" id="miniDownloadCount">0</div>
                        <div class="stat-mini-label">Total Download</div>
                    </div>
                    <div class="stat-mini">
                        <div class="stat-mini-value" id="miniTodayCount">0</div>
                        <div class="stat-mini-label">Hari Ini</div>
                    </div>
                </div>
            </div>
        </aside>
    </div>

    <div class="toast" id="toast">
        <i class="fas fa-check-circle"></i>
        <span>Pesan berhasil!</span>
    </div>

    <script>
        // DOM Elements
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const urlInput = document.getElementById('urlInput');
        const downloadBtn = document.getElementById('downloadBtn');
        const loading = document.getElementById('loading');
        const mainPage = document.getElementById('mainPage');
        const downloadPage = document.getElementById('downloadPage');
        const backBtn = document.getElementById('backBtn');
        const videoTitle = document.getElementById('videoTitle');
        const videoAuthor = document.getElementById('videoAuthor');
        const videoDesc = document.getElementById('videoDesc');
        const videoLikes = document.getElementById('videoLikes');
        const videoComments = document.getElementById('videoComments');
        const videoShares = document.getElementById('videoShares');
        const downloadVideoBtn = document.getElementById('downloadVideoBtn');
        const downloadAudioBtn = document.getElementById('downloadAudioBtn');
        const downloadVideoWMBtn = document.getElementById('downloadVideoWMBtn');
        const historyList = document.getElementById('historyList');
        const toast = document.getElementById('toast');
        const downloadCount = document.getElementById('downloadCount');
        const successRate = document.getElementById('successRate');
        const todayCount = document.getElementById('todayCount');
        const speedTest = document.getElementById('speedTest');
        const miniDownloadCount = document.getElementById('miniDownloadCount');
        const miniTodayCount = document.getElementById('miniTodayCount');

        // State variables
        let currentVideoData = null;
        let totalDownloads = parseInt(localStorage.getItem('totalDownloads')) || 0;
        let successfulDownloads = parseInt(localStorage.getItem('successfulDownloads')) || 0;
        let todayDownloads = parseInt(localStorage.getItem('todayDownloads')) || 0;
        let downloadHistory = JSON.parse(localStorage.getItem('downloadHistory')) || [];

        // Initialize
        initApp();

        function initApp() {
            updateStats();
            loadDownloadHistory();
            setupEventListeners();
            checkTodayReset();
            
            // Auto-focus pada input URL
            urlInput.focus();
        }

        function setupEventListeners() {
            // Mobile sidebar
            menuToggle.addEventListener('click', openMobileSidebar);
            overlay.addEventListener('click', closeMobileSidebar);

            // Download video
            downloadBtn.addEventListener('click', function() {
                const url = urlInput.value.trim();
                
                if (!url) {
                    showToast('Silakan masukkan URL video TikTok');
                    return;
                }
                
                if (!isValidTikTokUrl(url)) {
                    showToast('URL TikTok tidak valid');
                    return;
                }
                
                fetchVideoData(url);
            });

            // Back button
            backBtn.addEventListener('click', function() {
                showMainPage();
            });

            // Download video button
            downloadVideoBtn.addEventListener('click', function() {
                if (!currentVideoData) return;
                downloadVideo('video');
            });

            // Download audio button
            downloadAudioBtn.addEventListener('click', function() {
                if (!currentVideoData) return;
                downloadVideo('audio');
            });

            // Download video with watermark button
            downloadVideoWMBtn.addEventListener('click', function() {
                if (!currentVideoData) return;
                downloadVideo('video_wm');
            });
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

        // Show toast notification
        function showToast(message) {
            toast.querySelector('span').textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Validasi URL TikTok
        function isValidTikTokUrl(url) {
            const tiktokPattern = /(https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\/(@[\w.-]+\/video\/\d+|[\w.-]+\/video\/\d+|\S+)|https?:\/\/(vm|vt)\.tiktok\.com\/\S+)/i;
            return tiktokPattern.test(url);
        }

        // Ambil data video dari SnapTik API
        async function fetchVideoData(url) {
            showLoading();

            try {
                // Menggunakan SnapTik API
                const apiUrl = `https://snaptik.app/action.php?url=${encodeURIComponent(url)}`;
                
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                const data = await response.json();
                
                if (data && data.data) {
                    currentVideoData = {
                        id: data.data.id || 'unknown',
                        title: data.data.title || 'Video TikTok',
                        author: data.data.author || '@user_tiktok',
                        description: data.data.description || '',
                        likes: formatNumber(data.data.likes) || '0',
                        comments: formatNumber(data.data.comments) || '0',
                        shares: formatNumber(data.data.shares) || '0',
                        thumbnail: data.data.thumbnail || 'https://via.placeholder.com/350x450/ff0050/ffffff?text=TikTok+Preview',
                        videoUrl: data.data.video_url || '',
                        audioUrl: data.data.music_url || '',
                        videoWmUrl: data.data.wm_video_url || ''
                    };
                    
                    hideLoading();
                    displayVideoData(currentVideoData);
                } else {
                    throw new Error('Gagal mengambil data video');
                }
            } catch (error) {
                console.error('Error:', error);
                
                // Fallback jika SnapTik API gagal
                try {
                    const fallbackApiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
                    const fallbackResponse = await fetch(fallbackApiUrl);
                    const fallbackData = await fallbackResponse.json();
                    
                    if (fallbackData.code === 0 && fallbackData.data) {
                        currentVideoData = {
                            id: fallbackData.data.id || 'unknown',
                            title: fallbackData.data.title || 'Video TikTok',
                            author: fallbackData.data.author?.unique_id || '@user_tiktok',
                            description: fallbackData.data.title || '',
                            likes: formatNumber(fallbackData.data.digg_count) || '0',
                            comments: formatNumber(fallbackData.data.comment_count) || '0',
                            shares: formatNumber(fallbackData.data.share_count) || '0',
                            thumbnail: fallbackData.data.cover || 'https://via.placeholder.com/350x450/ff0050/ffffff?text=TikTok+Preview',
                            videoUrl: fallbackData.data.play || fallbackData.data.wmplay || '',
                            audioUrl: fallbackData.data.music || fallbackData.data.music_info?.play_url || '',
                            videoWmUrl: fallbackData.data.wmplay || fallbackData.data.play || ''
                        };
                        
                        hideLoading();
                        displayVideoData(currentVideoData);
                    } else {
                        throw new Error('Gagal mengambil data video');
                    }
                } catch (fallbackError) {
                    console.error('Fallback Error:', fallbackError);
                    hideLoading();
                    showToast('Gagal mengambil data video. Silakan coba lagi.');
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

        // Tampilkan data video di halaman download
        function displayVideoData(data) {
            videoTitle.textContent = data.title;
            videoAuthor.innerHTML = `<i class="fas fa-user"></i> Oleh: ${data.author}`;
            videoDesc.textContent = data.description;
            videoLikes.innerHTML = `<i class="fas fa-heart"></i> ${data.likes}`;
            videoComments.innerHTML = `<i class="fas fa-comment"></i> ${data.comments}`;
            videoShares.innerHTML = `<i class="fas fa-share"></i> ${data.shares}`;
            
            // Pindah ke halaman download
            showDownloadPage();
            
            // Show success notification
            showToast('Data video berhasil diambil');
        }

        // Tampilkan halaman utama
        function showMainPage() {
            mainPage.style.display = 'block';
            downloadPage.style.display = 'none';
        }

        // Tampilkan halaman download
        function showDownloadPage() {
            mainPage.style.display = 'none';
            downloadPage.style.display = 'block';
        }

        // Download video
        function downloadVideo(type) {
            if (!currentVideoData) return;
            
            let downloadUrl = '';
            let fileExtension = '';
            let fileName = '';
            
            switch(type) {
                case 'video':
                    downloadUrl = currentVideoData.videoUrl;
                    fileExtension = 'mp4';
                    fileName = 'tiktok_video';
                    break;
                case 'audio':
                    downloadUrl = currentVideoData.audioUrl;
                    fileExtension = 'mp3';
                    fileName = 'tiktok_audio';
                    break;
                case 'video_wm':
                    downloadUrl = currentVideoData.videoWmUrl || currentVideoData.videoUrl;
                    fileExtension = 'mp4';
                    fileName = 'tiktok_video_wm';
                    break;
            }
            
            if (downloadUrl) {
                // Simulasi download
                showToast(`Mendownload ${type === 'audio' ? 'audio' : 'video'}...`);
                
                // Download sebenarnya
                setTimeout(() => {
                    const a = document.createElement('a');
                    a.href = downloadUrl;
                    a.download = `${fileName}_${Date.now()}.${fileExtension}`;
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
                    addToHistory(currentVideoData, type);
                    
                    // Tampilkan notifikasi sukses
                    showToast(`${type === 'audio' ? 'Audio' : 'Video'} berhasil didownload`);
                    
                    // Kembali ke halaman utama setelah download
                    setTimeout(() => {
                        showMainPage();
                    }, 1500);
                }, 1000);
            } else {
                showToast('URL download tidak tersedia. Silakan coba lagi.');
            }
        }

        // Update statistik
        function updateStats() {
            downloadCount.textContent = totalDownloads;
            miniDownloadCount.textContent = totalDownloads;
            const rate = totalDownloads > 0 ? Math.round((successfulDownloads / totalDownloads) * 100) : 100;
            successRate.textContent = `${rate}%`;
            todayCount.textContent = todayDownloads;
            miniTodayCount.textContent = todayDownloads;
            
            // Simulasi tes kecepatan
            if (totalDownloads > 0) {
                const speed = (1 + Math.random() * 4).toFixed(1);
                speedTest.textContent = `${speed} MB/s`;
            }
        }

        // Load download history
        function loadDownloadHistory() {
            historyList.innerHTML = '';
            
            if (downloadHistory.length === 0) {
                historyList.innerHTML = '<div class="history-item" style="justify-content: center; color: #666;">Belum ada riwayat download</div>';
                return;
            }
            
            // Tampilkan maksimal 5 item terbaru
            const recentHistory = downloadHistory.slice(-5).reverse();
            
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
                        <button class="action-btn download" data-id="${item.id}">
                            <i class="fas fa-redo"></i>
                        </button>
                    </div>
                `;
                
                historyList.appendChild(historyItem);
            });
            
            // Tambahkan event listener untuk tombol download ulang
            document.querySelectorAll('.action-btn.download').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const item = downloadHistory.find(h => h.id === id);
                    if (item && item.url) {
                        urlInput.value = item.url;
                        fetchVideoData(item.url);
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
                url: urlInput.value,
                date: new Date().toLocaleString('id-ID'),
                type: type
            };
            
            downloadHistory.push(historyItem);
            localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
            loadDownloadHistory();
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
            downloadBtn.disabled = true;
            downloadBtn.textContent = 'Mengambil...';
        }

        // Sembunyikan loading
        function hideLoading() {
            loading.style.display = 'none';
            downloadBtn.disabled = false;
            downloadBtn.textContent = 'Download';
        }
    </script>
</body>
</html>
