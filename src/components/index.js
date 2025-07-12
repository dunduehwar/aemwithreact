/**
 * AEM React Components Index
 * 
 * This file exports all AEM-enabled React components for easy import
 * and component mapping registration.
 * 
 * @author AEM React Developer
 * @version 1.0.0
 */

// Import all AEM components
import Hero from './Hero';
import Card from './Card';

// Export components for use in other parts of the application
export {
  Hero,
  Card
};

// Export default object containing all components
const ComponentsObject = {
  Hero,
  Card
};

export default ComponentsObject;

/**
 * AEM Component Registry
 * 
 * This object maps component names to their implementations
 * for dynamic component loading in AEM SPA Editor
 */
export const AEM_COMPONENTS = {
  'aemwithreact/components/hero': Hero,
  'aemwithreact/components/card': Card
};

/**
 * Component metadata for AEM authoring
 * Provides information about each component for the AEM editor
 */
export const COMPONENT_METADATA = {
  hero: {
    name: 'Hero',
    group: 'AEM with React - Content',
    description: 'Hero banner component with image, title, and call-to-action',
    icon: 'hero',
    editable: true,
    properties: ['title', 'subtitle', 'backgroundImage', 'ctaText', 'ctaLink']
  },
  card: {
    name: 'Card',
    group: 'AEM with React - Content',
    description: 'Reusable card component for displaying content',
    icon: 'card',
    editable: true,
    properties: ['title', 'description', 'image', 'imageAlt', 'linkUrl', 'linkText', 'variant']
  }
};
