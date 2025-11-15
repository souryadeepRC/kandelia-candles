const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const sampleCandles = [
  {
    id: '1',
    name: 'Lavender Dreams',
    description: 'Calming lavender blend for peaceful evenings',
    basePrice: 499,
    image: '/images/Bubble_Candles.png?w=500&h=500&fit=crop',
    fragrances: [
      { id: 'lav-1', name: 'Pure Lavender', priceModifier: 0 },
      { id: 'lav-2', name: 'Lavender + Vanilla', priceModifier: 50 },
    ],
    tiers: [
      { minQty: 1, label: 'From 1 - 5 Units', pricePerUnit: 449 },
      { minQty: 6, label: 'From 6 - 12 Units', pricePerUnit: 399 },
      { minQty: 12, label: 'More than 12 Units', pricePerUnit: 349 },
    ],
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Rose Elegance',
    description: 'Premium rose fragrance for luxury spaces',
    basePrice: 599,
    image: '/images/Dazy_candles.png?w=500&h=500&fit=crop',
    fragrances: [
      { id: 'rose-1', name: 'Without Fragrance', priceModifier: 0 },
      { id: 'rose-2', name: 'Rose + Oud', priceModifier: 100 },
    ],
    tiers: [
      { minQty: 1, label: 'From 1 - 5 Units', pricePerUnit: 449 },
      { minQty: 6, label: 'From 6 - 12 Units', pricePerUnit: 399 },
      { minQty: 12, label: 'More than 12 Units', pricePerUnit: 349 },
    ],
    maxQty: 10,
    isBestseller: false,
  },
  {
    id: '3',
    name: 'Sandalwood Serenity',
    description: 'Traditional Indian sandalwood, aromatic and warm',
    basePrice: 699,
    image: '/images/Single_bubble_candle.png?w=500&h=500&fit=crop',
    fragrances: [
      { id: 'sand-1', name: 'Without Fragrance', priceModifier: 0 },
      { id: 'sand-2', name: 'Sandalwood + Jasmine', priceModifier: 75 },
    ],
    tiers: [
      { minQty: 1, label: 'From 1 - 5 Units', pricePerUnit: 449 },
      { minQty: 6, label: 'From 6 - 12 Units', pricePerUnit: 399 },
      { minQty: 12, label: 'More than 12 Units', pricePerUnit: 349 },
    ],
    isBestseller: true,
  },
  {
    id: '4',
    name: 'Mogra Magic',
    description: 'Sweet jasmine essence for romantic ambiance',
    basePrice: 549,
    image: '/images/Bubble_Candles.png?w=500&h=500&fit=crop',
    fragrances: [
      { id: 'mogra-1', name: 'Pure Mogra', priceModifier: 0 },
      { id: 'mogra-2', name: 'Mogra + Rose', priceModifier: 60 },
    ],
    tiers: [
      { minQty: 1, label: 'From 1 - 5 Units', pricePerUnit: 449 },
      { minQty: 6, label: 'From 6 - 12 Units', pricePerUnit: 399 },
      { minQty: 12, label: 'More than 12 Units', pricePerUnit: 349 },
    ],
    isBestseller: false,
  },
  {
    id: '5',
    name: 'Citrus Zest',
    description: 'Energizing citrus blend for fresh mornings',
    basePrice: 449,
    image: '/images/Dazy_candles.png?w=500&h=500&fit=crop',
    fragrances: [
      { id: 'citrus-1', name: 'Lemon + Orange', priceModifier: 0 },
      { id: 'citrus-2', name: 'Citrus + Mint', priceModifier: 40 },
    ],
    tiers: [
      { minQty: 1, label: 'From 1 - 5 Units', pricePerUnit: 399 },
      { minQty: 6, label: 'From 6 - 12 Units', pricePerUnit: 349 },
      { minQty: 12, label: 'More than 12 Units', pricePerUnit: 299 },
    ],
    isBestseller: true,
  },
  {
    id: '6',
    name: 'Vanilla Bliss',
    description: 'Creamy vanilla with hints of caramel',
    basePrice: 499,
    image: '/images/Single_bubble_candle.png?w=500&h=500&fit=crop',
    fragrances: [
      { id: 'van-1', name: 'Pure Vanilla', priceModifier: 0 },
      { id: 'van-2', name: 'Vanilla + Caramel', priceModifier: 55 },
    ],
    tiers: [
      { minQty: 1, label: 'From 1 - 5 Units', pricePerUnit: 449 },
      { minQty: 6, label: 'From 6 - 12 Units', pricePerUnit: 399 },
      { minQty: 12, label: 'More than 12 Units', pricePerUnit: 349 },
    ],
    isBestseller: false,
  },
];

async function seedDatabase() {
  let client;
  try {
    console.log('🔄 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db('kandelia-candles');
    const collection = db.collection('candles');

    // Drop existing collection
    console.log('🗑️ Clearing existing candles...');
    await collection.deleteMany({});

    // Insert sample data
    console.log('📝 Seeding candles...');
    const result = await collection.insertMany(sampleCandles);

    console.log(`✅ Successfully added ${result.insertedCount} candles to MongoDB!`);
    console.log(`📊 Inserted IDs: ${Object.values(result.insertedIds).join(', ')}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

seedDatabase();
