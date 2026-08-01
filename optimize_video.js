const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

console.log('Optimizing video...');
ffmpeg('C:\\Users\\Admin\\Downloads\\Naxa.webm')
  .outputOptions([
    '-c:v libx264',
    '-preset medium',
    '-crf 28',
    '-c:a aac',
    '-b:a 128k',
    '-movflags +faststart'
  ])
  .on('end', () => {
    console.log('Video optimization completed successfully.');
  })
  .on('error', (err) => {
    console.error('Error optimizing video:', err.message);
  })
  .save('slider_bg.mp4');
