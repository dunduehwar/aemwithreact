import React from 'react';
import { MapTo, withComponentMappingContext } from '@adobe/aem-react-editable-components';

/**
 * AEM Title Component with frontend annotations
 * 
 * @component AEMTitle
 * @description A title component that integrates with AEM Core Components title
 * @author AEM React Developer
 * @version 1.0.0
 * 
 * AEM Frontend Annotations for Title Component:
 * - Matches AEM Core Components title structure
 * - Supports different heading levels (h1-h6)
 * - Includes link functionality
 * - Responsive styling
 * 
 * @param {Object} props - Component properties from AEM
 * @param {string} props.title - The title text
 * @param {string} props.type - Heading type (h1, h2, h3, h4, h5, h6)
 * @param {string} props.linkURL - Optional link URL
 * @param {string} props.linkText - Link text if different from title
 * @param {string} props.cqPath - AEM component path
 */
const AEMTitle = ({
  title = 'Default Title',
  type = 'h1',
  linkURL = '',
  linkText = '',
  cqPath,
  ...otherProps
}) => {
  
  // Determine the HTML tag based on type
  const HeadingTag = type || 'h1';
  
  // Generate styles based on heading type
  const getHeadingStyles = () => {
    const baseStyles = {
      margin: '0 0 16px 0',
      fontWeight: '600',
      lineHeight: '1.2',
      color: '#333'
    };
    
    switch (type) {
      case 'h1':
        return { ...baseStyles, fontSize: '2.5rem', marginBottom: '24px' };
      case 'h2':
        return { ...baseStyles, fontSize: '2rem', marginBottom: '20px' };
      case 'h3':
        return { ...baseStyles, fontSize: '1.5rem', marginBottom: '16px' };
      case 'h4':
        return { ...baseStyles, fontSize: '1.25rem', marginBottom: '12px' };
      case 'h5':
        return { ...baseStyles, fontSize: '1.125rem', marginBottom: '10px' };
      case 'h6':
        return { ...baseStyles, fontSize: '1rem', marginBottom: '8px' };
      default:
        return { ...baseStyles, fontSize: '2rem' };
    }
  };

  // Render title content
  const renderTitleContent = () => {
    if (linkURL) {
      return (
        <a 
          href={linkURL}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#007acc'}
          onMouseLeave={(e) => e.target.style.color = '#333'}
          data-cmp-clickable="true"
        >
          {linkText || title}
        </a>
      );
    }
    return title;
  };

  return (
    <div
      className="aem-title-component cmp-title"
      data-cq-name="title"
      data-cq-component="core/wcm/components/title/v3/title"
      data-cq-dialog="/libs/core/wcm/components/title/v3/title/cq:dialog"
      data-cmp-is="title"
      data-cq-path={cqPath}
      data-cq-data-path={cqPath}
      {...otherProps}
    >
      <HeadingTag 
        className={`aem-title cmp-title__text cmp-title__text--${type}`}
        style={getHeadingStyles()}
        data-cmp-hook-title="text"
      >
        {renderTitleContent()}
      </HeadingTag>
    </div>
  );
};

// AEM Component Configuration
AEMTitle.displayName = 'AEMTitle';

// Define edit configuration for AEM authoring
AEMTitle.editConfig = {
  isEmpty: function(props) {
    return !props || !props.title;
  }
};

// Map component to AEM resource types
MapTo('core/wcm/components/title/v3/title')(withComponentMappingContext(AEMTitle));
MapTo('myproject/components/title')(withComponentMappingContext(AEMTitle));

export default AEMTitle;
