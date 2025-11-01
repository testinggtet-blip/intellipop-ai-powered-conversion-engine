import { db } from '@/db';
import { popups } from '@/db/schema';

async function main() {
    const samplePopups = [
        {
            name: 'Welcome Discount - 10% Off',
            template: 'discount',
            headline: 'Welcome! Get 10% Off Your First Order',
            subheadline: 'Join our newsletter and receive an exclusive discount code',
            buttonText: 'Get My Discount',
            backgroundColor: '#6366f1',
            textColor: '#ffffff',
            buttonColor: '#ffffff',
            borderRadius: 16,
            showImage: true,
            showCloseButton: true,
            showOverlay: true,
            closeOnOutsideClick: false,
            animationEnabled: true,
            animationStyle: 'zoom',
            embedCode: '<script src="https://popups.example.com/embed/popup-1.js"></script>',
            isPublished: true,
            createdAt: new Date('2024-01-05').toISOString(),
            updatedAt: new Date('2024-01-05').toISOString(),
        },
        {
            name: 'Cart Reminder',
            template: 'cart-reminder',
            headline: "Don't Leave Empty Handed!",
            subheadline: 'Complete your purchase and get free shipping on orders over $50',
            buttonText: 'Complete My Order',
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            buttonColor: '#10b981',
            borderRadius: 12,
            showImage: true,
            showCloseButton: true,
            showOverlay: true,
            closeOnOutsideClick: true,
            animationEnabled: true,
            animationStyle: 'slide',
            embedCode: '<script src="https://popups.example.com/embed/popup-2.js"></script>',
            isPublished: true,
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
        },
        {
            name: 'Newsletter Subscription',
            template: 'newsletter',
            headline: 'Stay Updated with Our Latest Deals',
            subheadline: 'Subscribe to get exclusive offers and new product alerts',
            buttonText: 'Subscribe Now',
            backgroundColor: '#f3f4f6',
            textColor: '#111827',
            buttonColor: '#ef4444',
            borderRadius: 8,
            showImage: false,
            showCloseButton: true,
            showOverlay: true,
            closeOnOutsideClick: true,
            animationEnabled: true,
            animationStyle: 'fade',
            embedCode: null,
            isPublished: false,
            createdAt: new Date('2024-01-25').toISOString(),
            updatedAt: new Date('2024-01-25').toISOString(),
        },
    ];

    await db.insert(popups).values(samplePopups);
    
    console.log('✅ Popups seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});