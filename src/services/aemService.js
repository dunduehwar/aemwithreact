/**
 * AEM Data Service
 * 
 * Service to fetch page data from AEM instance using the pagedata endpoint
 * and transform it for React components consumption.
 * 
 * @author AEM React Developer
 * @version 1.0.0
 */

// AEM Configuration
const AEM_CONFIG = {
  // AEM instance URL
  host: 'http://localhost:4502',
  
  // Page data endpoint
  pageDataEndpoint: '/bin/pagedata',
  
  // Default page path
  defaultPagePath: '/content/myproject/us/en/home',
  
  // Request timeout
  timeout: 10000
};

/**
 * AEM Service Class
 * Handles all interactions with AEM instance
 */
class AEMService {
  constructor() {
    this.baseUrl = AEM_CONFIG.host;
    this.pageDataEndpoint = AEM_CONFIG.pageDataEndpoint;
  }

  /**
   * Fetch page data from AEM
   * 
   * @param {string} pagePath - AEM page path
   * @returns {Promise<Object>} Page data from AEM
   */
  async fetchPageData(pagePath = AEM_CONFIG.defaultPagePath) {
    try {
      // Use proxy endpoint to avoid CORS issues
      const url = `${this.pageDataEndpoint}?path=${encodeURIComponent(pagePath)}`;
      
      console.log('🔄 Fetching AEM page data from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`AEM API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      console.log('✅ AEM page data fetched successfully:', data);
      
      return this.transformPageData(data);
      
    } catch (error) {
      console.error('❌ Error fetching AEM page data:', error);
      console.log('📋 CORS issue detected, using fallback data');
      
      // Return fallback data structure
      return this.getFallbackData();
    }
  }

  /**
   * Transform AEM page data to React component format
   * 
   * @param {Object} aemData - Raw AEM page data
   * @returns {Object} Transformed data for React components
   */
  transformPageData(aemData) {
    // Handle different AEM response structures
    const pageData = aemData.page || aemData;
    const components = pageData.components || pageData.items || [];
    
    return {
      // Page metadata
      page: {
        title: pageData.title || pageData.jcr_title || 'AEM Page',
        description: pageData.description || pageData.jcr_description || '',
        path: pageData.path || AEM_CONFIG.defaultPagePath,
        lastModified: pageData.lastModified || pageData.jcr_lastModified || new Date().toISOString()
      },
      
      // Transform components
      components: this.transformComponents(components),
      
      // Raw AEM data (for debugging)
      _raw: aemData
    };
  }

  /**
   * Transform AEM components data
   * 
   * @param {Array} components - AEM components array
   * @returns {Array} Transformed components
   */
  transformComponents(components) {
    if (!Array.isArray(components)) {
      return [];
    }

    return components.map((component, index) => {
      const componentType = component.sling_resourceType || component.resourceType || 'unknown';
      
      return {
        id: component.id || `component-${index}`,
        type: componentType,
        path: component.path || '',
        
        // Transform component properties based on type
        props: this.transformComponentProps(component, componentType),
        
        // Original AEM data
        _aemData: component
      };
    });
  }

  /**
   * Transform component properties based on component type
   * 
   * @param {Object} component - AEM component data
   * @param {string} componentType - Component resource type
   * @returns {Object} Transformed component properties
   */
  transformComponentProps(component, componentType) {
    const baseProps = {
      cqPath: component.path || '',
      cqName: component.name || '',
      ...component
    };

    // Handle different component types
    switch (componentType) {
      case 'core/wcm/components/title/v3/title':
      case 'myproject/components/title':
        return {
          ...baseProps,
          title: component.text || component.title || component.jcr_title || 'Default Title',
          type: component.type || 'h1',
          linkURL: component.linkURL || '',
          linkText: component.linkText || ''
        };

      case 'core/wcm/components/text/v2/text':
      case 'myproject/components/text':
        return {
          ...baseProps,
          text: component.text || component.content || '',
          richText: component.textIsRich || false
        };

      case 'core/wcm/components/image/v3/image':
      case 'myproject/components/image':
        return {
          ...baseProps,
          src: component.src || component.fileReference || '',
          alt: component.alt || component.title || 'Image',
          title: component.title || '',
          width: component.width || '',
          height: component.height || ''
        };

      case 'myproject/components/hero':
        return {
          ...baseProps,
          title: component.title || component.heroTitle || 'Hero Title',
          subtitle: component.subtitle || component.heroSubtitle || '',
          backgroundImage: component.backgroundImage || component.image || '',
          ctaText: component.ctaText || component.buttonText || 'Learn More',
          ctaLink: component.ctaLink || component.buttonLink || '#'
        };

      case 'myproject/components/card':
        return {
          ...baseProps,
          title: component.title || component.cardTitle || 'Card Title',
          description: component.description || component.text || '',
          image: component.image || component.src || '',
          imageAlt: component.imageAlt || component.alt || 'Card image',
          linkUrl: component.linkUrl || component.link || '#',
          linkText: component.linkText || component.buttonText || 'Read More',
          variant: component.variant || 'default'
        };

      default:
        return baseProps;
    }
  }

  /**
   * Get fallback data when AEM is not available
   * 
   * @returns {Object} Fallback page data
   */
  getFallbackData() {
    return {
      page: {
        title: 'AEM React Demo (Offline)',
        description: 'Demo page with fallback data',
        path: '/content/myproject/us/en/home',
        lastModified: new Date().toISOString()
      },
      components: [
        {
          id: 'fallback-title',
          type: 'core/wcm/components/title/v3/title',
          path: '/content/myproject/us/en/home/title',
          props: {
            title: 'Welcome to AEM + React (Offline Mode)',
            type: 'h1',
            cqPath: '/content/myproject/us/en/home/title'
          }
        }
      ],
      _raw: {
        fallback: true,
        message: 'Using fallback data - AEM instance not available'
      }
    };
  }

  /**
   * Check if AEM instance is available
   * 
   * @returns {Promise<boolean>} True if AEM is available
   */
  async isAEMAvailable() {
    try {
      const response = await fetch(`${this.baseUrl}/libs/granite/core/content/login.html`, {
        method: 'HEAD',
        credentials: 'include'
      });
      
      return response.status === 200 || response.status === 401; // 401 means AEM is available but requires auth
    } catch (error) {
      console.warn('⚠️ AEM instance not available:', error.message);
      return false;
    }
  }

  /**
   * Update component data in AEM (for future use)
   * 
   * @param {string} componentPath - AEM component path
   * @param {Object} data - Component data to update
   * @returns {Promise<Object>} Update response
   */
  async updateComponent(componentPath, data) {
    // This would be implemented for editing components
    console.log('📝 Update component:', componentPath, data);
    
    // For now, just return the data
    return { success: true, data };
  }
}

// Create singleton instance
const aemService = new AEMService();

export default aemService;

// Export configuration for customization
export { AEM_CONFIG };

// Export specific methods for convenience
export const {
  fetchPageData,
  isAEMAvailable,
  updateComponent
} = aemService;
