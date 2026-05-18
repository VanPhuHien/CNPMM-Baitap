require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/category');
const Product = require('../models/product');

const categories = [
    { name: 'Laptops', slug: 'laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853', description: 'Premium computing machines' },
    { name: 'Smartphones', slug: 'smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', description: 'Latest mobile technology' },
    { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf', description: 'Essential tech gear' }
];

const products = [
    {
        name: 'MacBook Pro M3 Max',
        slug: 'macbook-pro-m3-max',
        price: 3499,
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
            'https://images.unsplash.com/photo-1611186871348-b1ec696e5237'
        ],
        description: 'The most powerful MacBook ever.',
        categoryName: 'Laptops',
        stock: 15,
        soldCount: 120,
        isNewArrival: true,
        isBestSeller: true,
        specifications: { CPU: 'M3 Max', RAM: '64GB', SSD: '1TB' }
    },
    {
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        price: 999,
        images: [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
            'https://images.unsplash.com/photo-1592890288564-76628a30a657'
        ],
        description: 'Titanium design. Dynamic Island.',
        categoryName: 'Smartphones',
        stock: 50,
        soldCount: 500,
        isNewArrival: false,
        isBestSeller: true,
        specifications: { Screen: '6.1 inch', Chip: 'A17 Pro' }
    },
    {
        name: 'Mechanical Keyboard K3',
        slug: 'mechanical-keyboard-k3',
        price: 129,
        images: [
            'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'
        ],
        description: 'Compact 75% layout.',
        categoryName: 'Accessories',
        stock: 100,
        soldCount: 45,
        isNewArrival: true,
        isBestSeller: false,
        specifications: { Switch: 'Brown', RGB: 'Yes' }
    },
    {
        name: 'Dell XPS 15',
        slug: 'dell-xps-15',
        price: 1899,
        images: [
            'https://images.unsplash.com/photo-1593642632823-8f785ba67e45'
        ],
        description: 'InfinityEdge display.',
        categoryName: 'Laptops',
        stock: 10,
        soldCount: 30,
        isNewArrival: false,
        isBestSeller: false,
        specifications: { CPU: 'Intel i9', GPU: 'RTX 4060' }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('Connected to DB for seeding...');

        // Clear existing data
        await Category.deleteMany({});
        await Product.deleteMany({});

        // Seed Categories
        const createdCategories = await Category.insertMany(categories);
        console.log('Categories seeded.');

        // Map category names to IDs
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.name] = cat._id;
        });

        // Prepare products with category IDs
        const finalProducts = products.map(p => ({
            ...p,
            category: categoryMap[p.categoryName]
        }));

        // Seed Products
        await Product.insertMany(finalProducts);
        console.log('Products seeded.');

        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
