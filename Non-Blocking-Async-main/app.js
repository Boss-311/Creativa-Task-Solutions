const fs = require('fs');
const path = require('path');
const merger = require('./events'); // استيراد الـ EventEmitter

let file1Data = null;
let file2Data = null;

// دالة للتحقق من اكتمال قراءة الملفين بغض النظر عن الأسرع بينهما
function checkAndEmit() {
    if (file1Data !== null && file2Data !== null) {
        merger.emit('mergeFiles', file1Data, file2Data);
    }
}

// 1. قراءة الملف الأول (Non-Blocking)
fs.readFile(path.join(__dirname, 'file1.txt'), 'utf8', (err, data) => {
    if (err) return console.error('❌ Error reading file1.txt:', err);
    file1Data = data;
    checkAndEmit();
});

// 2. قراءة الملف الثاني (Non-Blocking)
fs.readFile(path.join(__dirname, 'file2.txt'), 'utf8', (err, data) => {
    if (err) return console.error('❌ Error reading file2.txt:', err);
    file2Data = data;
    checkAndEmit();
});
