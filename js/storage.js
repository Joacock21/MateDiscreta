// ============================================
// CONFIGURACIÓN DEL GOOGLE SHEET
// ============================================
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSjChahZWxf7Nzp1hswWP0OGCWlMxTpQp_H_qKpRQAKMMKoR-JWxmYJnxpMOKayXLUo3kN3ve3dlM3A/pub?output=csv';

// ============================================
// DATOS DEL PROFESOR
// ============================================
window.profesorDatos = {
    nombre: 'Ing. Beteta Salas, Marisel Rocio',
    correo: 'marisel.beteta@epg.usil.pe',
    seccion: 'C2A503',
    bloque: 'FC-SMVEMP01B01N',
    horario: 'Vie 07:00-10:40',
    foto: ''
};

// ============================================
// DATOS DE ESTUDIANTES
// ============================================
window.estudiantesDatos = [
    { nombre: 'Arias Rodriguez, Victor Joaquin', codigo: '2512854', seccion: 'C2A503', carrera: 'Ingeniería de Sistemas e Información', edad: 18, email: 'Victor.ariasr@usil.pe', foto: 'dad' },
    { nombre: 'Chavez Villaviciencio, Fabian Augusto', codigo: '2510158', seccion: 'C2A503', carrera: 'Ingeniería de Sistemas e Información', edad: 18, email: 'fabian.chavezv@usil.pe', foto: 'dad' },
    { nombre: 'Costa Saravia, Javier Enrique', codigo: '2510668', seccion: 'C2A503', carrera: 'Ingeniería de Sistemas e Información', edad: 18, email: 'javier.costa@usil.pe', foto: 'dad' },
    { nombre: 'Rojas Colan, Daphne Saori', codigo: '2512572', seccion: 'C2A503', carrera: 'Ingeniería de Software', edad: 18, email: 'daphne.rojas@usil.pe', foto: 'dad' }
];

// ============================================
// INFORMACIÓN GENERAL
// ============================================
window.infoGeneralData = {
    curso: 'Matemática Discreta - C2A503',
    objetivo: 'Aplicar conceptos de estadística descriptiva y análisis de regresión lineal para modelar relaciones entre variables cuantitativas.',
    periodo: '2025-2 (Agosto - Diciembre 2025)',
    descripcion: 'Este proyecto tiene como finalidad recolectar y analizar datos estadísticos aplicando métodos de regresión lineal para encontrar correlaciones y patrones. Se utilizarán herramientas visuales como el plano cartesiano para representar las relaciones entre variables.'
};

// ============================================
// BIBLIOGRAFÍA
// ============================================
window.bibliografiaData = [
    { titulo: 'Probabilidad y Estadística para Ingeniería y Ciencias', autores: 'Devore, J. L.', año: 2016, editorial: 'Cengage Learning', edicion: '9na Edición' },
    { titulo: 'Estadística Matemática con Aplicaciones', autores: 'Wackerly, D., Mendenhall, W., & Scheaffer, R.', año: 2010, editorial: 'Cengage Learning', edicion: '7ma Edición' },
    { titulo: 'Matemáticas Discretas y sus Aplicaciones', autores: 'Rosen, K. H.', año: 2012, editorial: 'McGraw-Hill', edicion: '7ma Edición' },
    { titulo: 'Introduction to the Practice of Statistics', autores: 'Moore, D. S., McCabe, G. P., & Craig, B. A.', año: 2017, editorial: 'W. H. Freeman', edicion: '9na Edición' },
];

window.variables = [];
let mostrarRegresion = false;

// ============================================
// INICIALIZAR VARIABLES
// ============================================
function initializeVariables() {
    const stored = localStorage.getItem('variables');
    if (stored) {
        window.variables = JSON.parse(stored);
    } else {
        window.variables = [];
        saveVariables();
    }
}

// ============================================
// GUARDAR Y CARGAR VARIABLES
// ============================================
function saveVariables() {
    localStorage.setItem('variables', JSON.stringify(window.variables));
}

function getVariable(id) {
    return window.variables.find(v => v.id === id);
}

// ============================================
// OPERACIONES CON DATOS
// ============================================
function updateVariableName(id, name) {
    const v = getVariable(id);
    if (v) {
        v.name = name.trim() || `Variable ${id}`;
        saveVariables();
        const currentSection = document.querySelector('.sidebar-btn.active')?.getAttribute('data-section');
        if (currentSection === 'variables' || currentSection === 'datos') showSection(currentSection);
    }
}

function addDatoToVariable(varId, valor) {
    const v = getVariable(varId);
    if (v) {
        v.datos.push(Number(valor));
        saveVariables();
    }
}

function deleteDatoFromVariable(varId, idx) {
    const v = getVariable(varId);
    if (v) {
        v.datos.splice(idx, 1);
        saveVariables();
    }
}

// ============================================
// CARGAR INFORMACIÓN EN UI
// ============================================
function loadInfoGeneral() {
    const elementos = {
        curso: document.getElementById('infoCurso'),
        objetivo: document.getElementById('infoObjetivo'),
        periodo: document.getElementById('infoPeriodo'),
        descripcion: document.getElementById('infoDescripcion')
    };
    if (elementos.curso) elementos.curso.textContent = window.infoGeneralData.curso;
    if (elementos.objetivo) elementos.objetivo.textContent = window.infoGeneralData.objetivo;
    if (elementos.periodo) elementos.periodo.textContent = window.infoGeneralData.periodo;
    if (elementos.descripcion) elementos.descripcion.textContent = window.infoGeneralData.descripcion;
}

function loadProfesor() {
    const els = {
        nombre: document.getElementById('profesorNameView'),
        email: document.getElementById('profesorEmailView'),
        seccion: document.getElementById('profesorSeccionView'),
        bloque: document.getElementById('profesorBloqueView'),
        horario: document.getElementById('profesorHorarioView'),
        foto: document.getElementById('profesorFotoView')
    };
    if (els.nombre) els.nombre.textContent = window.profesorDatos.nombre;
    if (els.email) els.email.textContent = window.profesorDatos.correo;
    if (els.seccion) els.seccion.textContent = window.profesorDatos.seccion;
    if (els.bloque) els.bloque.textContent = window.profesorDatos.bloque;
    if (els.horario) els.horario.textContent = window.profesorDatos.horario;
    if (els.foto) els.foto.src = window.profesorDatos.foto;
    
    // Actualizar número de variables en el modal
    const profVariables = document.getElementById('profVariables');
    if (profVariables) profVariables.textContent = window.variables.length;
}

function loadStudents() {
    let div = document.getElementById('studentList');
    if (!div) return;
    div.innerHTML = '';
    window.estudiantesDatos.forEach((st, index) => {
        div.innerHTML += `<div class="student-mini-card" onclick="openEstudianteDetalle(${index})">
            <h3>${st.nombre}</h3>
            <p><strong>Código:</strong> ${st.codigo}</p>
            <p><strong>Sección:</strong> ${st.seccion}</p>
            <p><strong>Carrera:</strong> ${st.carrera}</p>
            <p style="margin-top: 0.8rem; font-size: 0.85rem; color: var(--primary-color);">👆 Clic para ver más detalles</p>
        </div>`;
    });
}

function displayBibliografia() {
    const mainContent = document.getElementById('mainContent');
    let html = '<div class="biblio-display"><h3>📚 Referencias Bibliográficas</h3>';
    window.bibliografiaData.forEach((ref, index) => {
        html += `<div class="biblio-item">
            <h4>${index + 1}. ${ref.titulo}</h4>
            <p><strong>Autor(es):</strong> ${ref.autores}</p>
            <p><strong>Año:</strong> ${ref.año}</p>
            <p><strong>Editorial:</strong> ${ref.editorial}</p>
            <p><strong>Edición:</strong> ${ref.edicion}</p>
        </div>`;
    });
    html += '</div>';
    mainContent.innerHTML = html;
}

// ============================================
// REGRESIÓN LINEAL
// ============================================
function calcularRegresion(xData, yData, forzarOrigen = false) {
    const n = xData.length;
    if (n < 2) return { m: 0, b: 0, R: 0, R2: 0, errorEstandar: 0 };

    if (forzarOrigen) {
        const sumXY = xData.reduce((a, b, i) => a + b * yData[i], 0);
        const sumXX = xData.reduce((a, b) => a + b * b, 0);
        const m = sumXX !== 0 ? sumXY / sumXX : 0;
        const b = 0;

        let sumErrores = 0;
        let sumTotal = 0;
        for (let i = 0; i < n; i++) {
            const yPred = m * xData[i];
            sumErrores += (yData[i] - yPred) ** 2;
            sumTotal += yData[i] ** 2;
        }

        const R2 = 1 - (sumErrores / sumTotal);
        const R = Math.sqrt(Math.abs(R2)) * (R2 >= 0 ? 1 : -1);
        const errorEstandar = n > 1 ? Math.sqrt(sumErrores / (n - 1)) : 0;

        return { m, b, R, R2, errorEstandar };
    }

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
    for (let i = 0; i < n; i++) {
        sxy += (xData[i] - meanX) * (yData[i] - meanY);
        sxx += (xData[i] - meanX) ** 2;
        syy += (yData[i] - meanY) ** 2;
    }
    const denominadorR = Math.sqrt(sxx * syy);
    const R = denominadorR !== 0 ? sxy / denominadorR : 0;
    const R2 = R ** 2;

    let sumErrores = 0;
    for (let i = 0; i < n; i++) {
        const yPred = m * xData[i] + b;
        sumErrores += (yData[i] - yPred) ** 2;
    }
    const errorEstandar = n > 2 ? Math.sqrt(sumErrores / (n - 2)) : 0;
    return { m, b, R, R2, errorEstandar };
}

// ============================================
// GESTIÓN DE MODELOS MATEMÁTICOS
// ============================================
function guardarModeloMatematico(modelo) {
    let modelos = JSON.parse(localStorage.getItem('modelosMatematicos')) || [];
    modelos.push(modelo);
    localStorage.setItem('modelosMatematicos', JSON.stringify(modelos));
}

function loadModelosMatematicos() {
    return JSON.parse(localStorage.getItem('modelosMatematicos')) || [];
}

function deleteModeloMatematico(id) {
    let modelos = loadModelosMatematicos();
    modelos = modelos.filter(m => m.id !== id);
    localStorage.setItem('modelosMatematicos', JSON.stringify(modelos));
    displayModelosMatematicos();
}

function displayModelosMatematicos() {
    const mainContent = document.getElementById('mainContent');
    const modelos = loadModelosMatematicos();

    if (modelos.length === 0) {
        mainContent.innerHTML = `<div style='text-align: center; padding: 4rem; background: rgba(30, 41, 59, 0.5); border-radius: 15px; border: 2px dashed var(--border-color);'>
            <h3 style='color: var(--gray-text); margin-bottom: 1.5rem; font-size: 1.5rem;'>📊 No hay modelos matemáticos guardados</h3>
            <p style='color: var(--gray-text); font-size: 1.1rem;'>Crea un gráfico en el Plano Cartesiano y agrégalo como modelo</p>
        </div>`;
        return;
    }

    let html = '<div class="modelos-grid">';
    modelos.forEach(modelo => {
        let interpretacionR = '';
        const absR = Math.abs(modelo.correlacion);
        if (absR >= 0.9) interpretacionR = 'Correlación muy fuerte';
        else if (absR >= 0.7) interpretacionR = 'Correlación fuerte';
        else if (absR >= 0.5) interpretacionR = 'Correlación moderada';
        else if (absR >= 0.3) interpretacionR = 'Correlación débil';
        else interpretacionR = 'Correlación muy débil o nula';

        const pendiente = modelo.pendiente || 0;

        html += `<div class="modelo-card">
            <div class="modelo-header">
                <h3>${modelo.nombreX} vs ${modelo.nombreY}</h3>
                <button class="delete-btn" onclick="deleteModeloMatematico(${modelo.id})">🗑️ Eliminar</button>
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
            </div>
            <div class="modelo-interpretacion">
                <h4>📊 Interpretación</h4>
                <p>${interpretacionR}</p>
            </div>
        </div>`;
    });
    html += '</div>';
    mainContent.innerHTML = html;
}

// ============================================
// EXPORTAR/IMPORTAR JSON
// ============================================
function descargarJSON() {
    const dataStr = JSON.stringify(window.variables, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos_estadistica_' + Date.now() + '.json';
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification('✅ Variables descargadas correctamente');
}

function cargarJSON(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const jsonCargado = JSON.parse(e.target.result);
            if (Array.isArray(jsonCargado)) {
                window.variables = jsonCargado;
                saveVariables();
                const currentSection = document.querySelector('.sidebar-btn.active')?.getAttribute('data-section');
                if (currentSection === 'variables') showSection('variables');
                showNotification('✅ Datos importados correctamente');
            } else {
                alert('⚠️ El archivo JSON no es válido.');
            }
        } catch (error) {
            alert('❌ Error al leer el archivo JSON.');
        }
    };
    reader.readAsText(file);
    inputElement.value = '';
}

// ============================================
// PARSING INTELIGENTE DE DATOS
// ============================================
function parsearValor(celda) {
    celda = String(celda).toLowerCase().trim();

    // Eliminar caracteres especiales comunes
    celda = celda.replace(/[s\/\.\-]/g, '').trim();

    // Extraer número
    const match = celda.match(/(\d+(?:\.\d+)?)/);
    if (!match) return null;

    let numero = parseFloat(match[1]);

    // Detectar minutos y convertir a decimal (horas)
    if (celda.includes('min')) {
        numero = numero / 60;
    }

    return isNaN(numero) ? null : numero;
}

// ============================================
// IMPORTAR DESDE GOOGLE SHEETS
// ============================================
async function importarDesdeGoogleSheets(url) {
    try {
        showNotification('⏳ Conectando con Google Sheets...');

        const response = await fetch(url);
        if (!response.ok) throw new Error('No se pudo descargar el archivo');

        const textoCSV = await response.text();
        const filas = textoCSV.split('\n').filter(f => f.trim());

        if (filas.length < 2) {
            showNotification('⚠️ Archivo vacío', 'error');
            return;
        }

        // Parsear CSV
        const encabezados = filas[0].split(',').map(h => h.replace(/"/g, '').trim());
        window.variables = [];

        // Procesar cada columna como variable
        for (let colIdx = 1; colIdx < encabezados.length; colIdx++) {
            const nombreVariable = encabezados[colIdx] || `Variable ${colIdx}`;
            const datos = [];

            // Procesar datos de la columna
            for (let rowIdx = 1; rowIdx < filas.length; rowIdx++) {
                const columnas = filas[rowIdx].split(',').map(c => c.replace(/"/g, '').trim());
                if (columnas[colIdx]) {
                    const valor = parsearValor(columnas[colIdx]);
                    if (valor !== null) {
                        datos.push(parseFloat(valor.toFixed(4)));
                    }
                }
            }

            // Crear variable solo si tiene datos
            if (datos.length > 0) {
                window.variables.push({
                    id: colIdx,
                    name: nombreVariable,
                    datos: datos
                });
            }
        }

        saveVariables();
        loadProfesor(); // Actualizar contador de variables

        const seccionActiva = document.querySelector('.sidebar-btn.active')?.getAttribute('data-section');
        if (seccionActiva === 'variables') showSection('variables');

        const totalVariables = window.variables.length;
        const totalDatos = window.variables.reduce((sum, v) => sum + v.datos.length, 0);

        showNotification(`✅ ¡Éxito! ${totalVariables} variables importadas con ${totalDatos} datos totales`, 'success');

    } catch (error) {
        console.error('Error:', error);
        showNotification('❌ Error al importar. Revisa el enlace CSV.', 'error');
    }
}