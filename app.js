const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// 1. إنشاء كلاس مشتق من EventEmitter لإدارة الأحداث
class FileMerger extends EventEmitter {}
const merger = new FileMerger();

// تحديد مسارات الملفات بشكل أمن
const file1Path = path.join(__dirname, 'file1.txt');
const file2Path = path.join(__dirname, 'file2.txt');
const outputPath = path.join(__dirname, 'output.txt');

// كائن لتخزين محتوى الملفات عند قراءتها
const filesData = {
    file1: null,
    file2: null
};

// 2. إعداد المستمعين للأحداث (Event Listeners)

// حدث دمج الملفات عند جاهزيتها
merger.on('mergeFiles', (content1, content2) => {
    const combinedContent = `=== محتوى الملف الأول ===\n${content1}\n\n=== محتوى الملف الثاني ===\n${content2}`;

    // كتابة الملف الناتج بشكل Non-Blocking Async
    fs.writeFile(outputPath, combinedContent, 'utf8', (err) => {
        if (err) {
            merger.emit('error', `فشل أثناء كتابة الملف الناتج: ${err.message}`);
            return;
        }
        console.log('✅ تم دمج المحتوى وكتابته في ملف "output.txt" بنجاح!');
    });
});

// حدث إدارة الأخطاء (Error Handling)
merger.on('error', (errorMessage) => {
    console.error('❌ حدث خطأ:', errorMessage);
});

// دالة للتحقق من اكتمال قراءة الملفين
function checkCompletion() {
    if (filesData.file1 !== null && filesData.file2 !== null) {
        merger.emit('mergeFiles', filesData.file1, filesData.file2);
    }
}

// 3. قراءة الملفات بشكل غير متزامن (Non-Blocking Async)

// قراءة الملف الأول
fs.readFile(file1Path, 'utf8', (err, data) => {
    if (err) {
        merger.emit('error', `فشل قراءة الملف الأول (${file1Path}): ${err.message}`);
        return;
    }
    console.log('📖 تم قراءة الملف الأول بنجاح.');
    filesData.file1 = data;
    checkCompletion();
});

// قراءة الملف الثاني بالتوازي مع الملف الأول
fs.readFile(file2Path, 'utf8', (err, data) => {
    if (err) {
        merger.emit('error', `فشل قراءة الملف الثاني (${file2Path}): ${err.message}`);
        return;
    }
    console.log('📖 تم قراءة الملف الثاني بنجاح.');
    filesData.file2 = data;
    checkCompletion();
});
