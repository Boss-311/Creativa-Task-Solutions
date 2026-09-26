const http = require('http');
const PORT = 3555;

// قاعدة بيانات مؤقتة في الذاكرة (In-Memory Array)
let users = [
  { id: 1, name: 'Boss' },
  { id: 2, name: 'Moamen' }
];

let products = [
  { id: 101, name: 'labtop', price: 15000 },
  { id: 102, name: 'phone', price: 8000 },
  { id: 103, name: 'tablet', price: 5000 }
];

const server = http.createServer((req, res) => {

  // 1. [GET] الصفحة الرئيسية (Home)
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello here Boss');
  }

  // 2. [GET] مسار عرض المستخدمين (User)
  else if (req.url === '/user' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      message: '(User Route)',
      users: users
    }));
  }

  // 3. [GET] مسار عرض المنتجات (Product)
  else if (req.url === '/product' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      message: '(Product Route)',
      products: products
    }));
  }

  // 4. [POST] مسار إضافة منتج جديد وترجيع تأكيد الاستلام
  else if (req.url === '/product' && req.method === 'POST') {
    let body = '';

    // تجميع أجزاء البيانات المرسلة (Chunks)
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // بعد انتهاء وصول البيانات بالكامل
    req.on('end', () => {
      try {
        const newProduct = JSON.parse(body);
        products.push(newProduct);

        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          message: 'Data received and stored successfully!',
          storedProduct: newProduct,
          allProducts: products
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ message: 'Invalid JSON format' }));
      }
    });
  }

  // مسار غير موجود (404)
  else {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ message: 'Page Not Found' }));
  }

});

// تشغيل السيرفر
server.listen(PORT, () => {
  console.log(`The server is working successfully on http://localhost:${PORT}`);
});