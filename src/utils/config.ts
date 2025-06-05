/**
 * Environment configuration for the application
 * This file centralizes access to environment variables
 */

export const config = {
    // Site information
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://fleetblox.com',

    // API configuration
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || (
            process.env.NODE_ENV === 'production'
                ? 'https://api.fleetblox.com'
                : 'https://backend.illama360.com'
        ),
    },

    // Environment
    environment: process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',



    // Feature flags
    features: {
        debug: process.env.DEBUG === 'true',
        securityHeaders: process.env.NEXT_PUBLIC_SECURITY_HEADERS === 'true',
    },


};

export default config;
