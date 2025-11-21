window.profesorDatos = {
    nombre: 'Ing. Beteta Salas, Marisel Rocio ',
    correo: 'marisel.beteta@epg.usil.pe',
    seccion: 'C2A503',
    bloque: ' FC-SMVEMP01B01N',
    horario: 'Vie 07:00-10:40',
    foto: ''
};

window.estudiantesDatos = [
    { nombre: 'Arias Rodriguez, Victor Joaquin', codigo: '2512854', seccion: 'C2A503', carrera: 'Ingeniería de Sistemas e Información', edad: 18, email: 'Victor.ariasr@usil.pe', foto: 'dad' },
    { nombre: 'Chavez Villaviciencio, Fabian Augusto ', codigo: '2510158', seccion: 'C2A503', carrera: 'Ingeniería de Sistemas e Información', edad: 18, email: 'fabian.chavezv@usil.pe', foto: 'dad' },
    { nombre: 'Costa Saravia, Javier Enrique', codigo: '2510668', seccion: 'C2A503', carrera: 'Ingeniería de Sistemas e Información', edad: 18, email: 'javier.costa@usil.pe', foto: 'dad' },
    { nombre: 'Rojas Colan, Daphne Saori', codigo: '2512572', seccion: 'C2A503', carrera: 'Ingeniería de Software', edad: 18, email: 'daphne.rojas@usil.pe', foto: 'dad' }
];

window.infoGeneralData = {
    curso: 'Matemática Discreta - C2A503',
    objetivo: 'Aplicar conceptos de estadística descriptiva y análisis de regresión lineal para modelar relaciones entre variables cuantitativas.',
    periodo: '2025-2 (Agosto - Diciembre 2025)',
    descripcion: 'Este proyecto tiene como finalidad recolectar y analizar datos estadísticos de 8 variables diferentes, aplicando métodos de regresión lineal para encontrar correlaciones y patrones. Se utilizarán herramientas visuales como el plano cartesiano para representar las relaciones entre variables y calcular estadísticas fundamentales como el coeficiente de determinación, correlación y error estándar.'
};

window.bibliografiaData = [
    { titulo: 'Probabilidad y Estadística para Ingeniería y Ciencias', autores: 'Devore, J. L.', año: 2016, editorial: 'Cengage Learning', edicion: '9na Edición' },
    { titulo: 'Estadística Matemática con Aplicaciones', autores: 'Wackerly, D., Mendenhall, W., & Scheaffer, R.', año: 2010, editorial: 'Cengage Learning', edicion: '7ma Edición' },
    { titulo: 'Matemáticas Discretas y sus Aplicaciones', autores: 'Rosen, K. H.', año: 2012, editorial: 'McGraw-Hill', edicion: '7ma Edición' },
    { titulo: 'Introduction to the Practice of Statistics', autores: 'Moore, D. S., McCabe, G. P., & Craig, B. A.', año: 2017, editorial: 'W. H. Freeman', edicion: '9na Edición' },
];

window.variables = [];

function initializeVariables() {
    const stored = localStorage.getItem('variables');
    if (stored) {
        window.variables = JSON.parse(stored);
    } else {
        // 🎯 VARIABLES CON DATOS DE EJEMPLO REALISTAS
        window.variables = [
            {
                id: 1,
                name: '📚 Horas de estudio semanal',
                datos: [5, 8, 12, 15, 10, 7, 20, 18, 6, 14, 9, 11, 16, 13, 8, 17, 12, 10, 15, 11]
            },
            {
                id: 2,
                name: '📊 Nota promedio (0-20)',
                datos: [11, 13, 15, 17, 14, 12, 19, 18, 11, 16, 13, 14, 17, 15, 12, 18, 15, 13, 16, 14]
            },
            {
                id: 3,
                name: '🏃 Horas de ejercicio semanal',
                datos: [2, 4, 6, 8, 5, 3, 7, 6, 2, 5, 4, 3, 6, 5, 4, 7, 5, 4, 6, 4]
            },
            {
                id: 4,
                name: '⚖️ Peso corporal (kg)',
                datos: [78, 72, 68, 65, 70, 75, 66, 67, 79, 71, 73, 76, 69, 70, 74, 67, 71, 73, 68, 72]
            },
            {
                id: 5,
                name: '📱 Horas en redes sociales (diarias)',
                datos: [5, 6, 3, 2, 4, 7, 2, 3, 6, 4, 5, 6, 3, 4, 5, 2, 4, 5, 3, 5]
            },
            {
                id: 6,
                name: '😴 Horas de sueño (diarias)',
                datos: [6, 5.5, 7, 8, 6.5, 5, 8, 7.5, 5.5, 7, 6.5, 6, 7.5, 7, 6.5, 8, 7, 6.5, 7.5, 6.5]
            },
            {
                id: 7,
                name: '🚌 Días usando transporte público (mensual)',
                datos: [20, 18, 15, 12, 22, 19, 10, 14, 23, 17, 20, 21, 16, 18, 19, 13, 17, 20, 15, 18]
            },
            {
                id: 8,
                name: '💰 Gasto en transporte S/ (mensual)',
                datos: [120, 110, 90, 75, 130, 115, 65, 85, 140, 100, 120, 125, 95, 110, 115, 80, 100, 120, 90, 110]
            }
        ];
        saveVariables();
    }
}

function saveVariables() { localStorage.setItem('variables', JSON.stringify(window.variables)); }
function getVariable(id) { return window.variables.find(v => v.id === id); }

function updateVariableName(id, name) { 
    const v = getVariable(id); 
    if(v){
        v.name = name.trim() || `Variable ${id}`; 
        saveVariables();
        const currentSection = document.querySelector('.sidebar-btn.active')?.getAttribute('data-section');
        if(currentSection === 'variables' || currentSection === 'datos') showSection(currentSection);
    } 
}

function addDatoToVariable(varId, valor) { 
    const v = getVariable(varId); 
    if(v){ v.datos.push(Number(valor)); saveVariables(); } 
}

function deleteDatoFromVariable(varId, idx) { 
    const v = getVariable(varId); 
    if(v){ v.datos.splice(idx, 1); saveVariables(); } 
}

function loadInfoGeneral() { 
    const elementos = { curso: document.getElementById('infoCurso'), objetivo: document.getElementById('infoObjetivo'), periodo: document.getElementById('infoPeriodo'), descripcion: document.getElementById('infoDescripcion') };
    if(elementos.curso) elementos.curso.textContent = window.infoGeneralData.curso;
    if(elementos.objetivo) elementos.objetivo.textContent = window.infoGeneralData.objetivo;
    if(elementos.periodo) elementos.periodo.textContent = window.infoGeneralData.periodo;
    if(elementos.descripcion) elementos.descripcion.textContent = window.infoGeneralData.descripcion;
}

function loadProfesor() {
    const els = { nombre: document.getElementById('profesorNameView'), email: document.getElementById('profesorEmailView'), seccion: document.getElementById('profesorSeccionView'), bloque: document.getElementById('profesorBloqueView'), horario: document.getElementById('profesorHorarioView'), foto: document.getElementById('profesorFotoView') };
    if(els.nombre) els.nombre.textContent = window.profesorDatos.nombre;
    if(els.email) els.email.textContent = window.profesorDatos.correo;
    if(els.seccion) els.seccion.textContent = window.profesorDatos.seccion;
    if(els.bloque) els.bloque.textContent = window.profesorDatos.bloque;
    if(els.horario) els.horario.textContent = window.profesorDatos.horario;
    if(els.foto) els.foto.src = window.profesorDatos.foto;
}

function loadStudents() {
    let div = document.getElementById('studentList'); 
    if(!div) return;
    div.innerHTML = '';
    window.estudiantesDatos.forEach((st, index) => {
        div.innerHTML += `<div class="student-mini-card" onclick="openEstudianteDetalle(${index})"><h3>${st.nombre}</h3><p><strong>Código:</strong> ${st.codigo}</p><p><strong>Sección:</strong> ${st.seccion}</p><p><strong>Carrera:</strong> ${st.carrera}</p><p style="margin-top: 0.8rem; font-size: 0.85rem; color: var(--primary-color);">👆 Clic para ver más detalles</p></div>`;
    });
}

function displayBibliografia() {
    const mainContent = document.getElementById('mainContent');
    let html = '<div class="biblio-display"><h3>📚 Referencias Bibliográficas</h3>';
    window.bibliografiaData.forEach((ref, index) => {
        html += `<div class="biblio-item"><h4>${index + 1}. ${ref.titulo}</h4><p><strong>Autor(es):</strong> ${ref.autores}</p><p><strong>Año:</strong> ${ref.año}</p><p><strong>Editorial:</strong> ${ref.editorial}</p><p><strong>Edición:</strong> ${ref.edicion}</p></div>`;
    });
    html += '</div>';
    mainContent.innerHTML = html;
}

function calcularRegresion(xData, yData, forzarOrigen = false) {
    const n = xData.length;
    if (n < 2) return { m: 0, b: 0, R: 0, R2: 0, errorEstandar: 0 };
    
    if (forzarOrigen) {
        // REGRESIÓN FORZADA POR EL ORIGEN: y = mx
        const sumXY = xData.reduce((a, b, i) => a + b * yData[i], 0);
        const sumXX = xData.reduce((a, b) => a + b * b, 0);
        const m = sumXX !== 0 ? sumXY / sumXX : 0;
        const b = 0; // Forzado a cero
        
        // Calcular R y R² para regresión por origen
        let sumErrores = 0;
        let sumTotal = 0;
        for(let i = 0; i < n; i++){
            const yPred = m * xData[i];
            sumErrores += (yData[i] - yPred) ** 2;
            sumTotal += yData[i] ** 2;
        }
        
        const R2 = 1 - (sumErrores / sumTotal);
        const R = Math.sqrt(Math.abs(R2)) * (R2 >= 0 ? 1 : -1);
        const errorEstandar = n > 1 ? Math.sqrt(sumErrores / (n - 1)) : 0;
        
        return {m, b, R, R2, errorEstandar};
    }
    
    // REGRESIÓN NORMAL
    const sumX = xData.reduce((a, b) => a + b, 0);
    const sumY = yData.reduce((a, b) => a + b, 0);
    const sumXX = xData.reduce((a, b) => a + b * b, 0);
    const sumXY = xData.reduce((a, b, i) => a + b * yData[i], 0);
    
    const meanX = sumX / n;
    const meanY = sumY / n;
    const denominador = (n * sumXX - sumX * sumX);
    const m = denominador !== 0 ? (n * sumXY - sumX * sumY) / denominador : 0;
    const b = meanY - m * meanX;
    
    let sxy = 0, sxx = 0, syy = 0;
    for(let i = 0; i < n; i++){
        sxy += (xData[i] - meanX) * (yData[i] - meanY);
        sxx += (xData[i] - meanX) ** 2;
        syy += (yData[i] - meanY) ** 2;
    }
    const denominadorR = Math.sqrt(sxx * syy);
    const R = denominadorR !== 0 ? sxy / denominadorR : 0;
    const R2 = R ** 2;
    
    let sumErrores = 0;
    for(let i = 0; i < n; i++){
        const yPred = m * xData[i] + b;
        sumErrores += (yData[i] - yPred) ** 2;
    }
    const errorEstandar = n > 2 ? Math.sqrt(sumErrores / (n - 2)) : 0;
    return {m, b, R, R2, errorEstandar};
}

let mostrarRegresion = false;

function guardarModeloMatematico(modelo) {
    let modelos = JSON.parse(localStorage.getItem('modelosMatematicos')) || [];
    modelos.push(modelo);
    localStorage.setItem('modelosMatematicos', JSON.stringify(modelos));
}

function loadModelosMatematicos() { return JSON.parse(localStorage.getItem('modelosMatematicos')) || []; }

function deleteModeloMatematico(id) {
    let modelos = loadModelosMatematicos();
    modelos = modelos.filter(m => m.id !== id);
    localStorage.setItem('modelosMatematicos', JSON.stringify(modelos));
    displayModelosMatematicos();
}

function displayModelosMatematicos() {
    const mainContent = document.getElementById('mainContent');
    const modelos = loadModelosMatematicos();
    
    if(modelos.length === 0) {
        mainContent.innerHTML = `<div style='text-align: center; padding: 4rem; background: rgba(30, 41, 59, 0.5); border-radius: 15px; border: 2px dashed var(--border-color);'><h3 style='color: var(--gray-text); margin-bottom: 1.5rem; font-size: 1.5rem;'>📊 No hay modelos matemáticos guardados</h3><p style='color: var(--gray-text); font-size: 1.1rem;'>Crea un gráfico en el Plano Cartesiano y agrégalo como modelo</p></div>`;
        return;
    }
    
    let html = '<div class="modelos-grid">';
    modelos.forEach(modelo => {
        // Lógica de interpretación
        let interpretacionR = '';
        const absR = Math.abs(modelo.correlacion);
        if(absR >= 0.9) interpretacionR = 'Correlación muy fuerte';
        else if(absR >= 0.7) interpretacionR = 'Correlación fuerte';
        else if(absR >= 0.5) interpretacionR = 'Correlación moderada';
        else if(absR >= 0.3) interpretacionR = 'Correlación débil';
        else interpretacionR = 'Correlación muy débil o nula';
        
        let interpretacionR2 = '';
        if(modelo.coefDeterminacion >= 0.8) interpretacionR2 = 'El modelo explica muy bien los datos';
        else if(modelo.coefDeterminacion >= 0.6) interpretacionR2 = 'El modelo explica bien los datos';
        else if(modelo.coefDeterminacion >= 0.4) interpretacionR2 = 'El modelo explica moderadamente los datos';
        else interpretacionR2 = 'El modelo tiene baja capacidad explicativa';
        
        let interpretacionError = '';
        if(modelo.errorEstandar < 1) interpretacionError = 'Error muy bajo - predicciones muy precisas';
        else if(modelo.errorEstandar < 5) interpretacionError = 'Error bajo - buena precisión';
        else if(modelo.errorEstandar < 10) interpretacionError = 'Error moderado';
        else interpretacionError = 'Error alto - predicciones menos confiables';

        // Retrocompatibilidad: si no tiene pendiente, calcularla
        const pendiente = modelo.pendiente || modelo.interseccion || 0;

        html += `
        <div class="modelo-card">
            <div class="modelo-header">
                <h3>${modelo.nombreX} vs ${modelo.nombreY}</h3>
                <button class="delete-btn" onclick="deleteModeloMatematico(${modelo.id})">
                    🗑️ Eliminar
                </button>
            </div>
            <img src="${modelo.imagen}" class="modelo-imagen" alt="Gráfico del modelo">
            <div class="modelo-stats">
                <div class="modelo-stat-item">
                    <span class="label">Ecuación de la Recta:</span>
                    <span class="value">${modelo.ecuacion}</span>
                </div>
                <div class="modelo-stat-item">
                    <span class="label">Pendiente (m):</span>
                    <span class="value">${pendiente.toFixed(4)}</span>
                </div>
                <div class="modelo-stat-item">
                    <span class="label">Intersección (b):</span>
                    <span class="value">${modelo.interseccion.toFixed(4)}</span>
                </div>
                <div class="modelo-stat-item">
                    <span class="label">Correlación (R):</span>
                    <span class="value">${modelo.correlacion.toFixed(4)}</span>
                </div>
                <div class="modelo-stat-item">
                    <span class="label">Coef. Determinación (R²):</span>
                    <span class="value">${modelo.coefDeterminacion.toFixed(4)}</span>
                </div>
                <div class="modelo-stat-item">
                    <span class="label">Error Estándar:</span>
                    <span class="value">${modelo.errorEstandar.toFixed(4)}</span>
                </div>
            </div>
            <div class="modelo-interpretacion">
                <h4>📊 Interpretación Estadística</h4>
                <p><strong>Correlación:</strong> ${interpretacionR} 
                    ${modelo.correlacion > 0 ? '(relación positiva - cuando X aumenta, Y también aumenta)' : '(relación negativa - cuando X aumenta, Y disminuye)'}</p>
                <p><strong>R²:</strong> ${interpretacionR2}. 
                    El ${(modelo.coefDeterminacion * 100).toFixed(1)}% de la variación en ${modelo.nombreY} 
                    es explicada por ${modelo.nombreX}.</p>
                <p><strong>Error Estándar:</strong> ${interpretacionError}. 
                    Las predicciones tienen un margen de error promedio de ±${modelo.errorEstandar.toFixed(2)} unidades.</p>
                <p><strong>Ecuación:</strong> Esta recta permite predecir valores de <em>${modelo.nombreY}</em> conociendo <em>${modelo.nombreX}</em>.</p>
            </div>
        </div>`;
    });
    html += '</div>';
    mainContent.innerHTML = html;
}

// --- FUNCIONES DE EXPORTAR E IMPORTAR ---
function descargarJSON() {
    const dataStr = JSON.stringify(window.variables, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos_estadistica_discreta.json';
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification('✅ Variables descargadas correctamente');
}

function cargarJSON(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const jsonCargado = JSON.parse(e.target.result);
            if (Array.isArray(jsonCargado)) {
                window.variables = jsonCargado;
                saveVariables();
                const currentSection = document.querySelector('.sidebar-btn.active')?.getAttribute('data-section');
                if (currentSection === 'variables') showSection('variables');
                showNotification('✅ Datos importados correctamente');
            } else { alert('⚠️ El archivo JSON no es válido.'); }
        } catch (error) { alert('❌ Error al leer el archivo JSON.'); }
    };
    reader.readAsText(file);
    inputElement.value = '';
}

// --- IMPORTAR DESDE GOOGLE SHEETS (INTELIGENTE) ---
async function importarDesdeGoogleSheets(url) {
    try {
        showNotification('⏳ Conectando con Google Sheets...');
        const response = await fetch(url);
        if (!response.ok) throw new Error('No se pudo descargar el archivo');
        const textoCSV = await response.text();
        const filas = textoCSV.split('\n').map(fila => fila.split(','));
        
        if (filas.length < 2) { alert('⚠️ Archivo vacío.'); return; }

        const encabezados = filas[0]; 
        window.variables.forEach(v => v.datos = []); // Limpiar

        let columnasEncontradas = 0;
        for (let i = 1; i < encabezados.length; i++) {
            if (columnasEncontradas >= 8) break;
            const nombrePregunta = encabezados[i] ? encabezados[i].replace(/"/g, '').trim() : `Variable ${columnasEncontradas + 1}`;
            const variableIndex = columnasEncontradas;
            window.variables[variableIndex].name = nombrePregunta;

            for (let j = 1; j < filas.length; j++) {
                if (filas[j][i]) {
                    let celda = filas[j][i].toLowerCase().replace(/"/g, '').trim();
                    let valorFinal = null;

                    // DETECCIÓN INTELIGENTE
                    if (celda.includes('min')) { // "30 min" -> 0.5
                        let numero = celda.match(/(\d+(\.\d+)?)/);
                        if (numero) valorFinal = parseFloat(numero[0]) / 60;
                    } else if (celda.includes('h')) { // "2h" -> 2
                        let numero = celda.match(/(\d+(\.\d+)?)/);
                        if (numero) valorFinal = parseFloat(numero[0]);
                    } else { // "15 km", "S/. 50" -> 15, 50
                        let numero = celda.match(/(\d+(\.\d+)?)/);
                        if (numero) valorFinal = parseFloat(numero[0]);
                    }

                    if (valorFinal !== null && !isNaN(valorFinal)) {
                        window.variables[variableIndex].datos.push(Number(valorFinal.toFixed(4)));
                    }
                }
            }
            columnasEncontradas++;
        }
        saveVariables();
        const activeBtn = document.querySelector('.sidebar-btn.active');
        if (activeBtn && activeBtn.getAttribute('data-section') === 'variables') showSection('variables');
        showNotification(`✅ ¡Datos importados y convertidos correctamente!`);
    } catch (error) { console.error(error); alert('❌ Error al importar. Revisa el enlace CSV.'); }
}