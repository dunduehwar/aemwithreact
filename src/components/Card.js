import React from 'react';
import { MapTo, withComponentMappingContext } from '@adobe/aem-react-editable-components';

/**
 * AEM Card Component with frontend annotations
 * 
 * @component Card
 * @description A reusable card component for displaying content with image, title, and description
 * @author AEM React Developer
 * @version 1.0.0
 * 
 * AEM Frontend Annotations for Card Component:
 * - Uses Core Components pattern for extensibility
 * - Includes proper data attributes for AEM authoring
 * - Supports responsive behavior through CSS classes
 * - Implements accessibility features with ARIA labels
 * 
 * @param {Object} props - Component properties
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description text
 * @param {string} props.image - Card image URL
 * @param {string} props.imageAlt - Image alt text for accessibility
 * @param {string} props.linkUrl - Card link URL
 * @param {string} props.linkText - Link text
 * @param {string} props.variant - Card style variant (default, featured, compact)
 * @param {string} props.cqPath - AEM component path
 */
const Card = ({
  title = 'Card Title',
  description = 'Card description goes here. This is sample content that can be edited in AEM.',
  image = '/content/dam/aemwithreact/card-placeholder.jpg',
  imageAlt = 'Card image',
  linkUrl = '#',
  linkText = 'Read More',
  variant = 'default',
  cqPath,
  ...otherProps
}) => {
  
  // Generate CSS classes based on variant
  const cardClasses = [
    'card-component',
    'aem-card',
    `aem-card--${variant}`,
    'cmp-card'
  ].join(' ');

  return (
    <article 
      className={cardClasses}
      data-cq-name="card"
      data-cq-component="aemwithreact/components/card"
      data-cq-dialog="/apps/aemwithreact/components/card/cq:dialog"
      data-cmp-is="card"
      data-cq-path={cqPath}
      data-cq-data-path={cqPath}
      data-cmp-variant={variant}
      aria-labelledby={`card-title-${cqPath?.replace(/[^a-zA-Z0-9]/g, '')}`}
      {...otherProps}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '350px',
        margin: '16px'
      }}
    >
      {/* AEM Image Component with annotations */}
      <div 
        className="card-image-container aem-image-wrapper"
        data-cq-name="cardImage"
        data-cq-component="core/wcm/components/image/v3/image"
        data-cq-dialog="/libs/core/wcm/components/image/v3/image/cq:dialog"
        data-cmp-is="image"
        data-cmp-hook-image="cardImage"
      >
        <img 
          src={image}
          alt={imageAlt}
          className="card-image aem-image cmp-image__image"
          data-cmp-hook-image="image"
          data-cmp-lazy="true"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Card Content Container */}
      <div 
        className="card-content aem-card-content"
        data-cq-name="cardContent"
        data-cmp-hook-card="content"
        style={{ padding: '16px' }}
      >
        {/* AEM Title Component with annotations */}
        <div 
          className="card-title-container"
          data-cq-name="cardTitle"
          data-cq-component="core/wcm/components/title/v3/title"
          data-cq-dialog="/libs/core/wcm/components/title/v3/title/cq:dialog"
          data-cmp-is="title"
          data-cmp-hook-title="cardTitle"
        >
          <h3 
            className="card-title aem-title cmp-title__text"
            id={`card-title-${cqPath?.replace(/[^a-zA-Z0-9]/g, '')}`}
            data-cmp-hook-title="text"
            style={{
              margin: '0 0 12px 0',
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#333'
            }}
          >
            {title}
          </h3>
        </div>

        {/* AEM Text Component for Description */}
        <div 
          className="card-description-container"
          data-cq-name="cardDescription"
          data-cq-component="core/wcm/components/text/v2/text"
          data-cq-dialog="/libs/core/wcm/components/text/v2/text/cq:dialog"
          data-cmp-is="text"
          data-cmp-hook-text="description"
        >
          <p 
            className="card-description aem-text cmp-text"
            data-cmp-hook-text="text"
            style={{
              margin: '0 0 16px 0',
              color: '#666',
              lineHeight: '1.5'
            }}
          >
            {description}
          </p>
        </div>

        {/* AEM Button Component for Card Link */}
        <div 
          className="card-link-container"
          data-cq-name="cardLink"
          data-cq-component="core/wcm/components/button/v2/button"
          data-cq-dialog="/libs/core/wcm/components/button/v2/button/cq:dialog"
          data-cmp-is="button"
          data-cmp-hook-button="cardLink"
        >
          <a 
            href={linkUrl}
            className="card-link aem-button cmp-button"
            data-cmp-clickable="true"
            data-cmp-hook-button="button"
            aria-describedby={`card-title-${cqPath?.replace(/[^a-zA-Z0-9]/g, '')}`}
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#007acc',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              transition: 'background-color 0.3s ease'
            }}
          >
            {linkText}
          </a>
        </div>
      </div>

      {/* AEM Authoring Helpers */}
      <div 
        className="aem-card-metadata"
        data-cmp-data-layer-enabled="true"
        data-cmp-data-layer="{
          'card-id': 'card-' + cqPath,
          'title': title,
          'description': description,
          'variant': variant
        }"
        style={{ display: 'none' }}
      >
        {/* Hidden metadata for AEM Analytics and targeting */}
      </div>
    </article>
  );
};

// AEM Component Configuration
Card.displayName = 'Card';

// Define edit configuration for AEM authoring
Card.editConfig = {
  isEmpty: function(props) {
    return !props || (!props.title && !props.description && !props.image);
  },
  
  // Define drop targets for AEM authoring
  dropTargets: {
    image: {
      accept: ['image/*'],
      groups: ['media'],
      propertyName: 'image'
    }
  }
};

// Map component to AEM resource type
MapTo('aemwithreact/components/card')(withComponentMappingContext(Card));

export default Card;
