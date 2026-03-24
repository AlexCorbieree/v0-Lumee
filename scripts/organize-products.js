import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

// Find the actual project root by searching upwards for package.json
let projectRoot = __dirname;
for (let i = 0; i < 5; i++) {
  if (fs.existsSync(path.join(projectRoot, 'package.json'))) {
    break;
  }
  projectRoot = path.dirname(projectRoot);
}

const productsPath = path.join(projectRoot, 'data/products.json');
const catalogPath = path.join(projectRoot, 'public/assets/catalogo');

console.log('[v0] Script location:', __dirname);
console.log('[v0] Project root found:', projectRoot);
console.log('[v0] Products path:', productsPath);
console.log('[v0] Catalog path:', catalogPath);
console.log('[v0] Catalog exists:', fs.existsSync(catalogPath));
console.log('[v0] Products file exists:', fs.existsSync(productsPath));

// Read the catalog directory structure
function getCatalogStructure() {
  const structure = {};

  // Read each brand directory
  const brands = fs.readdirSync(catalogPath);

  brands.forEach(brand => {
    const brandPath = path.join(catalogPath, brand);
    if (!fs.statSync(brandPath).isDirectory()) return;

    structure[brand] = {};
    const models = fs.readdirSync(brandPath);

    models.forEach(model => {
      const modelPath = path.join(brandPath, model);
      if (!fs.statSync(modelPath).isDirectory()) return;

      const images = fs.readdirSync(modelPath)
        .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file))
        .sort((a, b) => {
          const aNum = parseInt(a.split('.')[0]);
          const bNum = parseInt(b.split('.')[0]);
          return aNum - bNum;
        })
        .map(file => `/assets/catalogo/${brand}/${model}/${file}`);

      structure[brand][model] = images;
    });
  });

  return structure;
}

// Main logic
console.log('[v0] Reading catalog structure...');
const catalogStructure = getCatalogStructure();

console.log('[v0] Catalog structure:');
Object.entries(catalogStructure).forEach(([brand, models]) => {
  console.log(`  ${brand}:`);
  Object.entries(models).forEach(([model, images]) => {
    console.log(`    ${model}: ${images.length} images`);
  });
});

// Read products JSON
let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log(`[v0] Found ${products.length} products`);

// Map to track which products we've already processed
const processedModels = new Set();
const variantMap = {}; // To group variants together

// First pass: identify variants (e.g., HAVANA and NEGRO for same model)
Object.entries(catalogStructure).forEach(([brand, models]) => {
  Object.keys(models).forEach(model => {
    // Extract base model name (remove color variant)
    const baseModel = model
      .replace(/\s+(HAVANA|NEGRO|MARRON|AZUL|ROJO|VERDE|ROSA|BLANCO)$/i, '')
      .trim();

    if (!variantMap[brand]) variantMap[brand] = {};
    if (!variantMap[brand][baseModel]) {
      variantMap[brand][baseModel] = [];
    }

    variantMap[brand][baseModel].push(model);
  });
});

console.log('[v0] Variant mapping:');
Object.entries(variantMap).forEach(([brand, models]) => {
  Object.entries(models).forEach(([baseModel, variants]) => {
    if (variants.length > 1) {
      console.log(`  ${brand} - ${baseModel}: ${variants.join(', ')}`);
    }
  });
});

// Update products
products = products.map((product, index) => {
  const brand = product.brandKey;
  let model = product.name.replace(/\//g, '-').replace(/\s+/g, ' ').trim();

  // Try exact match first
  if (catalogStructure[brand] && catalogStructure[brand][model]) {
    console.log(`[v0] [${index}] ${product.name} (${brand}) - EXACT MATCH`);
    return {
      ...product,
      images: catalogStructure[brand][model]
    };
  }

  // Try to find variant match
  const baseModel = model
    .replace(/\s+(HAVANA|NEGRO|MARRON|AZUL|ROJO|VERDE|ROSA|BLANCO)$/i, '')
    .trim();

  if (variantMap[brand] && variantMap[brand][baseModel]) {
    const variants = variantMap[brand][baseModel];
    console.log(`[v0] [${index}] ${product.name} (${brand}) - VARIANT FOUND: ${variants.join(', ')}`);

    // For now, use first variant if images are empty
    if (product.images.length === 0 && variants.length > 0) {
      const firstVariant = variants[0];
      if (catalogStructure[brand][firstVariant]) {
        return {
          ...product,
          images: catalogStructure[brand][firstVariant],
          variants: variants.map(v => ({
            name: v.split(' ').pop(), // Extract color name
            model: v,
            images: catalogStructure[brand][v] || []
          }))
        };
      }
    }
  }

  if (product.images.length === 0) {
    console.log(`[v0] [${index}] ${product.name} (${brand}) - NO IMAGES FOUND`);
  }

  return product;
});

console.log('[v0] Writing updated products.json...');
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

console.log('[v0] Done! Products updated successfully.');
