const fs = require('fs');
const path = require('path');

// ============================================
// UPDATE THE FILENAME BELOW
// ============================================
const DATA_FILE = 'books.json';  // <-- Change to your filename!
// ============================================

const filePath = path.resolve('C:/Users/91901/Documents/GitHub/BurzahomArchives/data', DATA_FILE);
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`Loaded ${data.length} items from ${DATA_FILE}\n`);

function deduplicateItems(items) {
  const seen = new Map();
  const uniqueItems = [];
  const forManualReview = [];

  items.forEach((item, index) => {
    const title = item.title?.toLowerCase().trim() || '';
    const author = item.author?.toLowerCase().trim() || '';

    if (!title || !author) {
      forManualReview.push({ reason: 'Missing title or author', index, item });
      return;
    }

    const key = `${title}---${author}`;

    if (seen.has(key)) {
      const existing = seen.get(key);
      const isDifferent = Object.keys(item).some(field => {
        if (field === 'title' || field === 'author') return false;
        return JSON.stringify(item[field]) !== JSON.stringify(existing.item[field]);
      });

      if (isDifferent) {
        forManualReview.push({
          reason: 'Same title/author but different content',
          index,
          item,
          conflictsWith: existing
        });
      } else {
        console.log(`Removing: "${item.title}" by ${item.author}`);
      }
    } else {
      seen.set(key, { item, index });
      uniqueItems.push(item);
    }
  });

  return { uniqueItems, forManualReview };
}

const result = deduplicateItems(data);

console.log('\n=== STATS ===');
console.log(`Original: ${data.length}`);
console.log(`Unique: ${result.uniqueItems.length}`);
console.log(`Removed: ${data.length - result.uniqueItems.length - result.forManualReview.length}`);
console.log(`Needs review: ${result.forManualReview.length}`);

if (result.forManualReview.length > 0) {
  console.log('\n=== NEEDS MANUAL REVIEW ===');
  result.forManualReview.forEach((r, i) => {
    console.log(`\n[${i + 1}] ${r.reason}`);
    console.log(JSON.stringify(r.item, null, 2));
  });
}

// Save cleaned file
const outputPath = path.resolve('C:/Users/91901/Documents/GitHub/BurzahomArchives/data', DATA_FILE.replace('.json', '-cleaned.json'));
fs.writeFileSync(outputPath, JSON.stringify(result.uniqueItems, null, 2));
console.log(`\nSaved to: ${outputPath}`);