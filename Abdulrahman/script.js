/*
 * Student Identity Cipher
 * Caesar Cipher Web Application
 * Functionality: Encrypt & Decrypt using Caesar Cipher algorithm
 */

// ============================================
// DOM Elements
// ============================================

const fullNameInput = document.getElementById('fullName');
const yearLevelInput = document.getElementById('yearLevel');
const courseInput = document.getElementById('course');
const keyNInput = document.getElementById('keyN');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const clearBtn = document.getElementById('clearBtn');
const errorMessage = document.getElementById('errorMessage');
const plaintextOutput = document.getElementById('plaintextOutput');
const resultOutput = document.getElementById('resultOutput');

// ============================================
// Caesar Cipher Functions
// ============================================

/**
 * Encrypts a single character using Caesar Cipher
 * @param {string} char - The character to encrypt
 * @param {number} shift - The shift value (1-25)
 * @returns {string} - The encrypted character
 */
function encryptChar(char, shift) {
    // Check if character is a letter
    if (/[a-zA-Z]/.test(char)) {
        // Determine if uppercase or lowercase
        const charCode = char.charCodeAt(0);
        const isUpperCase = charCode >= 65 && charCode <= 90;
        const baseCode = isUpperCase ? 65 : 97;

        // Apply Caesar Cipher formula: E = (X + N) % 26
        const charIndex = charCode - baseCode;
        const encryptedIndex = (charIndex + shift) % 26;
        return String.fromCharCode(baseCode + encryptedIndex);
    }
    // Return unchanged if not a letter
    return char;
}

/**
 * Decrypts a single character using Caesar Cipher
 * @param {string} char - The character to decrypt
 * @param {number} shift - The shift value (1-25)
 * @returns {string} - The decrypted character
 */
function decryptChar(char, shift) {
    // Check if character is a letter
    if (/[a-zA-Z]/.test(char)) {
        // Determine if uppercase or lowercase
        const charCode = char.charCodeAt(0);
        const isUpperCase = charCode >= 65 && charCode <= 90;
        const baseCode = isUpperCase ? 65 : 97;

        // Apply reverse Caesar Cipher formula: D = (X - N) % 26
        const charIndex = charCode - baseCode;
        const decryptedIndex = (charIndex - shift + 260) % 26; // +260 to handle negative modulo
        return String.fromCharCode(baseCode + decryptedIndex);
    }
    // Return unchanged if not a letter
    return char;
}

/**
 * Encrypts the entire text using Caesar Cipher
 * @param {string} text - The text to encrypt
 * @param {number} shift - The shift value (1-25)
 * @returns {string} - The encrypted text
 */
function encryptText(text, shift) {
    return text
        .split('')
        .map(char => encryptChar(char, shift))
        .join('');
}

/**
 * Decrypts the entire text using Caesar Cipher
 * @param {string} text - The text to decrypt
 * @param {number} shift - The shift value (1-25)
 * @returns {string} - The decrypted text
 */
function decryptText(text, shift) {
    return text
        .split('')
        .map(char => decryptChar(char, shift))
        .join('');
}

// ============================================
// Validation Functions
// ============================================

/**
 * Validates all input fields
 * @returns {object} - { isValid: boolean, error: string }
 */
function validateInputs() {
    const fullName = fullNameInput.value.trim();
    const yearLevel = yearLevelInput.value.trim();
    const course = courseInput.value.trim();
    const keyN = keyNInput.value.trim();

    // Check for empty fields
    if (!fullName || !yearLevel || !course || !keyN) {
        return {
            isValid: false,
            error: '⚠️ All fields are required. Please fill in all inputs.'
        };
    }

    // Validate key is between 1-25
    const keyNumValue = parseInt(keyN, 10);
    if (isNaN(keyNumValue) || keyNumValue < 1 || keyNumValue > 25) {
        return {
            isValid: false,
            error: '⚠️ Shift Key (N) must be between 1 and 25.'
        };
    }

    return { isValid: true, error: '' };
}

/**
 * Shows error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

/**
 * Clears error message
 */
function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

// ============================================
// User Interface Functions
// ============================================

/**
 * Combines student information into required format
 * @returns {string} - "FULL NAME | YEAR | COURSE" (uppercase)
 */
function getCombinedText() {
    const fullName = fullNameInput.value.trim().toUpperCase();
    const yearLevel = yearLevelInput.value.trim();
    const course = courseInput.value.trim().toUpperCase();
    return `${fullName} | ${yearLevel} | ${course}`;
}

/**
 * Displays plaintext in the plaintext output box
 * @param {string} text - The plaintext to display
 */
function displayPlaintext(text) {
    plaintextOutput.innerHTML = `<p>${escapeHtml(text)}</p>`;
}

/**
 * Displays result in the result output box
 * @param {string} text - The result text to display
 */
function displayResult(text) {
    resultOutput.innerHTML = `<p>${escapeHtml(text)}</p>`;
}

/**
 * Escapes HTML special characters to prevent injection
 * @param {string} text - The text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, char => map[char]);
}

// ============================================
// Event Handlers
// ============================================

/**
 * Handles encryption button click
 */
function handleEncrypt() {
    clearError();

    // Validate inputs
    const validation = validateInputs();
    if (!validation.isValid) {
        showError(validation.error);
        return;
    }

    // Get inputs
    const plaintext = getCombinedText();
    const keyN = parseInt(keyNInput.value.trim(), 10);

    // Encrypt
    const encrypted = encryptText(plaintext, keyN);

    // Display results
    displayPlaintext(plaintext);
    displayResult(encrypted);
}

/**
 * Handles decryption button click
 */
function handleDecrypt() {
    clearError();

    // Validate key input
    const keyN = keyNInput.value.trim();
    if (!keyN) {
        showError('⚠️ Shift Key (N) is required. Please enter a value.');
        return;
    }

    const keyNumValue = parseInt(keyN, 10);
    if (isNaN(keyNumValue) || keyNumValue < 1 || keyNumValue > 25) {
        showError('⚠️ Shift Key (N) must be between 1 and 25.');
        return;
    }

    // Get the currently displayed encrypted text from the result output
    const resultText = resultOutput.innerText.trim();
    if (!resultText || resultText === 'Result will appear here...') {
        showError('⚠️ No encrypted text to decrypt. Please encrypt something first.');
        return;
    }

    // Decrypt the result text
    const decrypted = decryptText(resultText, keyNumValue);

    // Display the decrypted text in both output boxes
    displayPlaintext(resultText);
    displayResult(decrypted);
}

/**
 * Handles clear button click
 */
function handleClear() {
    // Clear all input fields
    fullNameInput.value = '';
    yearLevelInput.value = '';
    courseInput.value = '';
    keyNInput.value = '';

    // Clear error message
    clearError();

    // Clear output displays
    plaintextOutput.innerHTML = '<p class="placeholder">Plaintext will appear here...</p>';
    resultOutput.innerHTML = '<p class="placeholder">Result will appear here...</p>';

    // Focus on first input
    fullNameInput.focus();
}

// ============================================
// Event Listeners
// ============================================

encryptBtn.addEventListener('click', handleEncrypt);
decryptBtn.addEventListener('click', handleDecrypt);
clearBtn.addEventListener('click', handleClear);

// Allow Enter key to trigger encryption
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleEncrypt();
    }
});

// ============================================
// Initialization
// ============================================

// Set input focus to full name field on page load
window.addEventListener('load', () => {
    fullNameInput.focus();
});
