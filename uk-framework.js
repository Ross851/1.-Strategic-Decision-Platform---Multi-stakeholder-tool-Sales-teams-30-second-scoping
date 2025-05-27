/**
 * UK IT Discovery Framework - JavaScript
 * Detailed structured journey with comprehensive guidance, hints, tips, and recommendations at each stage
 */

let currentStep = 1;
let userSelections = {};
const totalSteps = 4;

// Detailed Stage Descriptions
const stageDetails = {
    1: {
        title: 'Organisation Information',
        description: 'Gather basic details about the organisation to provide tailored recommendations.',
        fields: ['companyName', 'industry', 'location'],
        hints: ['Provide official organisation name', 'Select relevant UK industry', 'Choose geographical location for accurate cost estimations']
    },
    2: {
        title: 'Project Type',
        description: 'Identify the primary type of IT project or initiative.',
        fields: ['projectType'],
        hints: ['Choose the type that most accurately reflects your current needs (e.g., new application, integration, compliance)']
    },
    3: {
        title: 'Key Requirements',
        description: 'Capture key challenges and priorities that your organisation faces.',
        fields: ['painPoints', 'timeline', 'budget'],
        hints: ['Select all relevant pain points', 'Provide a realistic timeline', 'Set a practical budget to enable accurate planning']
    },
    4: {
        title: 'Results & Recommendations',
        description: 'View tailored analysis, detailed pros and cons, and strategic recommendations based on previous inputs.',
        hints: ['Review recommendations carefully', 'Export results for internal discussions', 'Schedule a discovery workshop for further refinement']
    }
};

// Utility Functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId)?.classList.add('active');
    window.scrollTo(0, 0);
}

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('scopeProgress').style.width = `${progress}%`;
}

function showError(id, message) {
    document.getElementById(`${id}-error`).textContent = message;
    document.getElementById(`${id}-error`).classList.add('show');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.classList.remove('show'));
}

// Validation
function validateStep(step) {
    clearErrors();
    let valid = true;
    const fields = stageDetails[step].fields;

    fields.forEach(field => {
        const element = document.getElementById(field);
        const value = element?.value.trim();

        if (!value || value === '') {
            showError(field, 'This field is required');
            valid = false;
        } else {
            userSelections[field] = value;
        }
    });

    return valid;
}

// Step Navigation
function nextStep() {
    if (!validateStep(currentStep)) return;

    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep++;

    if (currentStep <= totalSteps) {
        document.getElementById(`step-${currentStep}`).classList.add('active');
        displayStageInfo(currentStep);
        updateProgress();
    } else {
        generateResults();
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step-${currentStep}`).classList.add('active');
        displayStageInfo(currentStep);
        updateProgress();
    }
}

// Display stage information with hints and tips
function displayStageInfo(step) {
    const stageInfo = stageDetails[step];
    const stageContainer = document.getElementById('stage-info');

    stageContainer.innerHTML = `
        <h3>${stageInfo.title}</h3>
        <p>${stageInfo.description}</p>
        <ul>
            ${stageInfo.hints.map(hint => `<li>💡 ${hint}</li>`).join('')}
        </ul>
    `;
}

// Results Generation
function generateResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `
        <h3>🎯 Tailored UK IT Strategy Recommendations</h3>
        <ul>
            <li><strong>Organisation:</strong> ${userSelections.companyName}</li>
            <li><strong>Industry:</strong> ${userSelections.industry}</li>
            <li><strong>Location:</strong> ${userSelections.location}</li>
            <li><strong>Project Type:</strong> ${userSelections.projectType}</li>
            <li><strong>Key Pain Points:</strong> ${userSelections.painPoints}</li>
            <li><strong>Budget:</strong> £${userSelections.budget}</li>
            <li><strong>Timeline:</strong> ${userSelections.timeline}</li>
        </ul>
        <button onclick="downloadJSON(userSelections, 'UK-IT-Strategy-Results.json')">Download Detailed Report</button>
    `;
    showPage('results');
}

// JSON Download
function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialization
function initApp() {
    updateProgress();
    displayStageInfo(currentStep);
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('prevBtn').addEventListener('click', prevStep);
}

document.addEventListener('DOMContentLoaded', initApp);
