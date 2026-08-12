import { updateActiveStateNode } from './state-visualizer.js';

export function initChatSimulator() {
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // State Internal Bot
    let currentState = 'IDLE';
    let isCSMode = false;

    // Utilitas Sapaan Dinamis
    function getDynamicGreeting() {
        const currentHour = new Date().getHours();
        if (currentHour >= 3 && currentHour < 11) return "Selamat Pagi";
        if (currentHour >= 11 && currentHour < 15) return "Selamat Siang";
        if (currentHour >= 15 && currentHour < 18) return "Selamat Sore";
        return "Selamat Malam";
    }

    // Pendeteksi Intent (Regex)
    function detectMainIntent(text) {
        const input = text.toLowerCase().trim();
        if (/^(9|cs|bantuan|admin|tolong|operator|petugas)$/i.test(input)) return 'HANDOFF';
        if (/^(1)$/i.test(input) || /(domisili|surat tinggal)/i.test(input)) return 'DOMISILI';
        if (/^(2)$/i.test(input) || /(sku|keterangan usaha|surat usaha|bikin sku)/i.test(input)) return 'SKU';
        if (/^(3)$/i.test(input) || /(sktm|tidak mampu|miskin)/i.test(input)) return 'SKTM';
        if (/^(4)$/i.test(input) || /(belum menikah|belum nikah|lajang|jomblo)/i.test(input)) return 'BELUM_MENIKAH';
        if (/^(5)$/i.test(input) || /(cek status|status surat|status pengajuan|progres)/i.test(input)) return 'CEK_STATUS';
        if (/^(6)$/i.test(input) || /(kependudukan|ktp|kk|akte|kelahiran|kematian|pindah)/i.test(input)) return 'KEPENDUDUKAN';
        if (/^(7)$/i.test(input) || /(pak kades|online|formulir|form)/i.test(input)) return 'PAK_KADES';
        if (/^(8)$/i.test(input) || /(info layanan|persyaratan umum|jam kerja|syarat)/i.test(input)) return 'INFO_LAYANAN';
        if (/(bansos|pkh|blt)/i.test(input)) return 'BANSOS';
        if (/(lapor|pengaduan|rusak|banjir|jalan|mati lampu)/i.test(input)) return 'PENGADUAN';
        return null; 
    }

    const mainMenu = `${getDynamicGreeting()} Warga Gayaman! 👋\n\nSaya *MAYA* (Mitra Administrasi Desa Gayaman), Asisten Digital Anda.\n\nSilakan pilih layanan dengan membalas angka:\n\n1️⃣ Surat Keterangan Domisili\n2️⃣ Surat Keterangan Usaha (SKU)\n3️⃣ Surat Keterangan Tidak Mampu (SKTM)\n4️⃣ Surat Keterangan Belum Menikah\n5️⃣ Cek Status Pengajuan Surat\n6️⃣ Layanan Kependudukan\n7️⃣ Layanan Online PAK KADES\n8️⃣ Informasi Persyaratan\n9️⃣ Hubungi Petugas Desa`;
    const footerInfo = `\n\n💬 _Ketik *0* ke Menu Utama._`;

    // Prosesor Logika Utama
    function processInput(text) {
        const textLower = text.toLowerCase().trim();
        const intent = detectMainIntent(textLower);

        if (isCSMode) {
            if (textLower === "tutup cs") {
                isCSMode = false;
                currentState = 'IDLE';
                updateActiveStateNode(currentState);
                return "✅ *SESI BANTUAN DIAKHIRI*\n*MAYA* kembali mengambil alih layanan otomatis.";
            }
            return "👨‍💼 _(Simulasi) Perangkat desa telah menerima pesan Anda._";
        }

        if (intent === 'HANDOFF') {
            isCSMode = true;
            currentState = 'HANDOFF';
            updateActiveStateNode(currentState);
            return "👨‍💼 *MENGHUBUNGKAN KE PERANGKAT DESA...*\n\nMohon tunggu sejenak, Admin kami akan segera merespons.\n*(Ketik *TUTUP CS* apabila urusan selesai).*";
        }

        const globalCancelTokens = ["0", "batal", "kembali", "menu", "menu utama", "awal"];
        if (globalCancelTokens.includes(textLower) && currentState !== 'IDLE') {
            currentState = 'IDLE';
            updateActiveStateNode(currentState); // <-- Diagram kembali ke IDLE
            return `🔄 *Navigasi dibatalkan*.\n\n${mainMenu}`;
        }

        // State Routing
        if (currentState === 'MENU_DOMISILI') {
            if (textLower === '1') { 
                currentState = 'IDLE'; 
                updateActiveStateNode(currentState);
                return `📄 *Domisili (Melamar Pekerjaan)*\nSyarat: KTP, KK, Pengantar RT/RW.\n_Pengerjaan 1 Hari (Gratis)._` + footerInfo; 
            }
            if (textLower === '2') { 
                currentState = 'IDLE'; 
                updateActiveStateNode(currentState);
                return `📄 *Domisili (Rekening Bank)*\nSyarat: KTP, KK, Pengantar RT/RW.\n_Pengerjaan 1 Hari (Gratis)._` + footerInfo; 
            }
            if (textLower === '3') { 
                currentState = 'IDLE'; 
                updateActiveStateNode(currentState);
                return `📄 *Domisili (Keperluan Lainnya)*\nSyarat: KTP, KK, Pengantar RT/RW.\n_Pengerjaan 1 Hari (Gratis)._` + footerInfo; 
            }
            return "⚠️ Pilihan tidak valid. Ketik 1, 2, atau 3." + footerInfo;
        }

        if (currentState === 'MENU_SKU') {
            if (textLower === '1') { 
                currentState = 'IDLE'; 
                updateActiveStateNode(currentState);
                return `📄 *SKU (Usaha Mikro/Kecil)*\nSyarat: KTP, KK, Pengantar RT/RW, Foto tempat usaha.\n_Pengerjaan 1 Hari (Gratis)._` + footerInfo; 
            }
            if (textLower === '2') { 
                currentState = 'IDLE'; 
                updateActiveStateNode(currentState);
                return `📄 *SKU (Menengah/Besar)*\nSyarat: KTP Direktur, KK, Akta Pendirian, Pengantar RT/RW.\n_Pengerjaan 1 Hari (Gratis)._` + footerInfo; 
            }
            return "⚠️ Pilihan tidak valid. Ketik 1 atau 2." + footerInfo;
        }

        if (currentState === 'CEK_STATUS_NIK') {
            const nikClean = textLower.replace(/[^0-9]/g, '');
            if (nikClean.length === 16) {
                currentState = 'IDLE';
                updateActiveStateNode(currentState);
                return `🔍 *Status Surat*\nNIK : ${nikClean}\nStatus : 📝 *Sedang diproses Kades*` + footerInfo;
            }
            return "⚠️ NIK harus 16 Digit Angka. Ketik ulang." + footerInfo;
        }

        // Idle Routing (Menu Utama)
        if (intent === 'DOMISILI') {
            currentState = 'MENU_DOMISILI';
            updateActiveStateNode(currentState); // <-- Memicu diagram menyala secara real-time
            return `📄 *1. Keterangan Domisili*\n\nPilih keperluan:\n1️⃣ Melamar Pekerjaan\n2️⃣ Pembuatan Rekening Bank\n3️⃣ Keperluan Lainnya` + footerInfo;
        }
        
        if (intent === 'SKU') {
            currentState = 'MENU_SKU';
            updateActiveStateNode(currentState); // <-- Memicu diagram SKU menyala
            return `📄 *2. Keterangan Usaha (SKU)*\n\nPilih jenis usaha:\n1️⃣ Usaha Mikro / Kecil\n2️⃣ Usaha Menengah / Besar (PT/CV)` + footerInfo;
        }

        if (intent === 'CEK_STATUS') {
            currentState = 'CEK_STATUS_NIK';
            updateActiveStateNode(currentState);
            return `🔍 *5. Cek Status Pengajuan*\n\nSilakan ketik *16 Digit NIK* Anda.` + footerInfo;
        }

        if (intent === 'PAK_KADES') {
            currentState = 'IDLE';
            updateActiveStateNode(currentState);
            return `📱 *Layanan Online PAK KADES*\nBuka tautan ini untuk mengisi form mandiri:\n🔗 http://s.id/PAKKADESGAYAMAN` + footerInfo;
        }

        // Default / Fallback
        currentState = 'IDLE';
        updateActiveStateNode(currentState);
        return mainMenu;
    }

    // Manipulasi DOM
    function appendBubble(sender, text) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}`;
        bubble.textContent = text;
        chatWindow.appendChild(bubble);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function showTyping() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing';
        indicator.textContent = 'MAYA sedang mengetik...';
        chatWindow.appendChild(indicator);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function removeTyping() {
        const indicator = document.getElementById('typing');
        if (indicator) indicator.remove();
    }

    // Inisialisasi Pesan Pertama & Set State Node Awal
    setTimeout(() => { 
        appendBubble('bot', mainMenu); 
        updateActiveStateNode('IDLE');
    }, 800);

    // Pengendali Aksi Kirim
    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendBubble('user', text);
        chatInput.value = '';
        showTyping();

        setTimeout(() => {
            removeTyping();
            const response = processInput(text);
            appendBubble('bot', response);
        }, Math.random() * 500 + 500); 
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}