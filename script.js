document.getElementById('characterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Ambil Nilai dari Form (Input)
    const str = parseInt(document.getElementById('str').value);
    const agi = parseInt(document.getElementById('agi').value);
    const int = parseInt(document.getElementById('int').value);

    // 2. Operator Matematika dan Logika
    const totalPoints = str + agi + int; // **Operator:** Penjumlahan (+)

    let element = "";
    let highestStat = Math.max(str, agi, int); // Mencari nilai status tertinggi

    // 3. Percabangan (if/else if/else) untuk Menentukan Elemen
    if (str === highestStat && str > agi && str > int) {
        // Jika STR tertinggi dan tidak sama dengan yang lain (dominan)
        element = "Fire"; // Api: Agresif, Serangan Kuat (STR)
    } else if (agi === highestStat && agi > str && agi > int) {
        element = "Wind"; // Angin: Cepat, Lincah (AGI)
    } else if (int === highestStat && int > str && int > agi) {
        element = "Water"; // Air: Bijaksana, Fleksibel (INT)
    } else {
        // Jika ada 2 status atau lebih yang nilainya sama tinggi (Balance/Hybrid)
        element = "Earth"; // Bumi: Keseimbangan, Pertahanan Kuat (Hybrid/Balance)
    }

    // 4. Tampilkan Hasil
    const resultBox = document.getElementById('resultBox');
    const totalPointsDisplay = document.getElementById('totalPoints');
    const elementResult = document.getElementById('elementResult');

    // Update teks dan kelas CSS
    totalPointsDisplay.textContent = `Total Poin: ${totalPoints}`;
    elementResult.textContent = `Elemen: ${element}`;
    
    // Hapus semua kelas elemen dan tambahkan yang sesuai
    elementResult.classList.remove('Fire', 'Water', 'Wind', 'Earth');
    elementResult.classList.add(element); // Menambahkan kelas CSS (Percabangan di CSS)

    // Tampilkan kotak hasil
    resultBox.classList.remove('hidden');
});