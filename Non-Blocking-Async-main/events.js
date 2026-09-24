const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

// إنشاء كلاس وتقسيمه لنظام الأحداث
class FileMerger extends EventEmitter {}
const merger = new FileMerger();

// الاستماع لحدث الدمج
merger.on('mergeFiles', (content1, content2) => {
    const combinedContent = `=== Content of File 1 ===\n${content1}\n\n=== Content of File 2 ===\n${content2}`;
    const outputPath = path.join(__dirname, 'output.txt');

    // كتابة الملف بشكل غير متزامن (Non-Blocking)
    fs.writeFile(outputPath, combinedContent, 'utf8', (err) => {
        if (err) {
            console.error('❌ Error writing to output file:', err);
            return;
        }
        console.log('✅ File successfully merged and saved to "output.txt"!');
    });
});

module.exports = merger;
