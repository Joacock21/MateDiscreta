
function openRightPanel() {
    document.getElementById('rightPanel').classList.add('active');
}

function closeRightPanel() {
    document.getElementById('rightPanel').classList.remove('active');
}


function openFooterModal(type) {
    document.getElementById(`modal-${type}`).style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (type === 'profesora') loadProfesor();
    if (type === 'info-general') loadInfoGeneral();
    if (type === 'estudiantes') loadStudents();
}

function closeFooterModal(type) {
    document.getElementById(`modal-${type}`).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeEstudianteDetalle() {
    document.getElementById('modal-estudiante-detalle').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openEstudianteDetalle(index) {
    const estudiante = window.estudiantesDatos[index];
    document.getElementById('estudianteFotoDetalle').src = estudiante.foto;
    document.getElementById('estudianteNombreDetalle').textContent = estudiante.nombre;
    document.getElementById('estudianteCarreraDetalle').textContent = estudiante.carrera;
    document.getElementById('estudianteCodigoDetalle').textContent = estudiante.codigo;
    document.getElementById('estudianteSeccionDetalle').textContent = estudiante.seccion;
    document.getElementById('estudianteEdadDetalle').textContent = estudiante.edad + ' años';
    document.getElementById('estudianteEmailDetalle').textContent = estudiante.email;
    document.getElementById('modal-estudiante-detalle').style.display = 'block';
    document.body.style.overflow = 'hidden';
}


window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};


document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
        closeRightPanel();
    }
});


function showSection(sectionName) {
    const mainContent = document.getElementById('mainContent');
    const sectionTitle = document.getElementById('sectionTitle');

    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (sectionName === 'variables') {
        sectionTitle.textContent = `📊 Variables (${window.variables.length})`;

        let html = `
        <div style="margin-bottom: 2rem; display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <button onclick="descargarJSON()" class="add-btn" style="background: linear-gradient(135deg, #059669, #10b981); font-size: 0.9rem; padding: 0.8rem 1.2rem;">⬇️ Exportar JSON</button>
            <input type="file" id="inputJsonFile" accept=".json" style="display: none;" onchange="cargarJSON(this)>">
            <button onclick="document.getElementById('inputJsonFile').click()" class="add-btn" style="background: linear-gradient(135deg, #2563eb, #3b82f6); font-size: 0.9rem; padding: 0.8rem 1.2rem;">⬆️ Importar JSON</button>
            <div style="width: 1px; height: 30px; background: var(--border-color); margin: 0 0.5rem;"></div>
            <button onclick="abrirEditorJSON()" class="add-btn" style="background: linear-gradient(135deg, #7c3aed, #8b5cf6); font-size: 0.9rem; padding: 0.8rem 1.2rem;">📝 Editor en Vivo</button>
        </div>
        <div class="variables-grid">`;

        window.variables.forEach(variable => {
            html += `<div class="variable-card variable-item" onclick="openVariablePanel(${variable.id})">
                <h3>${variable.name}</h3>
                <p>${variable.datos.length} datos guardados</p>
            </div>`;
        });

        html += '</div>';
        mainContent.innerHTML = html;
    }

    else if (sectionName === 'plano') {
        sectionTitle.textContent = '📈 Plano Cartesiano';
        mainContent.innerHTML = `
        <div class='plano-container'>
            <div style="position: relative;">
                <canvas id='planoCanvas' width='750' height='650'></canvas>
                <div id="tooltip" style="position: absolute; display: none; background: rgba(15, 23, 42, 0.95); border: 2px solid #10b981; border-radius: 8px; padding: 0.8rem 1rem; pointer-events: none; z-index: 100; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <div style="color: #10b981; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.3rem;" id="tooltipTitle"></div>
                    <div style="color: #e2e8f0; font-size: 0.9rem; font-family: 'Fira Code', monospace;" id="tooltipContent"></div>
                </div>
            </div>
            <div class='plano-controls'>
                <h3>Seleccionar Variables</h3>
                <div class='variable-selector'>
                    <div class='variable-select-card'>
                        <h4>Eje X (Variable Independiente) ℹ️</h4>
                        <select id='varX' onchange='updatePlano()'>
                            <option value=''>Seleccionar...</option>
                            ${window.variables.map(v => `<option value="${v.id}">${v.name}</option>`).join('')}
                        </select>
                        <p style='margin-top: 0.8rem; color: var(--gray-text); font-size: 0.85rem;'>📌 La variable que <strong>controlas</strong></p>
                        <p style='margin-top: 0.5rem; color: var(--gray-text);'>Datos: <span id='datosX'>-</span></p>
                    </div>
                    <div class='variable-select-card'>
                        <h4>Eje Y (Variable Dependiente) ℹ️</h4>
                        <select id='varY' onchange='updatePlano()'>
                            <option value=''>Seleccionar...</option>
                            ${window.variables.map(v => `<option value="${v.id}">${v.name}</option>`).join('')}
                        </select>
                        <p style='margin-top: 0.8rem; color: var(--gray-text); font-size: 0.85rem;'>📌 La variable que <strong>observas</strong></p>
                        <p style='margin-top: 0.5rem; color: var(--gray-text);'>Datos: <span id='datosY'>-</span></p>
                    </div>
                </div>

                <div style='display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; align-items: center;'>
                    <button class='add-btn' onclick='toggleRegresion()' id='btnToggleRegresion'>📈 Mostrar Regresión</button>
                    <label style='display: flex; align-items: center; gap: 0.5rem; background: rgba(30, 41, 59, 0.6); padding: 0.8rem 1.2rem; border-radius: 10px; border: 2px solid var(--border-color); cursor: pointer; transition: all 0.3s ease;' onmouseover='this.style.borderColor="var(--primary-color)"' onmouseout='this.style.borderColor="var(--border-color)"'>
                        <input type='checkbox' id='forzarOrigen' onchange='updatePlano()' style='width: 18px; height: 18px; cursor: pointer;'>
                        <span style='color: var(--light-text); font-size: 0.9rem; font-weight: 500;'>🎯 Forzar línea por origen (0,0)</span>
                    </label>
                    <button class='add-btn' onclick='agregarModeloMatematico()'>➕ Agregar Modelo</button>
                    <button class='add-btn' onclick='exportarExcel()' style='background: linear-gradient(135deg, #059669, #10b981);'>📊 Exportar Excel</button>
                    <button class='clear-btn' onclick='clearPlano()'>🗑️ Limpiar</button>
                </div>

                <div id='planoStatsPanel' class='plano-stats-panel' style='display: none;'>
                    <h3>📊 Estadísticas de Regresión Lineal</h3>
                    <div class='stats-grid'>
                        <div class='stat-box'><span class='stat-label'>Pendiente (m)</span><span class='stat-value' id='pendienteR'>-</span></div>
                        <div class='stat-box'><span class='stat-label'>Intersección (b)</span><span class='stat-value' id='interseccionR'>-</span></div>
                        <div class='stat-box'><span class='stat-label'>Correlación (R)</span><span class='stat-value' id='correlacionR'>-</span></div>
                        <div class='stat-box'><span class='stat-label'>Coef. Determinación (R²)</span><span class='stat-value' id='coefDet'>-</span></div>
                        <div class='stat-box'><span class='stat-label'>Error Estándar</span><span class='stat-value' id='errorEstandar'>-</span></div>
                        <div class='stat-box ecuacion' style='grid-column: 1 / -1;'><span class='stat-label'>Ecuación de la Recta</span><span class='stat-value' id='ecuacionRegresion'>-</span></div>
                    </div>
                </div>
            </div>
        </div>`;
        setTimeout(() => { initPlanoInteractivo(); }, 100);
    }

    else if (sectionName === 'modelos') {
        sectionTitle.textContent = '🧮 Modelos Matemáticos';
        displayModelosMatematicos();
    }

    else if (sectionName === 'datos') {
        sectionTitle.textContent = '🗂️ Datos';
        let html = '<div class="variables-grid">';
        window.variables.forEach(variable => {
            html += `<div class="variable-card variable-item" onclick="openVariablePanel(${variable.id})">
                <h3>${variable.name}</h3>
                <p>${variable.datos.length} datos guardados</p>
            </div>`;
        });
        html += '</div>';
        mainContent.innerHTML = html;
    }

    else if (sectionName === 'bibliografia') {
        sectionTitle.textContent = '📚 Bibliografía';
        displayBibliografia();
    }
}


function openVariablePanel(varId) {
    const variable = getVariable(varId);
    const panel = document.getElementById('rightPanelContent');

    let html = `<div style='margin-bottom: 2rem;'>
        <label style='color: var(--gray-text); font-size: 0.9rem; display: block; margin-bottom: 0.5rem;'>✏️ Nombre</label>
        <input type='text' value='${variable.name}' onblur='updateVariableName(${varId}, this.value)' onkeypress='if(event.key==="Enter") {updateVariableName(${varId}, this.value); this.blur();}' style='background: rgba(30, 41, 59, 0.7); border: 2px solid var(--border-color); color: var(--accent-color); font-size: 1.4rem; width: 100%; padding: 0.8rem 1rem; border-radius: 10px; font-weight: 600;' placeholder='Nombre...'>
        <p style='color: var(--gray-text); font-size: 0.8rem; margin-top: 0.5rem;'>💡 Enter para guardar</p>
    </div>`;

    html += `<div class='form-section'>
        <h3 style='color: var(--accent-color);'>➕ Agregar Dato</h3>
        <input type='number' step='any' id='newDatoValue' placeholder='Valor numérico' onkeypress='if(event.key==="Enter") addDato(${varId})'>
        <button class='add-btn' onclick='addDato(${varId})'>+ Agregar</button>
    </div>`;

    html += `<div class='datos-list'><h3>Datos (${variable.datos.length})</h3>`;
    if (variable.datos.length === 0) {
        html += `<p style='text-align: center; color: var(--gray-text); padding: 2rem;'>📊 Sin datos</p>`;
    } else {
        variable.datos.forEach((dato, index) => {
            html += `<div class='dato-item'>
                <span>Dato ${index + 1}:</span>
                <span class='dato-number'>${dato}</span>
                <button class='delete-btn' onclick='deleteDato(${varId},${index})'>Eliminar</button>
            </div>`;
        });
    }
    html += '</div>';

    panel.innerHTML = html;
    openRightPanel();
    setTimeout(() => { document.getElementById('newDatoValue')?.focus(); }, 100);
}

function addDato(varId) {
    const valor = document.getElementById('newDatoValue').value;
    if (!valor || valor.trim() === '') return alert('⚠️ Ingresa un valor');
    addDatoToVariable(varId, valor);
    openVariablePanel(varId);
}

function deleteDato(varId, i) {
    if (confirm('¿Eliminar?')) {
        deleteDatoFromVariable(varId, i);
        openVariablePanel(varId);
    }
}


window.zoom = 1;
window.offsetX = 0;
window.offsetY = 0;
window.isDragging = false;
window.lastMouseX = 0;
window.lastMouseY = 0;
window.hoveredPoint = null;

function updatePlano() {
    const xId = parseInt(document.getElementById('varX').value);
    const yId = parseInt(document.getElementById('varY').value);
    if (xId) {
        const vx = getVariable(xId);
        document.getElementById('datosX').textContent = vx.datos.length > 0 ? vx.datos.join(', ') : 'Sin datos';
    }
    if (yId) {
        const vy = getVariable(yId);
        document.getElementById('datosY').textContent = vy.datos.length > 0 ? vy.datos.join(', ') : 'Sin datos';
    }
    drawPlano();
}

function clearPlano() {
    document.getElementById('varX').value = '';
    document.getElementById('varY').value = '';
    document.getElementById('datosX').textContent = '-';
    document.getElementById('datosY').textContent = '-';
    document.getElementById('planoStatsPanel').style.display = 'none';
    if (document.getElementById('forzarOrigen')) document.getElementById('forzarOrigen').checked = false;
    mostrarRegresion = false;
    window.offsetX = 0;
    window.offsetY = 0;
    window.zoom = 1;
    document.getElementById('btnToggleRegresion').textContent = '📈 Mostrar Regresión';
    drawPlano();
}

function initPlanoInteractivo() {
    const canvas = document.getElementById('planoCanvas');
    if (!canvas) return;

    canvas.addEventListener('wheel', handleZoom);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    drawPlano();
}

function handleZoom(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    window.zoom = Math.max(0.5, Math.min(window.zoom * delta, 3));
    drawPlano();
}

function handleMouseDown(e) {
    window.isDragging = true;
    window.lastMouseX = e.offsetX;
    window.lastMouseY = e.offsetY;
    e.target.style.cursor = 'grabbing';
}

function handleMouseMove(e) {
    const canvas = document.getElementById('planoCanvas');
    const tooltip = document.getElementById('tooltip');

    if (window.isDragging) {
        const dx = e.offsetX - window.lastMouseX;
        const dy = e.offsetY - window.lastMouseY;
        window.offsetX += dx;
        window.offsetY += dy;
        window.lastMouseX = e.offsetX;
        window.lastMouseY = e.offsetY;
        drawPlano();
    } else {
        const xId = parseInt(document.getElementById('varX')?.value);
        const yId = parseInt(document.getElementById('varY')?.value);

        if (!xId || !yId) return;

        const varX = getVariable(xId);
        const varY = getVariable(yId);
        const xData = varX.datos;
        const yData = varY.datos;
        const n = Math.min(xData.length, yData.length);

        if (n === 0) return;

        let xMin = Math.min(...xData, 0);
        let xMax = Math.max(...xData);
        let yMin = Math.min(...yData, 0);
        let yMax = Math.max(...yData);

        const xRange = xMax - xMin;
        const yRange = yMax - yMin;
        const xPad = xRange * 0.15 || 1;
        const yPad = yRange * 0.15 || 1;

        const xmin = xMin - xPad * 0.3;
        const xmax = xMax + xPad;
        const ymin = yMin - yPad * 0.3;
        const ymax = yMax + yPad;

        const left = 80;
        const right = canvas.width - 50;
        const top = 50;
        const bottom = canvas.height - 80;
        const W_BASE = right - left;
        const H_BASE = bottom - top;

        const toPixelX = (x) => left + ((x - xmin) / (xmax - xmin)) * W_BASE + window.offsetX;
        const toPixelY = (y) => bottom - ((y - ymin) / (ymax - ymin)) * H_BASE + window.offsetY;

        let foundPoint = false;
        window.hoveredPoint = null;

        for (let i = 0; i < n; i++) {
            const px = toPixelX(xData[i]);
            const py = toPixelY(yData[i]);
            const dist = Math.sqrt((e.offsetX - px) ** 2 + (e.offsetY - py) ** 2);

            if (dist < 15) {
                foundPoint = true;
                window.hoveredPoint = i;

                tooltip.style.display = 'block';
                tooltip.style.left = (e.pageX + 15) + 'px';
                tooltip.style.top = (e.pageY - 50) + 'px';

                document.getElementById('tooltipTitle').textContent = `Punto ${i + 1}`;
                document.getElementById('tooltipContent').innerHTML = `
                    <strong>${varX.name}:</strong> ${xData[i].toFixed(2)}<br>
                    <strong>${varY.name}:</strong> ${yData[i].toFixed(2)}
                `;

                canvas.style.cursor = 'pointer';
                drawPlano();
                break;
            }
        }

        if (!foundPoint) {
            tooltip.style.display = 'none';
            canvas.style.cursor = 'default';
            if (window.hoveredPoint !== null) {
                window.hoveredPoint = null;
                drawPlano();
            }
        }
    }
}

function handleMouseUp(e) {
    window.isDragging = false;
    e.target.style.cursor = 'default';
}

function handleMouseLeave(e) {
    window.isDragging = false;
    document.getElementById('tooltip').style.display = 'none';
    window.hoveredPoint = null;
    e.target.style.cursor = 'default';
    drawPlano();
}

function drawPlano() {
    const c = document.getElementById('planoCanvas');
    if (!c) return;

    const ctx = c.getContext('2d');
    const W_CANVAS = c.width;
    const H_CANVAS = c.height;

    ctx.clearRect(0, 0, W_CANVAS, H_CANVAS);
    ctx.fillStyle = 'rgba(15,23,42,0.98)';
    ctx.fillRect(0, 0, W_CANVAS, H_CANVAS);

    const xId = parseInt(document.getElementById('varX')?.value);
    const yId = parseInt(document.getElementById('varY')?.value);

    if (!xId || !yId) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Selecciona las variables X e Y para graficar', W_CANVAS / 2, H_CANVAS / 2);
        return;
    }

    const varX = getVariable(xId);
    const varY = getVariable(yId);
    const xData = varX.datos;
    const yData = varY.datos;
    const n = Math.min(xData.length, yData.length);

    if (n === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Las variables no tienen datos para graficar', W_CANVAS / 2, H_CANVAS / 2);
        return;
    }

    let xMin = Math.min(...xData, 0);
    let xMax = Math.max(...xData);
    let yMin = Math.min(...yData, 0);
    let yMax = Math.max(...yData);

    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xPad = xRange * 0.15 || 1;
    const yPad = yRange * 0.15 || 1;

    const xmin = xMin - xPad * 0.3;
    const xmax = xMax + xPad;
    const ymin = yMin - yPad * 0.3;
    const ymax = yMax + yPad;

    const left = 80;
    const right = W_CANVAS - 50;
    const top = 50;
    const bottom = H_CANVAS - 80;

    const W_BASE = right - left;
    const H_BASE = bottom - top;

    const toPixelX = (x) => left + ((x - xmin) / (xmax - xmin)) * W_BASE + window.offsetX;
    const toPixelY = (y) => bottom - ((y - ymin) / (ymax - ymin)) * H_BASE + window.offsetY;

    
    ctx.strokeStyle = 'rgba(99,102,241,0.12)';
    ctx.lineWidth = 1;

    const calcularPaso = (range) => {
        const magnitud = Math.pow(10, Math.floor(Math.log10(range)));
        return magnitud * Math.ceil(range / (magnitud * 8)) || 1;
    };

    const xstep = calcularPaso(xmax - xmin);
    const ystep = calcularPaso(ymax - ymin);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';

    const xStart = Math.ceil(xmin / xstep) * xstep;
    for (let x = xStart; x <= xmax; x += xstep) {
        const xp = toPixelX(x);
        if (xp < left || xp > right) continue;

        ctx.strokeStyle = x === 0 ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.12)';
        ctx.beginPath();
        ctx.moveTo(xp, top);
        ctx.lineTo(xp, bottom);
        ctx.stroke();

        ctx.fillStyle = x === 0 ? '#10b981' : '#cbd5e1';
        ctx.fillText(x.toFixed(1), xp, bottom + 22);
    }

    ctx.textAlign = 'right';
    const yStart = Math.ceil(ymin / ystep) * ystep;
    for (let y = yStart; y <= ymax; y += ystep) {
        const yp = toPixelY(y);
        if (yp < top || yp > bottom) continue;

        ctx.strokeStyle = y === 0 ? 'rgba(99,102,241,0.3)' : 'rgba(99,102,241,0.12)';
        ctx.beginPath();
        ctx.moveTo(left, yp);
        ctx.lineTo(right, yp);
        ctx.stroke();

        ctx.fillStyle = y === 0 ? '#10b981' : '#cbd5e1';
        ctx.fillText(y.toFixed(1), left - 12, yp + 4);
    }

    
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const ejeYX = toPixelX(0);
    if (ejeYX >= left && ejeYX <= right) {
        ctx.strokeStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(ejeYX, top);
        ctx.lineTo(ejeYX, bottom);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    const ejeXY = toPixelY(0);
    if (ejeXY >= top && ejeXY <= bottom) {
        ctx.strokeStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(left, ejeXY);
        ctx.lineTo(right, ejeXY);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 0;
    ctx.fillText(varX.name + ' (Independiente)', W_CANVAS / 2, H_CANVAS - 15);

    ctx.save();
    ctx.translate(20, H_CANVAS / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(varY.name + ' (Dependiente)', 0, 0);
    ctx.restore();

    
    const forzar = document.getElementById('forzarOrigen')?.checked || false;
    const resultado = calcularRegresion(xData, yData, forzar);

    if (document.getElementById('planoStatsPanel') && mostrarRegresion) {
        document.getElementById('planoStatsPanel').style.display = 'block';
        document.getElementById('pendienteR').textContent = resultado.m.toFixed(4);
        document.getElementById('interseccionR').textContent = resultado.b.toFixed(4);
        document.getElementById('correlacionR').textContent = resultado.R.toFixed(4);
        document.getElementById('coefDet').textContent = resultado.R2.toFixed(4);
        document.getElementById('errorEstandar').textContent = resultado.errorEstandar.toFixed(4);

        if (forzar) {
            document.getElementById('ecuacionRegresion').textContent = `y = ${resultado.m.toFixed(4)}x (forzada por origen)`;
        } else {
            document.getElementById('ecuacionRegresion').textContent = `y = ${resultado.m.toFixed(4)}x + ${resultado.b.toFixed(4)}`;
        }
    }

    
    if (mostrarRegresion) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(left, top, W_BASE, H_BASE);
        ctx.clip();

        const padding = (xmax - xmin) * 0.1;
        const x1 = xmin - padding;
        const x2 = xmax + padding;
        const y1 = resultado.m * x1 + resultado.b;
        const y2 = resultado.m * x2 + resultado.b;

        const px1 = toPixelX(x1);
        const py1 = toPixelY(y1);
        const px2 = toPixelX(x2);
        const py2 = toPixelY(y2);

        ctx.strokeStyle = '#2dd4bf';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#2dd4bf';
        ctx.shadowBlur = 20;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.stroke();

        ctx.strokeStyle = '#5eead4';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.stroke();

        ctx.restore();
    }

    
    ctx.shadowBlur = 0;
    const pointSize = n > 40 ? 4 : n > 20 ? 6 : 7;

    for (let i = 0; i < n; i++) {
        const x = xData[i];
        const y = yData[i];
        const px = toPixelX(x);
        const py = toPixelY(y);

        if (px < left - 10 || px > right + 10 || py < top - 10 || py > bottom + 10) continue;

        const isHovered = window.hoveredPoint === i;
        const size = isHovered ? pointSize * 1.5 : pointSize;

        ctx.shadowColor = isHovered ? 'rgba(16, 185, 129, 0.8)' : 'rgba(37, 99, 235, 0.6)';
        ctx.shadowBlur = isHovered ? 15 : 8;

        ctx.fillStyle = isHovered ? '#10b981' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = isHovered ? '#22c55e' : '#60a5fa';
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();

        ctx.fillStyle = isHovered ? '#86efac' : '#93c5fd';
        ctx.beginPath();
        ctx.arc(px, py, size * 0.4, 0, 2 * Math.PI);
        ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(99,102,241,0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, W_BASE, H_BASE);
}

function toggleRegresion() {
    mostrarRegresion = !mostrarRegresion;
    document.getElementById('btnToggleRegresion').textContent = mostrarRegresion ? '📉 Ocultar' : '📈 Mostrar';
    drawPlano();
}

function agregarModeloMatematico() {
    const xId = parseInt(document.getElementById('varX')?.value);
    const yId = parseInt(document.getElementById('varY')?.value);
    if (!xId || !yId) return alert('⚠️ Selecciona variables');

    const varX = getVariable(xId);
    const varY = getVariable(yId);
    if (varX.datos.length === 0) return alert('⚠️ Variables vacías');

    const forzar = document.getElementById('forzarOrigen')?.checked || false;
    const resultado = calcularRegresion(varX.datos, varY.datos, forzar);

    const ecuacionTexto = forzar
        ? `y = ${resultado.m.toFixed(4)}x (origen forzado)`
        : `y = ${resultado.m.toFixed(4)}x + ${resultado.b.toFixed(4)}`;

    const modelo = {
        id: Date.now(),
        nombreX: varX.name,
        nombreY: varY.name,
        imagen: document.getElementById('planoCanvas').toDataURL('image/png'),
        pendiente: resultado.m,
        interseccion: resultado.b,
        correlacion: resultado.R,
        coefDeterminacion: resultado.R2,
        errorEstandar: resultado.errorEstandar,
        ecuacion: ecuacionTexto,
        fecha: new Date().toLocaleDateString('es-ES'),
        forzadoPorOrigen: forzar
    };

    guardarModeloMatematico(modelo);
    showNotification('✅ Modelo guardado correctamente');
}

function exportarExcel() {
    const xId = parseInt(document.getElementById('varX')?.value);
    const yId = parseInt(document.getElementById('varY')?.value);

    if (!xId || !yId) return alert('⚠️ Selecciona las variables X e Y primero');

    const varX = getVariable(xId);
    const varY = getVariable(yId);

    if (varX.datos.length === 0) return alert('⚠️ No hay datos para exportar');

    const forzar = document.getElementById('forzarOrigen')?.checked || false;
    const resultado = calcularRegresion(varX.datos, varY.datos, forzar);

    let csv = 'ANÁLISIS DE REGRESIÓN LINEAL\n\n';
    csv += `Variable Independiente (X):,${varX.name}\n`;
    csv += `Variable Dependiente (Y):,${varY.name}\n`;
    csv += `Fecha:,${new Date().toLocaleDateString('es-ES')}\n`;
    csv += `Tipo de regresión:,${forzar ? 'Forzada por el origen (0,0)' : 'Regresión lineal estándar'}\n\n`;

    csv += 'DATOS\n';
    csv += `${varX.name},${varY.name}\n`;

    const n = Math.min(varX.datos.length, varY.datos.length);
    for (let i = 0; i < n; i++) {
        csv += `${varX.datos[i]},${varY.datos[i]}\n`;
    }

    csv += '\nESTADÍSTICAS DE REGRESIÓN\n';
    if (forzar) {
        csv += `Ecuación de la Recta:,y = ${resultado.m.toFixed(4)}x (forzada por origen)\n`;
    } else {
        csv += `Ecuación de la Recta:,y = ${resultado.m.toFixed(4)}x + ${resultado.b.toFixed(4)}\n`;
    }
    csv += `Pendiente (m):,${resultado.m.toFixed(6)}\n`;
    csv += `Intersección (b):,${resultado.b.toFixed(6)}\n`;
    csv += `Correlación (R):,${resultado.R.toFixed(6)}\n`;
    csv += `Coef. Determinación (R²):,${resultado.R2.toFixed(6)}\n`;
    csv += `Error Estándar:,${resultado.errorEstandar.toFixed(6)}\n`;
    csv += `Número de puntos:,${n}\n`;

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `regresion_${varX.name}_vs_${varY.name}_${Date.now()}.csv`;
    link.click();

    showNotification('✅ Excel exportado correctamente');
}


function abrirEditorJSON() {
    const textarea = document.getElementById('jsonEditorArea');
    if (!textarea) return;
    textarea.value = JSON.stringify(window.variables, null, 2);
    document.getElementById('modal-json-editor').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function guardarCambiosJSON() {
    const textarea = document.getElementById('jsonEditorArea');
    if (!textarea) return;
    try {
        const nuevosDatos = JSON.parse(textarea.value);
        if (Array.isArray(nuevosDatos)) {
            window.variables = nuevosDatos;
            saveVariables();
            loadProfesor();
            const activeBtn = document.querySelector('.sidebar-btn.active');
            if (activeBtn && activeBtn.getAttribute('data-section') === 'variables') showSection('variables');
            showNotification('✅ JSON actualizado');
            document.getElementById('modal-json-editor').style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            alert('⚠️ Formato incorrecto (debe ser array).');
        }
    } catch (e) {
        alert('❌ Error de Sintaxis JSON: ' + e.message);
    }
}

function formatearJSON() {
    const textarea = document.getElementById('jsonEditorArea');
    if (!textarea) return;
    try {
        const obj = JSON.parse(textarea.value);
        textarea.value = JSON.stringify(obj, null, 4);
    } catch (e) {
        alert('⚠️ Error de sintaxis.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.addEventListener('click', () => showSection(btn.getAttribute('data-section')));
    });
});
