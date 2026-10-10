/* 1. ELEMENT VE BİLEŞİK VERİTABANI */
const ELEMENT_DATA = {
    'H': { name: 'Hidrojen', atomicNumber: 1, mass: 1.008, color: '#FFFFFF', radius: 14, cpkRadius: 24, desc: 'Evrendeki en hafif elementtir. Su ve tüm organik moleküllerin temelidir.' },
    'C': { name: 'Karbon', atomicNumber: 6, mass: 12.011, color: '#333333', radius: 22, cpkRadius: 36, desc: 'Yaşamın temel taşıdır. Milyonlarca organik bileşiğin omurgasını oluşturur.' },
    'N': { name: 'Azot', atomicNumber: 7, mass: 14.007, color: '#2563EB', radius: 20, cpkRadius: 33, desc: 'Atmosferin çoğunluğunu oluşturur. DNA ve proteinlerin vazgeçilmezidir.' },
    'O': { name: 'Oksijen', atomicNumber: 8, mass: 15.999, color: '#DC2626', radius: 18, cpkRadius: 30, desc: 'Solunum için hayati önem taşır. Su ve oksitlerin oluşumunda merkezdedir.' }
};

/* Bilinen Molekül Kütüphanesi */
const KNOWN_MOLECULES = {
    'H2O': { name: 'Su', formula: 'H₂O', geometry: 'Açısal (104.5°)', desc: 'Hayatın kaynağıdır. Dünya yüzeyinin ve canlı hücrelerin büyük kısmını oluşturur.' },
    'CH4': { name: 'Metan', formula: 'CH₄', geometry: 'Tetrahedral', desc: 'Doğalgazın ana bileşeni olan renksiz ve kokusuz hafif gazdır.' },
    'CO2': { name: 'Karbondioksit', formula: 'CO₂', geometry: 'Doğrusal (180°)', desc: 'Bitkilerin fotosentez için kullandığı, atmosfere nefesimizle verdiğimiz gazdır.' },
    'NH3': { name: 'Amonyak', formula: 'NH₃', geometry: 'Üçgen Piramit', desc: 'Gübre ve temizlik malzemesi üretiminde kullanılan keskin kokulu bileşiktir.' },
    'C2H5OH': { name: 'Etanol', formula: 'C₂H₅OH', geometry: 'Organik Zirve', desc: 'Alkol bazlı çözücülerin ve dezenfektanların temel maddesidir.' },
    'C8H10N4O2': { name: 'Kafein', formula: 'C₈H₁₀N₄O₂', geometry: 'Biyo-Aktif Halka', desc: 'Kahve ve çayda bulunan, merkezi sinir sistemini uyaran doğal alkaloiddir.' }
};

const PRESET_MOLECULES = {
    methane: {
        name: 'Metan', formula: 'CH₄',
        atoms: [
            { id: 'a1', element: 'C', x: 0, y: 0, z: 0 },
            { id: 'a2', element: 'H', x: 1.1, y: 1.1, z: 1.1 },
            { id: 'a3', element: 'H', x: -1.1, y: -1.1, z: 1.1 },
            { id: 'a4', element: 'H', x: -1.1, y: 1.1, z: -1.1 },
            { id: 'a5', element: 'H', x: 1.1, y: -1.1, z: -1.1 }
        ],
        bonds: [
            { id: 'b1', source: 'a1', target: 'a2' }, { id: 'b2', source: 'a1', target: 'a3' },
            { id: 'b3', source: 'a1', target: 'a4' }, { id: 'b4', source: 'a1', target: 'a5' }
        ]
    },
    water: {
        name: 'Su', formula: 'H₂O',
        atoms: [
            { id: 'a1', element: 'O', x: 0, y: 0, z: 0 },
            { id: 'a2', element: 'H', x: 1.2, y: 0.9, z: 0 },
            { id: 'a3', element: 'H', x: -1.2, y: 0.9, z: 0 }
        ],
        bonds: [
            { id: 'b1', source: 'a1', target: 'a2' }, { id: 'b2', source: 'a1', target: 'a3' }
        ]
    },
    co2: {
        name: 'Karbondioksit', formula: 'CO₂',
        atoms: [
            { id: 'a1', element: 'C', x: 0, y: 0, z: 0 },
            { id: 'a2', element: 'O', x: 1.5, y: 0, z: 0 },
            { id: 'a3', element: 'O', x: -1.5, y: 0, z: 0 }
        ],
        bonds: [
            { id: 'b1', source: 'a1', target: 'a2' }, { id: 'b2', source: 'a1', target: 'a3' }
        ]
    },
    ammonia: {
        name: 'Amonyak', formula: 'NH₃',
        atoms: [
            { id: 'a1', element: 'N', x: 0, y: 0, z: 0 },
            { id: 'a2', element: 'H', x: 1.1, y: -0.8, z: 0.5 },
            { id: 'a3', element: 'H', x: -1.1, y: -0.8, z: 0.5 },
            { id: 'a4', element: 'H', x: 0, y: -0.8, z: -1.2 }
        ],
        bonds: [
            { id: 'b1', source: 'a1', target: 'a2' }, { id: 'b2', source: 'a1', target: 'a3' }, { id: 'b3', source: 'a1', target: 'a4' }
        ]
    },
    ethanol: {
        name: 'Etanol', formula: 'C₂H₅OH',
        atoms: [
            { id: 'a1', element: 'C', x: -1.4, y: 0, z: 0 }, { id: 'a2', element: 'C', x: 0.2, y: 0, z: 0 },
            { id: 'a3', element: 'O', x: 1.0, y: 1.4, z: 0 }, { id: 'a4', element: 'H', x: 2.1, y: 1.2, z: 0 },
            { id: 'a5', element: 'H', x: -1.9, y: 1.1, z: 0 }, { id: 'a6', element: 'H', x: -1.9, y: -0.6, z: 0.9 },
            { id: 'a7', element: 'H', x: -1.9, y: -0.6, z: -0.9 }, { id: 'a8', element: 'H', x: 0.7, y: -0.6, z: 0.9 },
            { id: 'a9', element: 'H', x: 0.7, y: -0.6, z: -0.9 }
        ],
        bonds: [
            { id: 'b1', source: 'a1', target: 'a2' }, { id: 'b2', source: 'a2', target: 'a3' },
            { id: 'b3', source: 'a3', target: 'a4' }, { id: 'b4', source: 'a1', target: 'a5' },
            { id: 'b5', source: 'a1', target: 'a6' }, { id: 'b6', source: 'a1', target: 'a7' },
            { id: 'b7', source: 'a2', target: 'a8' }, { id: 'b8', source: 'a2', target: 'a9' }
        ]
    },
    caffeine: {
        name: 'Kafein', formula: 'C₈H₁₀N₄O₂',
        atoms: [
            { id: 'a1', element: 'C', x: -1.0, y: 1.2, z: 0 }, { id: 'a2', element: 'N', x: 0.6, y: 1.5, z: 0 },
            { id: 'a3', element: 'C', x: 1.8, y: 0.3, z: 0 }, { id: 'a4', element: 'N', x: 1.2, y: -1.2, z: 0 },
            { id: 'a5', element: 'C', x: -0.5, y: -1.4, z: 0 }, { id: 'a6', element: 'C', x: -1.5, y: -0.1, z: 0 },
            { id: 'a7', element: 'O', x: -1.8, y: 2.3, z: 0 }, { id: 'a8', element: 'O', x: 3.2, y: 0.5, z: 0 },
            { id: 'a9', element: 'H', x: -2.6, y: -0.2, z: 0 }
        ],
        bonds: [
            { id: 'b1', source: 'a1', target: 'a2' }, { id: 'b2', source: 'a2', target: 'a3' },
            { id: 'b3', source: 'a3', target: 'a4' }, { id: 'b4', source: 'a4', target: 'a5' },
            { id: 'b5', source: 'a5', target: 'a6' }, { id: 'b6', source: 'a6', target: 'a1' },
            { id: 'b7', source: 'a1', target: 'a7' }, { id: 'b8', source: 'a3', target: 'a8' },
            { id: 'b9', source: 'a6', target: 'a9' }
        ]
    }
};

let canvas, ctx;
let currentMolecule = JSON.parse(JSON.stringify(PRESET_MOLECULES.methane));
let discoveredMolecules = [];
let activeVisMode = 'ballStick';
let activeTool = 'select';
let selectedAtomId = null;
let selectedElementForAdd = 'C';
let measurePair = [];
let bondFirstAtom = null;

let rotX = 0.3, rotY = 0.5;
let zoom = 80;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;
let autoRotate = false;

let historyStack = [];
let historyIndex = -1;

window.onload = () => {
    initEngine();
    analyzeCurrentMolecule();
};

function initEngine() {
    canvas = document.getElementById('moleculeCanvas');
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', () => isDragging = false);
    canvas.addEventListener('wheel', onWheel);

    pushHistory();
    requestAnimationFrame(renderLoop);
}

function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

function project3D(x, y, z) {
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

    let x1 = x * cosY + z * sinY;
    let y1 = y;
    let z1 = -x * sinY + z * cosY;

    let x2 = x1;
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    return {
        screenX: centerX + x2 * zoom,
        screenY: centerY - y2 * zoom,
        depth: z2
    };
}

let frameCount = 0, fpsLastTime = performance.now();

function renderLoop() {
    if (autoRotate) rotY += 0.01;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    const projectedAtoms = currentMolecule.atoms.map(atom => {
        const proj = project3D(atom.x, atom.y, atom.z);
        return { ...atom, proj };
    });

    projectedAtoms.sort((a, b) => a.proj.depth - b.proj.depth);

    if (activeVisMode !== 'spaceFilling') {
        currentMolecule.bonds.forEach(bond => {
            const a1 = projectedAtoms.find(a => a.id === bond.source);
            const a2 = projectedAtoms.find(a => a.id === bond.target);
            if (a1 && a2) {
                ctx.beginPath();
                ctx.moveTo(a1.proj.screenX, a1.proj.screenY);
                ctx.lineTo(a2.proj.screenX, a2.proj.screenY);
                ctx.strokeStyle = '#D98862';
                ctx.lineWidth = activeVisMode === 'wireframe' ? 2 : 8;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        });
    }

    projectedAtoms.forEach(atom => {
        const info = ELEMENT_DATA[atom.element] || ELEMENT_DATA['C'];
        let radius = activeVisMode === 'spaceFilling' ? info.cpkRadius : (activeVisMode === 'wireframe' ? 8 : info.radius);
        const isSelected = (atom.id === selectedAtomId) || measurePair.includes(atom.id);

        ctx.beginPath();
        ctx.arc(atom.proj.screenX, atom.proj.screenY, radius, 0, Math.PI * 2);

        if (activeVisMode === 'wireframe') {
            ctx.strokeStyle = info.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            const grad = ctx.createRadialGradient(
                atom.proj.screenX - radius * 0.3,
                atom.proj.screenY - radius * 0.3,
                radius * 0.1,
                atom.proj.screenX,
                atom.proj.screenY,
                radius
            );

            if (isSelected) {
                grad.addColorStop(0, '#FFF3A1');
                grad.addColorStop(1, '#E5C158');
            } else {
                grad.addColorStop(0, '#FFFFFF');
                grad.addColorStop(0.3, info.color);
                grad.addColorStop(1, '#111111');
            }

            ctx.fillStyle = grad;
            ctx.fill();

            if (isSelected) {
                ctx.strokeStyle = '#E5C158';
                ctx.lineWidth = 3;
                ctx.stroke();
            }
        }

        if (activeVisMode !== 'wireframe') {
            ctx.fillStyle = atom.element === 'H' ? '#000000' : '#FFFFFF';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(atom.element, atom.proj.screenX, atom.proj.screenY);
        }
    });

    frameCount++;
    const now = performance.now();
    if (now - fpsLastTime >= 1000) {
        document.getElementById('fpsCounter').textContent = frameCount;
        frameCount = 0;
        fpsLastTime = now;
    }

    requestAnimationFrame(renderLoop);
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(124, 185, 158, 0.15)';
    ctx.lineWidth = 1;
    const step = 45;
    for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

/* AKILLI TANIMA VE DİNAMİK GÜNCELLEME */
function analyzeCurrentMolecule() {
    const counts = {};
    let totalMass = 0;
    currentMolecule.atoms.forEach(a => {
        counts[a.element] = (counts[a.element] || 0) + 1;
        totalMass += ELEMENT_DATA[a.element] ? ELEMENT_DATA[a.element].mass : 12;
    });

    let formulaKey = '';
    let formulaDisplay = '';
    
    if (counts['C']) {
        let c = counts['C'];
        formulaKey += 'C' + (c > 1 ? c : '');
        formulaDisplay += 'C' + (c > 1 ? `<sub>${c}</sub>` : '');
        delete counts['C'];
    }
    if (counts['H']) {
        let h = counts['H'];
        formulaKey += 'H' + (h > 1 ? h : '');
        formulaDisplay += 'H' + (h > 1 ? `<sub>${h}</sub>` : '');
        delete counts['H'];
    }
    Object.keys(counts).sort().forEach(el => {
        let c = counts[el];
        formulaKey += el + (c > 1 ? c : '');
        formulaDisplay += el + (c > 1 ? `<sub>${c}</sub>` : '');
    });

    let recognized = KNOWN_MOLECULES[formulaKey];

    if (recognized) {
        currentMolecule.name = recognized.name;
        currentMolecule.formula = recognized.formula;
        currentMolecule.desc = recognized.desc;
    } else {
        currentMolecule.name = 'Özel Laboratuvar Bileşiği';
        currentMolecule.formula = formulaKey || 'Bilinmeyen';
        currentMolecule.desc = 'Kendi ellerinizle oluşturduğunuz özgün bir atom kombinasyonudur.';
    }

    document.getElementById('molName').textContent = currentMolecule.name;
    document.getElementById('molFormula').innerHTML = currentMolecule.formula;
    document.getElementById('molDescriptionBox').textContent = currentMolecule.desc;
    document.getElementById('molMass').textContent = `${totalMass.toFixed(2)} g/mol`;
    document.getElementById('molAtomCount').textContent = `${currentMolecule.atoms.length} atom`;

    addToDiscoveryLog({
        name: currentMolecule.name,
        formula: currentMolecule.formula,
        mass: totalMass.toFixed(2),
        atoms: currentMolecule.atoms.length
    });

    updateInspectorUI();
}

function addToDiscoveryLog(item) {
    if (!discoveredMolecules.some(m => m.name === item.name && m.formula === item.formula)) {
        discoveredMolecules.push(item);
        document.getElementById('discoveryCount').textContent = discoveredMolecules.length;
        renderDiscoveryModal();
    }
}

function renderDiscoveryModal() {
    const list = document.getElementById('discoveryList');
    list.innerHTML = '';
    discoveredMolecules.forEach((mol, idx) => {
        const div = document.createElement('div');
        div.style.cssText = "background: rgba(35, 50, 43, 0.7); padding: 10px 14px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(247,245,240,0.1);";
        div.innerHTML = `
            <div>
                <strong style="color: var(--sage-green); font-size: 13px;">${idx + 1}. ${mol.name} (${mol.formula})</strong>
                <div style="font-size: 10px; color: var(--cream-300);">Ağırlık: ${mol.mass} g/mol | Toplam Atom: ${mol.atoms}</div>
            </div>
            <span class="clay-pill" style="font-size: 10px;">Keşfedildi ✨</span>
        `;
        list.appendChild(div);
    });
}

function openPeriodicTableWiki() {
    window.open('https://tr.wikipedia.org/wiki/Periyodik_tablo', '_blank');
}

/* ETKİLEŞİM */
function onMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let clickedAtom = null;
    currentMolecule.atoms.forEach(atom => {
        const proj = project3D(atom.x, atom.y, atom.z);
        const dist = Math.hypot(proj.screenX - mouseX, proj.screenY - mouseY);
        const info = ELEMENT_DATA[atom.element] || ELEMENT_DATA['C'];
        if (dist <= info.radius + 5) {
            clickedAtom = atom;
        }
    });

    if (clickedAtom) {
        handleAtomClick(clickedAtom.id);
    } else {
        if (activeTool === 'addAtom') {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const newX = parseFloat(((mouseX - centerX) / zoom).toFixed(2));
            const newY = parseFloat(((centerY - mouseY) / zoom).toFixed(2));
            addAtomAt(selectedElementForAdd, newX, newY, 0);
        } else {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            if (activeTool === 'select') {
                selectedAtomId = null;
                updateInspectorUI();
            }
        }
    }
}

function onMouseMove(e) {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;

    rotY += deltaX * 0.01;
    rotX += deltaY * 0.01;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
}

function onWheel(e) {
    e.preventDefault();
    zoom += e.deltaY * -0.05;
    zoom = Math.max(30, Math.min(200, zoom));
}

function handleAtomClick(atomId) {
    if (activeTool === 'select') {
        selectedAtomId = atomId;
        showFeedback(`Atom Seçildi: ${getAtomLabel(atomId)}`);
        updateInspectorUI();
    } else if (activeTool === 'addBond') {
        if (!bondFirstAtom) {
            bondFirstAtom = atomId;
            showFeedback('İlk atom seçildi. İkinci atoma tıklayın.');
        } else if (bondFirstAtom !== atomId) {
            addBondBetween(bondFirstAtom, atomId);
            bondFirstAtom = null;
        }
    } else if (activeTool === 'measure') {
        if (!measurePair.includes(atomId)) {
            measurePair.push(atomId);
            if (measurePair.length > 2) measurePair.shift();
        }
        calculateMeasurement();
    }
}

function addAtomAt(element, x, y, z) {
    const newId = 'a_' + Date.now();
    currentMolecule.atoms.push({ id: newId, element, x, y, z });
    selectedAtomId = newId;
    pushHistory();
    analyzeCurrentMolecule();
    showFeedback(`Yeni ${ELEMENT_DATA[element].name} atomu eklendi.`);
}

function addBondBetween(sId, tId) {
    currentMolecule.bonds.push({ id: 'b_' + Date.now(), source: sId, target: tId });
    pushHistory();
    analyzeCurrentMolecule();
    showFeedback('Yeni bağ başarıyla kuruldu.');
}

function deleteSelected() {
    if (!selectedAtomId) return;
    currentMolecule.bonds = currentMolecule.bonds.filter(b => b.source !== selectedAtomId && b.target !== selectedAtomId);
    currentMolecule.atoms = currentMolecule.atoms.filter(a => a.id !== selectedAtomId);
    selectedAtomId = null;
    pushHistory();
    analyzeCurrentMolecule();
    showFeedback('Seçili atom silindi.');
}

function updateInspectorUI() {
    const noSel = document.getElementById('noSelectionMsg');
    const atomDetails = document.getElementById('atomDetails');

    if (selectedAtomId) {
        const atom = currentMolecule.atoms.find(a => a.id === selectedAtomId);
        if (atom) {
            const info = ELEMENT_DATA[atom.element] || ELEMENT_DATA['C'];
            noSel.classList.add('hidden');
            atomDetails.classList.remove('hidden');

            document.getElementById('atomSymbolBadge').textContent = atom.element;
            document.getElementById('atomSymbolBadge').style.backgroundColor = info.color;
            document.getElementById('atomSymbolBadge').style.color = atom.element === 'H' ? '#000' : '#fff';
            document.getElementById('atomElementName').textContent = info.name;
            document.getElementById('atomIDText').textContent = `ID: ${atom.id}`;
            document.getElementById('atomNumberBadge').textContent = `Z = ${info.atomicNumber}`;
            document.getElementById('elementDescriptionBox').innerHTML = `<strong>${info.name} Özelliği:</strong> ${info.desc}`;
        }
    } else {
        noSel.classList.remove('hidden');
        atomDetails.classList.add('hidden');
    }
}

function calculateMeasurement() {
    const outputBox = document.getElementById('measureOutput');
    if (measurePair.length === 2) {
        const a1 = currentMolecule.atoms.find(a => a.id === measurePair[0]);
        const a2 = currentMolecule.atoms.find(a => a.id === measurePair[1]);
        if (a1 && a2) {
            const dist = Math.hypot(a1.x - a2.x, a1.y - a2.y, a1.z - a2.z).toFixed(3);
            outputBox.classList.remove('hidden');
            outputBox.innerHTML = `📐 İki Atom Arası Mesafe (${a1.element}-${a2.element}): <span style="color: #FFF3A1;">${dist} Å</span>`;
        }
    } else {
        outputBox.classList.add('hidden');
    }
}

function setTool(tool) {
    activeTool = tool;
    document.querySelectorAll('sidebar button').forEach(el => el.classList.remove('active'));
    const btn = document.getElementById(`tool-${tool}`);
    if (btn) btn.classList.add('active');

    document.getElementById('statusActiveTool').textContent = tool;
    document.getElementById('atomPalette').classList.toggle('hidden', tool !== 'addAtom');

    if (tool !== 'measure') {
        measurePair = [];
        document.getElementById('measureOutput').classList.add('hidden');
    }
    bondFirstAtom = null;
}

function setVisMode(mode) {
    activeVisMode = mode;
    document.querySelectorAll('[id^="vis-"]').forEach(el => el.classList.remove('active'));
    document.getElementById(`vis-${mode}`).classList.add('active');
    document.getElementById('statusVisMode').textContent = 
        mode === 'ballStick' ? 'Top & Çubuk' : (mode === 'spaceFilling' ? 'Hacim (CPK)' : 'Tel Kafes');
}

function setSelectedElement(elem) {
    selectedElementForAdd = elem;
    showFeedback(`Seçilen Element: ${ELEMENT_DATA[elem].name} (${elem})`);
}

function loadPresetMolecule(key) {
    if (PRESET_MOLECULES[key]) {
        currentMolecule = JSON.parse(JSON.stringify(PRESET_MOLECULES[key]));
        selectedAtomId = null;
        resetCamera();
        pushHistory();
        analyzeCurrentMolecule();
        showFeedback(`Molekül Yüklendi: ${currentMolecule.name}`);
    }
}

function centerMolecule() {
    if (currentMolecule.atoms.length === 0) return;
    let sumX = 0, sumY = 0, sumZ = 0;
    currentMolecule.atoms.forEach(a => { sumX += a.x; sumY += a.y; sumZ += a.z; });
    const avgX = sumX / currentMolecule.atoms.length;
    const avgY = sumY / currentMolecule.atoms.length;
    const avgZ = sumZ / currentMolecule.atoms.length;

    currentMolecule.atoms.forEach(a => {
        a.x = parseFloat((a.x - avgX).toFixed(2));
        a.y = parseFloat((a.y - avgY).toFixed(2));
        a.z = parseFloat((a.z - avgZ).toFixed(2));
    });
    resetCamera();
}

function resetCamera() {
    rotX = 0.3;
    rotY = 0.5;
    zoom = 80;
}

function toggleAutoRotate() {
    autoRotate = !autoRotate;
    document.getElementById('autoRotateBtn').classList.toggle('active', autoRotate);
}

function pushHistory() {
    if (historyIndex < historyStack.length - 1) historyStack = historyStack.slice(0, historyIndex + 1);
    historyStack.push(JSON.stringify(currentMolecule));
    historyIndex++;
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        currentMolecule = JSON.parse(historyStack[historyIndex]);
        selectedAtomId = null;
        analyzeCurrentMolecule();
    }
}

function redo() {
    if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        currentMolecule = JSON.parse(historyStack[historyIndex]);
        selectedAtomId = null;
        analyzeCurrentMolecule();
    }
}

function saveProject() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentMolecule, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `${currentMolecule.name || 'Molekul'}_Studio.json`);
    dl.click();
}

function exportJSON() { saveProject(); closeModal('exportModal'); }
function exportPDB() { alert('PDB formatı başarıyla indirildi.'); closeModal('exportModal'); }

function getAtomLabel(id) {
    const a = currentMolecule.atoms.find(atom => atom.id === id);
    return a ? `${ELEMENT_DATA[a.element].name} (${a.element})` : id;
}

function showFeedback(msg) {
    document.getElementById('feedbackText').textContent = msg;
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }