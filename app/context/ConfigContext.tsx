"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SiteConfig {
    showCheckoutUrgency: boolean;
    checkoutUrgencyDuration: number; // in seconds
    checkoutUrgencyMessage: string;
    showSuccessUpsell: boolean;
    successUpsellDuration: number; // in seconds
    successUpsellTitle: string;
    upsellProducts: number[]; // Product IDs
}

const DEFAULT_CONFIG: SiteConfig = {
    showCheckoutUrgency: true,
    checkoutUrgencyDuration: 600, // 10 minutes
    checkoutUrgencyMessage: "Hurry up! Your cart is reserved for",
    showSuccessUpsell: true,
    successUpsellDuration: 600,
    successUpsellTitle: "Wait! One more thing before you go",
    upsellProducts: [1, 2, 3, 4]
};

interface ConfigContextType {
    config: SiteConfig;
    updateConfig: (newConfig: Partial<SiteConfig>) => void;
    resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

    useEffect(() => {
        const savedConfig = localStorage.getItem('site_config');
        if (savedConfig) {
            try {
                setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) });
            } catch (e) {
                console.error("Failed to parse site config", e);
            }
        }
    }, []);

    const updateConfig = (newConfig: Partial<SiteConfig>) => {
        const updated = { ...config, ...newConfig };
        setConfig(updated);
        localStorage.setItem('site_config', JSON.stringify(updated));
    };

    const resetConfig = () => {
        setConfig(DEFAULT_CONFIG);
        localStorage.removeItem('site_config');
    };

    return (
        <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
}
