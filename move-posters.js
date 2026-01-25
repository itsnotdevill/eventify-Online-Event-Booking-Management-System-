const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/kadam/.gemini/antigravity/brain/704bd7a0-44ff-4e3e-9fd3-9db427ac4a38';
const destDir = 'c:\\Users\\kadam\\OneDrive\\Desktop\\Eventify Online Event Booking and Management System (Web Application)\\client\\public\\assets\\events';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = [
    { src: 'poster_apes_1769333968836.png', dest: 'poster_apes.png' },
    { src: 'poster_srikanth_1769333988077.png', dest: 'poster_srikanth.png' },
    { src: 'poster_furiosa_1769334006139.png', dest: 'poster_furiosa.png' },
    { src: 'poster_sunburn_1769334022278.png', dest: 'poster_sunburn.png' },
    { src: 'poster_arijit_1769334040802.png', dest: 'poster_arijit.png' },
    { src: 'poster_football_1769334060664.png', dest: 'poster_football.png' }
];

files.forEach(file => {
    const source = path.join(srcDir, file.src);
    const destination = path.join(destDir, file.dest);

    if (fs.existsSync(source)) {
        fs.copyFileSync(source, destination);
        console.log(`Copied ${file.src} to ${destination}`);
    } else {
        console.error(`Source file not found: ${source}`);
    }
});
