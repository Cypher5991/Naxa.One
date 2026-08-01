const sharp = require('sharp');
sharp('customers_collage.jpg')
  .resize(1200)
  .webp({ quality: 70 })
  .toFile('customers_collage.webp')
  .then(() => console.log('Successfully converted to webp'));
