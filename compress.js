const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputPath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\e998594b-8471-4366-bf84-4aa6fd564f9d\\.tempmediaStorage\\media_e998594b-8471-4366-bf84-4aa6fd564f9d_1785531484626.mp4';
const outputPath = 'compressed_bg.mp4';

console.log('Starting compression...');

ffmpeg(inputPath)
  .outputOptions([
    '-c:v libx264',
    '-crf 28',         // High compression
    '-preset superfast',
    '-vf scale=-2:720', // Scale to 720p
    '-an',             // Remove audio
    '-movflags +faststart'
  ])
  .on('end', () => console.log('Compression finished successfully.'))
  .on('error', (err) => console.log('Error: ' + err.message))
  .save(outputPath);
