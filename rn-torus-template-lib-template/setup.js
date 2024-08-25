// setup.js
const fs = require('fs');
const path = require('path');

// Lấy tên thư mục hiện tại
const projectName = path.basename(process.cwd());

if (!projectName) {
  console.error('Không thể xác định tên dự án.');
  process.exit(1);
}

const oldName = 'rn-torus-lib-template';
const newName = projectName;

// Hàm thay thế chuỗi trong file
const replaceInFile = (filePath, oldName, newName) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const updatedContent = fileContent.replace(new RegExp(oldName, 'g'), newName);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
};

// Hàm thay thế chuỗi trong tất cả các file trong thư mục
const replaceInDirectory = (directory, oldName, newName) => {
  fs.readdirSync(directory).forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      replaceInDirectory(filePath, oldName, newName);
    } else if (stats.isFile()) {
      replaceInFile(filePath, oldName, newName);
    }
  });
};

// Thay thế tên trong thư mục gốc
replaceInDirectory('.', oldName, newName);
fs.renameSync(oldName, newName);

console.log('Dự án đã được cấu hình xong.');

// Xóa file script sau khi hoàn tất
const scriptPath = path.resolve(__dirname, 'setup.js');
fs.unlinkSync(scriptPath);
