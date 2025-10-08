// script.js

// Variabel Global untuk menyimpan data
let tdee = 0; // Total Daily Energy Expenditure (Kebutuhan Kalori Harian)
let totalConsumedCalories = 0;
const formProfile = document.getElementById('profile-form');
const formMeal = document.getElementById('meal-form');
const resultsSection = document.getElementById('results');
const foodInputSection = document.getElementById('food-input');

// OPERATOR & PERCABANGAN 1: Hitung BMI dan TDEE
formProfile.addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil nilai dari form
    const berat = parseFloat(document.getElementById('berat').value);
    const tinggiCm = parseFloat(document.getElementById('tinggi').value);
    const usia = parseInt(document.getElementById('usia').value);
    const aktivitas = document.getElementById('aktivitas').value;
    const tinggiM = tinggiCm / 100;

    // --- OPERATOR: Perhitungan BMI ---
    const bmi = berat / (tinggiM * tinggiM); 
    
    // --- OPERATOR: Perhitungan BMR (Menggunakan rumus Harris-Benedict yang disederhanakan untuk demo) ---
    const bmr = (10 * berat) + (6.25 * tinggiCm) - (5 * usia) + 5; // Asumsi gender Pria untuk simplifikasi
    
    // --- OPERATOR: Perhitungan TDEE (Kebutuhan Kalori Harian) ---
    let multiplier;
    if (aktivitas === 'sedentary') {
        multiplier = 1.2;
    } else if (aktivitas === 'light') {
        multiplier = 1.375;
    } else if (aktivitas === 'moderate') {
        multiplier = 1.55;
    } else { // active
        multiplier = 1.725;
    }
    
    tdee = Math.round(bmr * multiplier); 

    // Tampilkan Hasil BMI
    document.getElementById('bmi-val').textContent = bmi.toFixed(2);
    document.getElementById('tdee-val').textContent = tdee;

    // --- PERCABANGAN 1: Menentukan Status BMI ---
    let statusBmi = '';
    if (bmi < 18.5) {
        statusBmi = 'Kurus (Underweight)';
    } else if (bmi >= 18.5 && bmi < 25) {
        statusBmi = 'Normal (Healthy)';
    } else if (bmi >= 25 && bmi < 30) {
        statusBmi = 'Kegemukan (Overweight)';
    } else {
        statusBmi = 'Obesitas (Obese)';
    }
    document.getElementById('bmi-status').textContent = statusBmi;
    
    // Tampilkan bagian input makanan dan hasil
    foodInputSection.classList.remove('hidden');
    resultsSection.classList.remove('hidden');
});

// OPERATOR & PERCABANGAN 2: Input Makanan
formMeal.addEventListener('submit', function(e) {
    e.preventDefault();

    const kaloriInput = parseFloat(document.getElementById('kalori').value);
    // const proteinInput = parseFloat(document.getElementById('protein').value); // Bisa digunakan untuk fitur lanjutan

    // --- OPERATOR: Menambahkan total kalori yang dikonsumsi ---
    totalConsumedCalories += kaloriInput;

    // Update tampilan
    document.getElementById('consumed-calories').textContent = totalConsumedCalories;
    
    // Hitung persentase progres
    const progressPercent = Math.min(100, (totalConsumedCalories / tdee) * 100);
    const progressBar = document.getElementById('calorie-progress');
    progressBar.style.width = progressPercent.toFixed(2) + '%';
    
    // --- PERCABANGAN 2: Memberikan Feedback berdasarkan TDEE ---
    const feedbackMsg = document.getElementById('feedback-message');
    
    if (totalConsumedCalories < tdee * 0.8) { // Jika kurang dari 80% dari TDEE
        feedbackMsg.textContent = 'Lanjut Makan! Anda masih memiliki banyak sisa kalori harian. Jangan sampai kekurangan gizi.';
        progressBar.style.backgroundColor = '#2196F3'; // Biru
    } else if (totalConsumedCalories <= tdee) {
        feedbackMsg.textContent = 'Sempurna! Anda mendekati target kalori harian yang ideal. Pertahankan!';
        progressBar.style.backgroundColor = '#4CAF50'; // Hijau
    } else { // Jika melebihi TDEE
        feedbackMsg.textContent = 'STOP! Kalori hari ini sudah melebihi batas kebutuhan. Fokus ke aktivitas fisik.';
        progressBar.style.backgroundColor = '#F44336'; // Merah
    }
    
    // Reset form makanan setelah submit
    formMeal.reset();
});