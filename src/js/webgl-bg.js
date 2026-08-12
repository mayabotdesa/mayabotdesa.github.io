import * as THREE from 'three';

function isLowEndDevice() {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    return isMobile || cores <= 4;
}

export function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 20;

    // Partikel Jaringan Digital Latar Belakang
    const geometry = new THREE.BufferGeometry();
    const particlesCount = isLowEndDevice() ? 150 : 350; // Lebih ringan untuk HP
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40; 
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.18,
        color: 0x22c55e, // Mengikuti warna hijau brand Tailwind
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.0008;
        particlesMesh.rotation.x += 0.0003;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}