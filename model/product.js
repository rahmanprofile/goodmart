const sequalize = require('../config/confg');
const DataTypes = require('sequelize');


const products = sequalize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports = products;


// {
//     "product": {
//       "id": "12345",
//       "name": "Wireless Headphones",
//       "brand": "SoundMax",
//       "category": "Electronics",
//       "price": 89.99,
//       "original_price": 129.99,
//       "discount_percentage": 30,
//       "images": [
//         "https://example.com/images/headphone1.jpg",
//         "https://example.com/images/headphone2.jpg"
//       ],
//       "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
//       "specifications": {
//         "color": "Black",
//         "size": "Over-ear",
//         "material": "Plastic and Metal",
//         "weight": "250g",
//         "warranty": "1 year"
//       },
//       "quantity_available": 20,
//       "stock_status": "In Stock",
//       "seller": {
//         "name": "Tech World",
//         "rating": 4.6,
//         "reviews_count": 150
//       },
//       "ratings": {
//         "average_rating": 4.5,
//         "total_reviews": 542,
//         "breakdown": {
//           "5_star": 350,
//           "4_star": 120,
//           "3_star": 50,
//           "2_star": 15,
//           "1_star": 7
//         }
//       },
//       "delivery": {
//         "estimated_delivery_date": "2024-10-20",
//         "shipping_cost": 5.99,
//         "location_availability": ["USA", "Canada", "UK"]
//       },
//       "return_policy": "30-day return policy",
//       "similar_products": [
//         {
//           "id": "67890",
//           "name": "Bluetooth Earbuds",
//           "price": 49.99,
//           "image_url": "https://example.com/images/earbuds.jpg"
//         },
//         {
//           "id": "11121",
//           "name": "Noise-Cancelling Headphones",
//           "price": 119.99,
//           "image_url": "https://example.com/images/noise-cancel.jpg"
//         }
//       ],
//       "actions": {
//         "add_to_wishlist": true,
//         "add_to_cart": true,
//         "buy_now": true
//       }
//     }
//   }
  