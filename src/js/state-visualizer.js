export function initStateVisualizer() {
    const labContainer = document.querySelector('.lab-card');
    if (!labContainer) return;

    const mayaFlow = {
        name: "IDLE (Menu Utama)",
        id: "IDLE",
        children: [
            {
                name: "DOMISILI",
                id: "MENU_DOMISILI",
                children: [
                    { name: "Melamar Kerja" },
                    { name: "Buka Rekening" },
                    { name: "Lainnya" }
                ]
            },
            {
                name: "SKU",
                id: "MENU_SKU",
                children: [
                    { name: "Usaha Mikro" },
                    { name: "PT / CV" }
                ]
            },
            {
                name: "HANDOFF (CS)",
                id: "HANDOFF",
                status: "warning",
                children: [
                    { name: "Admin Takeover" }
                ]
            }
        ]
    };

    function createNodeElement(nodeData) {
        const branch = document.createElement('div');
        branch.className = 'tree-branch';

        const node = document.createElement('div');
        // Tambahkan atribut data-state agar mudah dipilih via JavaScript
        node.className = `tree-node ${nodeData.status || ''}`;
        if (nodeData.id) node.setAttribute('data-node-id', nodeData.id);
        node.textContent = nodeData.name;
        branch.appendChild(node);

        if (nodeData.children && nodeData.children.length > 0) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-children';
            nodeData.children.forEach(child => {
                childrenContainer.appendChild(createNodeElement(child));
            });
            branch.appendChild(childrenContainer);
        }

        return branch;
    }

    const visualizerWrapper = document.createElement('div');
    visualizerWrapper.className = 'state-visualizer';
    visualizerWrapper.innerHTML = `<h3>Visualisasi Routing Intent (Live Reactive)</h3>`;
    
    const treeContainer = document.createElement('div');
    treeContainer.className = 'tree-container';
    treeContainer.appendChild(createNodeElement(mayaFlow));
    
    visualizerWrapper.appendChild(treeContainer);
    labContainer.appendChild(visualizerWrapper);
}

// Fungsi global/ekspor untuk menyalakan node berdasarkan state bot
export function updateActiveStateNode(currentState) {
    // Reset semua node aktif
    const allNodes = document.querySelectorAll('.tree-node');
    allNodes.forEach(n => n.classList.remove('active'));

    // Cari node yang cocok dengan state saat ini lalu nyalakan
    const targetNode = document.querySelector(`[data-node-id="${currentState}"]`);
    if (targetNode) {
        targetNode.classList.add('active');
    } else {
        // Default ke IDLE jika state tidak ditemukan
        const idleNode = document.querySelector(`[data-node-id="IDLE"]`);
        if (idleNode) idleNode.classList.add('active');
    }
}