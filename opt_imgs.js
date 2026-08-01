const sharp = require('sharp');
sharp('formal_discussion.jpg')
  .webp({ quality: 60 })
  .toFile('formal_discussion.webp')
  .then(() => console.log('Successfully converted to webp'));

sharp('ecommerce.jpg')
  .webp({ quality: 60 })
  .toFile('ecommerce.webp')
  .then(() => console.log('Successfully converted ecommerce to webp'));
