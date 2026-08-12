// Import CSS untuk dikompilasi Vite
import '../css/style.css';
// Tambahkan di deretan import atas
import { initStateVisualizer } from './state-visualizer.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Modul
    init3DBackground();
    initChatSimulator();
    initStateVisualizer(); // <-- Panggil di sini

    // ... (kode GSAP yang sudah ada)
});
// Import GSAP dan Plugin
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Modul Internal
import { init3DBackground } from './webgl-bg.js';
import { initChatSimulator } from './chat-simulator.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Modul
    init3DBackground();
    initChatSimulator();

    // Jalankan inisialisasi WebGL 3D
    init3DBackground();
    console.log("🚀 MAYA Digital Experience berhasil dimuat melalui Vite!");
    // 2. Registrasi Plugin GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 3. Setup Animasi Hero Section (Load awal)
    const tl = gsap.timeline();
    tl.from(".hero-content h1", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
      .from(".hero-content .subtitle", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .from(".tagline", { opacity: 0, duration: 1 }, "-=0.4")
      .from(".scroll-indicator", { opacity: 0, y: -20, duration: 1 }, "-=0.5");

    // 4. Animasi Scroll Trigger untuk Simulator
    gsap.from(".app-container", {
        scrollTrigger: {
            trigger: ".simulator-section",
            start: "top 80%", // Animasi mulai saat elemen 80% masuk layar
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.5)"
    });

    // 5. Animasi Scroll Trigger untuk MAYA Lab
    gsap.from(".lab-card", {
        scrollTrigger: {
            trigger: ".lab-section",
            start: "top 85%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});