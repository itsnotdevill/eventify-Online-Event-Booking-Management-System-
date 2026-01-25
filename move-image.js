const fs = require('fs');
const path = require('path');

const sourcePath = 'C:/Users/kadam/.gemini/antigravity/brain/704bd7a0-44ff-4e3e-9fd3-9db427ac4a38/eventify_hero_banner_1769333606041.png';
const destDir = 'c:\\Users\\kadam\\OneDrive\\Desktop\\Eventify Online Event Booking and Management System (Web Application)\\client\\public\\assets';
const destPath = path.join(destDir, 'hero-banner.png');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFile(sourcePath, destPath, (err) => {
    if (err) throw err;
    console.log('Image copied successfully to ' + destPath);
});
