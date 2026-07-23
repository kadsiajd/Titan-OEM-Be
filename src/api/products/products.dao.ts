import { Product } from './products.interface';

const products: Product[] = [
    {
        id: 'micro-motor-602a1',
        name: '602A',
        description: 'Precision micro motor designed for 2-hand analogue quartz movements.',
        categoryId: 'micro-motors',
        category: 'Micromotor',
        imageUrl: '/micromotor/602A.png',

        specificationSheetUrl: '/documents/602A-specification.pdf',
        technicalDrawingUrl: '/documents/602A-technical-drawing.pdf',

        overview: [
            {
                label: 'Size',
                value: '13.75x10.54 mm',
            },
            {
                label: 'Thickness',
                value: '2.600 mm',
            },
            {
                label: 'Function',
                value: '2 Hands',
            },
            {
                label: 'Direction',
                value: 'CW (Unidirectional)',
            },
            {
                label: 'No. of jewels',
                value: '2',
            },
        ],

        productDetails: [
            {
                section: 'Functions',
                fields: [
                    {
                        label: 'Functions',
                        value: '2 hands (independent control)',
                    },
                    {
                        label: 'Minute hand',
                        value: '2°',
                    },
                    {
                        label: 'Hour hand',
                        value: '1/6°',
                    },
                ],
            },
            {
                section: 'Rotation',
                fields: [
                    {
                        label: 'Angular rotation per pulse',
                        value: '2°',
                    },
                    {
                        label: 'No. of steps for 360° rotation',
                        value: '180',
                    },
                ],
            },
            {
                section: 'Performance',
                fields: [
                    {
                        label: 'Resistance',
                        value: '2.100 ±70 K ohms',
                    },
                    {
                        label: 'Temperature range',
                        value: '0 to +55°C',
                    },
                ],
            },
        ],
    },
    {
        id: 'micro-motor-602a',
        name: '602A',
        description: 'Precision micro motor designed for 2-hand analogue quartz movements.',
        categoryId: 'micro-motors',
        category: 'Micromotor',
        imageUrl: '/micromotor/602A.png',

        specificationSheetUrl: '/documents/602A-specification.pdf',
        technicalDrawingUrl: '/documents/602A-technical-drawing.pdf',

        overview: [
            {
                label: 'Size',
                value: '13.75x10.54 mm',
            },
            {
                label: 'Thickness',
                value: '2.600 mm',
            },
            {
                label: 'Function',
                value: '2 Hands',
            },
            {
                label: 'Direction',
                value: 'CW (Unidirectional)',
            },
            {
                label: 'No. of jewels',
                value: '2',
            },
        ],

        productDetails: [
            {
                section: 'Functions',
                fields: [
                    {
                        label: 'Functions',
                        value: '2 hands (independent control)',
                    },
                    {
                        label: 'Minute hand',
                        value: '2°',
                    },
                    {
                        label: 'Hour hand',
                        value: '1/6°',
                    },
                ],
            },
            {
                section: 'Rotation',
                fields: [
                    {
                        label: 'Angular rotation per pulse',
                        value: '2°',
                    },
                    {
                        label: 'No. of steps for 360° rotation',
                        value: '180',
                    },
                ],
            },
            {
                section: 'Performance',
                fields: [
                    {
                        label: 'Resistance',
                        value: '2.100 ±70 K ohms',
                    },
                    {
                        label: 'Temperature range',
                        value: '0 to +55°C',
                    },
                ],
            },
        ],
    },
    {
        id: '7A20S',
        name: '7A20S',
        description:
            'Automatic mechanical movement featuring a skeleton design, engineered for reliable performance and precision timekeeping.',
        categoryId: 'mechanical-movements',
        category: 'Mechanical',
        imageUrl: '/products/mechanical/7a20s.png',
        specificationSheetUrl: '/documents/mechanical/7a20s-specification.pdf',
        technicalDrawingUrl: '/documents/mechanical/7a20s-drawing.pdf',
        overview: [
            {
                label: 'Diameter',
                value: '13"',
            },
            {
                label: 'Thickness',
                value: '5.10 mm',
            },
            {
                label: 'Jewels',
                value: '22',
            },
            {
                label: 'Winding',
                value: 'Auto-winding',
            },
            {
                label: 'Movement Features',
                value: 'Skeleton',
            },
        ],
    },
    {
        id: '7AC0',
        name: '7AC0',
        description:
            'Automatic mechanical movement with an open-heart design at 6H, combining traditional mechanical engineering with distinctive visual detailing.',
        categoryId: 'mechanical-movements',
        category: 'Mechanical',
        imageUrl: '/products/mechanical/7ac0.png',
        specificationSheetUrl: '/documents/mechanical/7ac0-specification.pdf',
        technicalDrawingUrl: '/documents/mechanical/7ac0-drawing.pdf',
        overview: [
            {
                label: 'Diameter',
                value: '12"',
            },
            {
                label: 'Thickness',
                value: '5.10 mm',
            },
            {
                label: 'Jewels',
                value: '22',
            },
            {
                label: 'Winding',
                value: 'Auto-winding',
            },
            {
                label: 'Movement Features',
                value: 'Open heart @ 6H',
            },
        ],
    },
    {
        id: '7A21',
        name: '7A21',
        description:
            'Automatic mechanical movement featuring a practical date display through a window, designed for dependable everyday performance.',
        categoryId: 'mechanical-movements',
        category: 'Mechanical',
        imageUrl: '/products/mechanical/7a21.png',
        specificationSheetUrl: '/documents/mechanical/7a21-specification.pdf',
        technicalDrawingUrl: '/documents/mechanical/7a21-drawing.pdf',
        overview: [
            {
                label: 'Diameter',
                value: '12"',
            },
            {
                label: 'Thickness',
                value: '5.10 mm',
            },
            {
                label: 'Jewels',
                value: '23',
            },
            {
                label: 'Winding',
                value: 'Auto-winding',
            },
            {
                label: 'Movement Features',
                value: 'Date by window',
            },
        ],
    },
    {
        id: '7A28',
        name: '7A28',
        description:
            'Automatic mechanical movement with a sectorial day and date display, designed for sophisticated watch designs requiring enhanced calendar functionality.',
        categoryId: 'mechanical-movements',
        category: 'Mechanical',
        imageUrl: '/products/mechanical/7a28.png',
        specificationSheetUrl: '/documents/mechanical/7a28-specification.pdf',
        technicalDrawingUrl: '/documents/mechanical/7a28-drawing.pdf',
        overview: [
            {
                label: 'Diameter',
                value: '12"',
            },
            {
                label: 'Thickness',
                value: '5.40 mm',
            },
            {
                label: 'Jewels',
                value: '23',
            },
            {
                label: 'Winding',
                value: 'Auto-winding',
            },
            {
                label: 'Movement Features',
                value: 'Sectorial Day/Date',
            },
        ],
    },
    {
        id: '6130',
        name: '6130 3 Hands',
        description:
            'A compact and reliable quartz movement featuring a three-hand display, designed for accurate timekeeping and dependable long-term performance.',

        categoryId: 'quartz-movements',
        category: 'Quartz',
        imageUrl: '/products/quartz/6130.png',

        specificationSheetUrl:
            '/documents/quartz/6130-specification.pdf',

        technicalDrawingUrl:
            '/documents/quartz/6130-technical-drawing.pdf',

        overview: [
            {
                label: 'Size',
                value: "6 3/4 x 8'''",
            },
            {
                label: 'Thickness',
                value: '2.60 mm',
            },
            {
                label: 'Battery',
                value: 'SR621SW',
            },
            {
                label: 'Life',
                value: '36 M',
            },
        ],

        productDetails: [
            {
                section: 'Specifications',
                fields: [
                    {
                        label: 'Size',
                        value: "6 3/4 x 8'''",
                    },
                    {
                        label: 'Thickness',
                        value: '2.60 mm',
                    },
                    {
                        label: 'Battery',
                        value: 'SR621SW',
                    },
                    {
                        label: 'Life',
                        value: '36 M',
                    },
                    {
                        label: 'Function',
                        value: '3 Hands',
                    },
                ],
            },
        ],
    },

    {
        id: '6120',
        name: '6120 3 Hands Base',
        description:
            'A dependable three-hand base quartz movement offering a compact design, stable operation and efficient battery performance.',

        categoryId: 'quartz-movements',
        category: 'Quartz',
        imageUrl: '/products/quartz/6120.png',

        specificationSheetUrl:
            '/documents/quartz/6120-specification.pdf',

        technicalDrawingUrl:
            '/documents/quartz/6120-technical-drawing.pdf',

        overview: [
            {
                label: 'Size',
                value: "6 3/4 x 8'''",
            },
            {
                label: 'Thickness',
                value: '2.60 mm',
            },
            {
                label: 'Battery',
                value: 'SR621SW',
            },
            {
                label: 'Life',
                value: '36 M',
            },
        ],

        productDetails: [
            {
                section: 'Specifications',
                fields: [
                    {
                        label: 'Size',
                        value: "6 3/4 x 8'''",
                    },
                    {
                        label: 'Thickness',
                        value: '2.60 mm',
                    },
                    {
                        label: 'Battery',
                        value: 'SR621SW',
                    },
                    {
                        label: 'Life',
                        value: '36 M',
                    },
                    {
                        label: 'Function',
                        value: '3 Hands Base',
                    },
                ],
            },
        ],
    },

    {
        id: '7121',
        name: '7121 3 Hands + Date',
        description:
            'A precision quartz movement combining a three-hand display with a date function, engineered for reliable everyday watch applications.',

        categoryId: 'quartz-movements',
        category: 'Quartz',
        imageUrl: '/products/quartz/7121.png',

        specificationSheetUrl:
            '/documents/quartz/7121-specification.pdf',

        technicalDrawingUrl:
            '/documents/quartz/7121-technical-drawing.pdf',

        overview: [
            {
                label: 'Size',
                value: "10 1/2'''",
            },
            {
                label: 'Thickness',
                value: '3.10 mm',
            },
            {
                label: 'Battery',
                value: 'SR920SW',
            },
            {
                label: 'Life',
                value: '68 M',
            },
        ],

        productDetails: [
            {
                section: 'Specifications',
                fields: [
                    {
                        label: 'Size',
                        value: "10 1/2'''",
                    },
                    {
                        label: 'Thickness',
                        value: '3.10 mm',
                    },
                    {
                        label: 'Battery',
                        value: 'SR920SW',
                    },
                    {
                        label: 'Life',
                        value: '68 M',
                    },
                    {
                        label: 'Function',
                        value: '3 Hands + Date',
                    },
                ],
            },
        ],
    },

    {
        id: '7320',
        name: '7320 3 Hands',
        description:
            'A robust three-hand quartz movement designed for dependable timekeeping, extended battery life and versatile watch applications.',

        categoryId: 'quartz-movements',
        category: 'Quartz',
        imageUrl: '/products/quartz/7320.png',

        specificationSheetUrl:
            '/documents/quartz/7320-specification.pdf',

        technicalDrawingUrl:
            '/documents/quartz/7320-technical-drawing.pdf',

        overview: [
            {
                label: 'Size',
                value: "13'''",
            },
            {
                label: 'Thickness',
                value: '3.10 mm',
            },
            {
                label: 'Battery',
                value: 'SR920SW',
            },
            {
                label: 'Life',
                value: '68 M',
            },
        ],

        productDetails: [
            {
                section: 'Specifications',
                fields: [
                    {
                        label: 'Size',
                        value: "13'''",
                    },
                    {
                        label: 'Thickness',
                        value: '3.10 mm',
                    },
                    {
                        label: 'Battery',
                        value: 'SR920SW',
                    },
                    {
                        label: 'Life',
                        value: '68 M',
                    },
                    {
                        label: 'Function',
                        value: '3 Hands',
                    },
                ],
            },
        ],
    },

    {
        id: '7C01',
        name: '7C01 3 Hands + 1/1 Chrono + 24Hr',
        description:
            'A multifunction quartz movement featuring three hands, 1/1 chronograph functionality and a 24-hour display for advanced timekeeping applications.',

        categoryId: 'quartz-movements',
        category: 'Quartz',

        imageUrl: '/products/quartz/7c01.png',

        specificationSheetUrl:
            '/documents/quartz/7c01-specification.pdf',

        technicalDrawingUrl:
            '/documents/quartz/7c01-technical-drawing.pdf',

        overview: [
            {
                label: 'Size',
                value: "12 3/4'''",
            },
            {
                label: 'Thickness',
                value: '4.10 mm',
            },
            {
                label: 'Battery',
                value: 'SR920SW',
            },
            {
                label: 'Life',
                value: '36 M',
            },
        ],

        productDetails: [
            {
                section: 'Specifications',
                fields: [
                    {
                        label: 'Size',
                        value: "12 3/4'''",
                    },
                    {
                        label: 'Thickness',
                        value: '4.10 mm',
                    },
                    {
                        label: 'Battery',
                        value: 'SR920SW',
                    },
                    {
                        label: 'Life',
                        value: '36 M',
                    },
                    {
                        label: 'Function',
                        value: '3 Hands + 1/1 Chrono + 24Hr',
                    },
                ],
            },
        ],
    },


]
export const getProductsByCategory = async (
    category: string,
): Promise<Product[]> => {
    console.log('Fetching products for category:', category, products);
    return products.filter(
        (product) =>
            product.category ===
            category,
    );
};