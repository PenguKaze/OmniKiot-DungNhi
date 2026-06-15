/**
 * Color utility functions for finding similar colors
 * Uses Euclidean distance in RGB color space
 */

/**
 * Parse hex color string to RGB object
 * @param {string} hex - Color in hex format (e.g., '#E8A0BF')
 * @returns {{ r: number, g: number, b: number }}
 */
export const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16),
  };
};

/**
 * Convert RGB to hex color string
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
export const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
};

/**
 * Calculate Euclidean distance between two colors in RGB space
 * Lower value = more similar colors
 * Range: 0 (identical) to ~441.67 (black vs white)
 * 
 * @param {string} hex1 - First color in hex
 * @param {string} hex2 - Second color in hex
 * @returns {number} Distance between colors (0-441.67)
 */
export const colorDistance = (hex1, hex2) => {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);

  // Weighted Euclidean distance (human eye is more sensitive to green)
  const rMean = (c1.r + c2.r) / 2;
  const dR = c1.r - c2.r;
  const dG = c1.g - c2.g;
  const dB = c1.b - c2.b;

  // Redmean color distance formula - more perceptually accurate
  const weightR = 2 + rMean / 256;
  const weightG = 4;
  const weightB = 2 + (255 - rMean) / 256;

  return Math.sqrt(weightR * dR * dR + weightG * dG * dG + weightB * dB * dB);
};

/**
 * Calculate similarity percentage between two colors
 * @param {string} hex1 
 * @param {string} hex2 
 * @returns {number} Similarity percentage (0-100)
 */
export const colorSimilarity = (hex1, hex2) => {
  const maxDistance = 764.8; // max possible with weighted formula
  const distance = colorDistance(hex1, hex2);
  return Math.max(0, Math.round((1 - distance / maxDistance) * 100));
};

/**
 * Sort products by color similarity to a target color
 * @param {Array} products - Array of product objects with 'color' field
 * @param {string} targetColor - Target color in hex format
 * @param {number} [threshold=60] - Minimum similarity % to include (0-100)
 * @returns {Array} Products sorted by similarity, with similarity score
 */
export const sortProductsByColorSimilarity = (products, targetColor, threshold = 40) => {
  return products
    .map(product => ({
      ...product,
      colorSimilarity: colorSimilarity(targetColor, product.color),
      colorDistance: colorDistance(targetColor, product.color),
    }))
    .filter(product => product.colorSimilarity >= threshold)
    .sort((a, b) => b.colorSimilarity - a.colorSimilarity);
};

/**
 * Get a readable label for similarity level
 * @param {number} similarity - Similarity percentage
 * @returns {string}
 */
export const getSimilarityLabel = (similarity) => {
  if (similarity >= 95) return 'Rất giống';
  if (similarity >= 85) return 'Giống';
  if (similarity >= 70) return 'Tương tự';
  if (similarity >= 55) return 'Gần giống';
  return 'Hơi giống';
};
