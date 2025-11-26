/**
 * Mock Data for Restaurant Menu
 * Vietnamese dishes with English translations
 */

export interface MenuItem {
    id: number
    name: string
    description: string
    categoryId: string
    price: number
    image: string
    inStock: boolean
    rating: number
}

export interface Category {
    id: string
    label: string
}

// Categories
export const categoriesData = {
    vi: [
        { id: 'khai-vi', label: 'Khai vị' },
        { id: 'mon-chinh', label: 'Món chính' },
        { id: 'canh-sup', label: 'Canh & Súp' },
        { id: 'do-uong', label: 'Đồ uống' },
        { id: 'trang-mieng', label: 'Tráng miệng' },
    ],
    en: [
        { id: 'starters', label: 'Starters' },
        { id: 'mains', label: 'Mains' },
        { id: 'soups', label: 'Soups' },
        { id: 'drinks', label: 'Drinks' },
        { id: 'desserts', label: 'Desserts' },
    ]
}

// Vietnamese Menu Items
export const menuItemsData = {
    vi: [
        {
            id: 1,
            name: 'Phở Bò',
            description: 'Phở bò truyền thống với nước dùng hầm xương 12 tiếng, thịt bò tươi và rau thơm',
            categoryId: 'mon-chinh',
            price: 65000,
            image: 'https://bloganchoi.com/wp-content/uploads/2022/10/pho-bo-1.jpg',
            inStock: true,
            rating: 4.8
        },
        {
            id: 2,
            name: 'Bún Chả Hà Nội',
            description: 'Bún chả nướng than hoa, chả viên thơm ngon, nước mắm chua ngọt đậm đà',
            categoryId: 'mon-chinh',
            price: 55000,
            image: 'https://sunhouse.com.vn/pic/news/images/image-20211229181528-1.jpeg',
            inStock: true,
            rating: 4.9
        },
        {
            id: 3,
            name: 'Bánh Mì Thịt Nướng',
            description: 'Bánh mì giòn rụm với thịt nướng, pate, rau sống và đồ chua',
            categoryId: 'khai-vi',
            price: 25000,
            image: 'https://xebanhmithonhiky.com.vn/wp-content/uploads/2019/03/thanh-pham-banh-mi-thit-nuong-xa-xiu.jpg',
            inStock: true,
            rating: 4.7
        },
        {
            id: 4,
            name: 'Gỏi Cuốn Tôm Thịt',
            description: 'Gỏi cuốn tươi mát với tôm, thịt heo, bún và rau sống, chấm nước mắm me',
            categoryId: 'khai-vi',
            price: 35000,
            image: 'https://tse1.explicit.bing.net/th/id/OIP.ZIIfa8eyqVfl4MQNUegvFwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
            inStock: true,
            rating: 4.6
        },
        {
            id: 5,
            name: 'Cơm Tấm Sườn Bì Chả',
            description: 'Cơm tấm với sườn nướng, bì, chả trứng, mỡ hành và nước mắm đặc biệt',
            categoryId: 'mon-chinh',
            price: 60000,
            image: 'https://tse4.mm.bing.net/th/id/OIP.aj0eyRbbT9e7TStvshER7QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
            inStock: true,
            rating: 4.8
        },
        {
            id: 6,
            name: 'Bánh Xèo Miền Tây',
            description: 'Bánh xèo giòn tan với tôm, thịt, giá đỗ, ăn kèm rau sống và nước chấm',
            categoryId: 'mon-chinh',
            price: 50000,
            image: 'https://tse4.mm.bing.net/th/id/OIP.aj0eyRbbT9e7TStvshER7QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
            inStock: true,
            rating: 4.7
        },
        {
            id: 7,
            name: 'Bún Bò Huế',
            description: 'Bún bò Huế cay nồng với nước dùng sả, chả, giò heo và bò viên',
            categoryId: 'canh-sup',
            price: 65000,
            image: 'https://th.bing.com/th/id/R.c6c817887bdddd581d4551be12138d34?rik=Oh%2bj9v48qFkcOQ&riu=http%3a%2f%2fcdn.tgdd.vn%2fFiles%2f2018%2f04%2f01%2f1078873%2fnau-bun-bo-hue-cuc-de-tai-nha-tu-vien-gia-vi-co-san-202109161718049940.jpg&ehk=bDG8gWVVJTHHbeLyGZislhjCUd56rSDk4svccDEwI%2f8%3d&risl=&pid=ImgRaw&r=0',
            inStock: true,
            rating: 4.9
        },
        {
            id: 8,
            name: 'Hủ Tiếu Nam Vang',
            description: 'Hủ tiếu Nam Vang với tôm, thịt, gan, nước dùng ngọt thanh',
            categoryId: 'canh-sup',
            price: 55000,
            image: 'https://media.cooky.vn/recipe/g3/22522/s750x468/recipe22522-636439367069081450.jpg',
            inStock: true,
            rating: 4.6
        },
        {
            id: 9,
            name: 'Chả Giò Rế',
            description: 'Chả giò chiên giòn với nhân thịt, tôm, mộc nhĩ và rau củ',
            categoryId: 'khai-vi',
            price: 40000,
            image: 'https://trumfood.vn/wp-content/uploads/2022/12/cha-re-trumfood.jpg',
            inStock: true,
            rating: 4.5
        },
        {
            id: 10,
            name: 'Cà Phê Sữa Đá',
            description: 'Cà phê phin truyền thống pha với sữa đặc, uống với đá mát lạnh',
            categoryId: 'do-uong',
            price: 20000,
            image: 'https://tse3.mm.bing.net/th/id/OIP.0cTek1lyYwOXn7BtRjrCGAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
            inStock: true,
            rating: 4.8
        },
        {
            id: 11,
            name: 'Trà Đá Chanh',
            description: 'Trà đá chanh tươi mát, giải nhiệt ngày hè',
            categoryId: 'do-uong',
            price: 15000,
            image: 'https://th.bing.com/th/id/R.fa602f1220469271ded93e28ab02fdd9?rik=NwK6Kl%2fjFmMWyQ&riu=http%3a%2f%2fsupermarketitaly.com%2fcdn%2fshop%2fcollections%2fbeverages-sodas-255834.jpg%3fv%3d1611785735&ehk=RK1uXvsIgsrh3Xp3v2W9VZPxIYc3bT1MIXjHJg4eyQA%3d&risl=&pid=ImgRaw&r=0',
            inStock: true,
            rating: 4.4
        },
        {
            id: 12,
            name: 'Nước Mía',
            description: 'Nước mía tươi ép, ngọt mát tự nhiên',
            categoryId: 'do-uong',
            price: 18000,
            image: 'https://thuyanmart.vn/wp-content/uploads/2023/08/20230822165125.jpg',
            inStock: true,
            rating: 4.5
        },
        {
            id: 13,
            name: 'Chè Ba Màu',
            description: 'Chè ba màu với đậu đỏ, đậu xanh, thạch và nước cốt dừa',
            categoryId: 'trang-mieng',
            price: 25000,
            image: 'https://www.simplyrecipes.com/thmb/hGF_Oyd0R22nOGcKYpwp3nS_Pcg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Che-Ba-Mau-LEAD-2-c6162830ea634fa5ae0fab2d21276378.jpg',
            inStock: true,
            rating: 4.6
        },
        {
            id: 14,
            name: 'Xôi Xoài',
            description: 'Xôi nếp thơm với xoài tươi ngọt và nước cốt dừa béo ngậy',
            categoryId: 'trang-mieng',
            price: 30000,
            image: 'https://th.bing.com/th/id/R.6180c06db3425de63214c7ba3444eea5?rik=dmPmEXU212Yy9w&riu=http%3a%2f%2fcdn.tgdd.vn%2fFiles%2f2021%2f08%2f26%2f1377985%2fhoc-ngay-cach-lam-xoi-xoai-thai-lan-thom-ngon-beo-ngay-chuan-vi-202201210833102263.jpeg&ehk=SCxNjGhm7jz3aLs5EQutD7yzdMX1otMpOkRVH8PC7L4%3d&risl=&pid=ImgRaw&r=0',
            inStock: true,
            rating: 4.7
        },
        {
            id: 15,
            name: 'Bánh Flan',
            description: 'Bánh flan mềm mịn với caramel đắng ngọt hài hòa',
            categoryId: 'trang-mieng',
            price: 20000,
            image: 'https://atuankhang.vn/wp-content/uploads/2020/05/banh-flan.jpg',
            inStock: true,
            rating: 4.5
        }
    ],
    en: [
        {
            id: 1,
            name: 'Pho Bo (Vietnamese Beef Noodle Soup)',
            description: 'Traditional beef pho with 12-hour bone broth, fresh beef and herbs',
            categoryId: 'mains',
            price: 8.99,
            image: 'https://bloganchoi.com/wp-content/uploads/2022/10/pho-bo-1.jpg',
            inStock: true,
            rating: 4.8
        },
        {
            id: 2,
            name: 'Bun Cha Hanoi',
            description: 'Charcoal-grilled pork with rice noodles and sweet-sour fish sauce',
            categoryId: 'mains',
            price: 7.50,
            image: 'https://sunhouse.com.vn/pic/news/images/image-20211229181528-1.jpeg',
            inStock: true,
            rating: 4.9
        },
        {
            id: 3,
            name: 'Banh Mi (Vietnamese Baguette)',
            description: 'Crispy baguette with grilled pork, pate, vegetables and pickles',
            categoryId: 'starters',
            price: 3.50,
            image: 'https://xebanhmithonhiky.com.vn/wp-content/uploads/2019/03/thanh-pham-banh-mi-thit-nuong-xa-xiu.jpg',
            inStock: true,
            rating: 4.7
        },
        {
            id: 4,
            name: 'Goi Cuon (Fresh Spring Rolls)',
            description: 'Fresh spring rolls with shrimp, pork, vermicelli and herbs',
            categoryId: 'starters',
            price: 5.00,
            image: 'https://tse1.explicit.bing.net/th/id/OIP.ZIIfa8eyqVfl4MQNUegvFwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
            inStock: true,
            rating: 4.6
        },
        {
            id: 5,
            name: 'Com Tam Suon (Broken Rice with Pork Chop)',
            description: 'Broken rice with grilled pork chop, shredded pork skin and egg meatloaf',
            categoryId: 'mains',
            price: 8.50,
            image: 'https://th.bing.com/th/id/R.33197cc8c95d8da2a49e51ac1ab8396d?rik=xMlEalCE8r1Iaw&riu=http%3a%2f%2fwww.viquekitchen.com%2fwp-content%2fuploads%2f2022%2f05%2fBanh-xeo-Xeo-cake-Trans-scaled.jpg&ehk=srGo7HT4OM2lJKLck%2bRlUOrDH72JhBBQMjJxr0WdMLc%3d&risl=&pid=ImgRaw&r=0',
            inStock: true,
            rating: 4.8
        },
        {
            id: 6,
            name: 'Banh Xeo (Vietnamese Crepe)',
            description: 'Crispy crepe with shrimp, pork, bean sprouts and fresh herbs',
            categoryId: 'mains',
            price: 7.00,
            image: 'https://th.bing.com/th/id/R.33197cc8c95d8da2a49e51ac1ab8396d?rik=xMlEalCE8r1Iaw&riu=http%3a%2f%2fwww.viquekitchen.com%2fwp-content%2fuploads%2f2022%2f05%2fBanh-xeo-Xeo-cake-Trans-scaled.jpg&ehk=srGo7HT4OM2lJKLck%2bRlUOrDH72JhBBQMjJxr0WdMLc%3d&risl=&pid=ImgRaw&r=0',
            inStock: true,
            rating: 4.7
        },
        {
            id: 7,
            name: 'Bun Bo Hue (Hue Spicy Beef Noodle)',
            description: 'Spicy beef noodle soup with lemongrass, pork and beef balls',
            categoryId: 'soups',
            price: 8.99,
            image: 'https://th.bing.com/th/id/R.c6c817887bdddd581d4551be12138d34?rik=Oh%2bj9v48qFkcOQ&riu=http%3a%2f%2fcdn.tgdd.vn%2fFiles%2f2018%2f04%2f01%2f1078873%2fnau-bun-bo-hue-cuc-de-tai-nha-tu-vien-gia-vi-co-san-202109161718049940.jpg&ehk=bDG8gWVVJTHHbeLyGZislhjCUd56rSDk4svccDEwI%2f8%3d&risl=&pid=ImgRaw&r=0',
            inStock: true,
            rating: 4.9
        },
        {
            id: 8,
            name: 'Hu Tieu Nam Vang (Phnom Penh Noodle)',
            description: 'Clear noodle soup with shrimp, pork, liver and sweet broth',
            categoryId: 'soups',
            price: 7.50,
            image: 'https://media.cooky.vn/recipe/g3/22522/s750x468/recipe22522-636439367069081450.jpg',
            inStock: true,
            rating: 4.6
        },
        {
            id: 9,
            name: 'Cha Gio (Fried Spring Rolls)',
            description: 'Crispy fried spring rolls with pork, shrimp, mushroom and vegetables',
            categoryId: 'starters',
            price: 5.50,
            image: 'https://trumfood.vn/wp-content/uploads/2022/12/cha-re-trumfood.jpg',
            inStock: true,
            rating: 4.5
        },
        {
            id: 10,
            name: 'Ca Phe Sua Da (Vietnamese Iced Coffee)',
            description: 'Traditional drip coffee with condensed milk over ice',
            categoryId: 'drinks',
            price: 3.00,
            image: 'https://tse3.mm.bing.net/th/id/OIP.0cTek1lyYwOXn7BtRjrCGAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
            inStock: true,
            rating: 4.8
        },
        {
            id: 11,
            name: 'Tra Da Chanh (Iced Lemon Tea)',
            description: 'Refreshing iced tea with fresh lemon',
            categoryId: 'drinks',
            price: 2.00,
            image: 'https://th.bing.com/th/id/R.fa602f1220469271ded93e28ab02fdd9?rik=NwK6Kl%2fjFmMWyQ&riu=http%3a%2f%2fsupermarketitaly.com%2fcdn%2fshop%2fcollections%2fbeverages-sodas-255834.jpg%3fv%3d1611785735&ehk=RK1uXvsIgsrh3Xp3v2W9VZPxIYc3bT1MIXjHJg4eyQA%3d&risl=&pid=ImgRaw&r=0',
            inStock: true,
            rating: 4.4
        },
        {
            id: 12,
            name: 'Nuoc Mia (Sugarcane Juice)',
            description: 'Fresh pressed sugarcane juice, naturally sweet',
            categoryId: 'drinks',
            price: 2.50,
            image: 'https://thuyanmart.vn/wp-content/uploads/2023/08/20230822165125.jpg',
            inStock: true,
            rating: 4.5
        },
        {
            id: 13,
            name: 'Che Ba Mau (Three Color Dessert)',
            description: 'Layered dessert with red beans, mung beans, jelly and coconut milk',
            categoryId: 'desserts',
            price: 3.50,
            image: 'https://www.simplyrecipes.com/thmb/hGF_Oyd0R22nOGcKYpwp3nS_Pcg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Che-Ba-Mau-LEAD-2-c6162830ea634fa5ae0fab2d21276378.jpg',
            inStock: true,
            rating: 4.6
        },
        {
            id: 14,
            name: 'Xoi Xoai (Mango Sticky Rice)',
            description: 'Sweet sticky rice with fresh mango and rich coconut cream',
            categoryId: 'desserts',
            price: 4.50,
            image: 'https://th.bing.com/th/id/R.6180c06db3425de63214c7ba3444eea5?rik=dmPmEXU212Yy9w&riu=http%3a%2f%2fcdn.tgdd.vn%2fFiles%2f2021%2f08%2f26%2f1377985%2fhoc-ngay-cach-lam-xoi-xoai-thai-lan-thom-ngon-beo-ngay-chuan-vi-202201210833102263.jpeg&ehk=SCxNjGhm7jz3aLs5EQutD7yzdMX1otMpOkRVH8PC7L4%3d&risl=&pid=ImgRaw&r=0',
            inStock: true,
            rating: 4.7
        },
        {
            id: 15,
            name: 'Banh Flan (Vietnamese Creme Caramel)',
            description: 'Silky smooth flan with bittersweet caramel sauce',
            categoryId: 'desserts',
            price: 2.50,
            image: 'https://atuankhang.vn/wp-content/uploads/2020/05/banh-flan.jpg',
            inStock: true,
            rating: 4.5
        }
    ]
}

// Admin menu items (Vietnamese only, with status field)
export const adminMenuItems = [
    { id: 1, name: 'Phở Bò', category: 'Món chính', price: 65000, status: 'active' },
    { id: 2, name: 'Bún Chả Hà Nội', category: 'Món chính', price: 55000, status: 'active' },
    { id: 3, name: 'Bánh Mì Thịt Nướng', category: 'Khai vị', price: 25000, status: 'active' },
    { id: 4, name: 'Gỏi Cuốn Tôm Thịt', category: 'Khai vị', price: 35000, status: 'active' },
    { id: 5, name: 'Cơm Tấm Sườn Bì Chả', category: 'Món chính', price: 60000, status: 'active' },
    { id: 6, name: 'Bánh Xèo Miền Tây', category: 'Món chính', price: 50000, status: 'active' },
    { id: 7, name: 'Bún Bò Huế', category: 'Canh & Súp', price: 65000, status: 'active' },
    { id: 8, name: 'Hủ Tiếu Nam Vang', category: 'Canh & Súp', price: 55000, status: 'active' },
    { id: 9, name: 'Chả Giò Rế', category: 'Khai vị', price: 40000, status: 'active' },
    { id: 10, name: 'Cà Phê Sữa Đá', category: 'Đồ uống', price: 20000, status: 'active' },
    { id: 11, name: 'Trà Đá Chanh', category: 'Đồ uống', price: 15000, status: 'active' },
    { id: 12, name: 'Nước Mía', category: 'Đồ uống', price: 18000, status: 'active' },
    { id: 13, name: 'Chè Ba Màu', category: 'Tráng miệng', price: 25000, status: 'active' },
    { id: 14, name: 'Xôi Xoài', category: 'Tráng miệng', price: 30000, status: 'active' },
    { id: 15, name: 'Bánh Flan', category: 'Tráng miệng', price: 20000, status: 'active' },
]
