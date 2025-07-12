import React from 'react';
import { MapTo, withComponentMappingContext } from '@adobe/aem-react-editable-components';

/**
 * AEM Hero Component with comprehensive frontend annotations
 * 
 * @component Hero
 * @description A hero banner component for AEM pages with image, title, and CTA
 * @author AEM React Developer
 * @version 1.0.0
 * 
 * AEM Frontend Annotations Guide:
 * - data-cq-name: Unique component name for AEM authoring identification
 * - data-cq-component: Component resource type (matches Sling Model)
 * - data-cq-dialog: Path to component dialog configuration
 * - data-cmp-is: Component identifier for AEM Core Components framework
 * - data-cq-path: JCR path of the component instance
 * - data-cmp-hook-*: Hooks for component-specific functionality
 * - data-cq-data-path: Data path for component configuration
 * - cq:editConfig: Edit configuration for authoring behavior
 * 
 * @param {Object} props - Component properties from AEM
 * @param {string} props.title - Hero title text
 * @param {string} props.subtitle - Hero subtitle text
 * @param {string} props.backgroundImage - Background image URL
 * @param {string} props.ctaText - Call-to-action button text
 * @param {string} props.ctaLink - Call-to-action link URL
 * @param {string} props.cqPath - Component path in AEM
 */
const Hero = ({ 
  title = 'Welcome to AEM + React',
  subtitle = 'Build amazing experiences with Adobe Experience Manager',
  backgroundImage = '/content/dam/aemwithreact/hero-bg.jpg',
  ctaText = 'Get Started',
  ctaLink = '#',
  cqPath,
  ...otherProps 
}) => {
  
  // Check if component is being rendered in AEM author mode
  const isAuthorMode = typeof window !== 'undefined' && 
    window.Granite && window.Granite.author;

  return (
    <section 
      className="hero-component aem-hero"
      data-cq-name="hero"
      data-cq-component="aemwithreact/components/hero"
      data-cq-dialog="/apps/aemwithreact/components/hero/cq:dialog"
      data-cmp-is="hero"
      data-cq-path={cqPath}
      data-cq-data-path={cqPath}
      {...otherProps}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}
    >
      {/* Hero Content Container with AEM annotations */}
      <div 
        className="hero-content aem-hero-content"
        data-cq-name="heroContent"
        data-cmp-hook-hero="content"
      >
        {/* AEM Rich Text Editor Component for Title */}
        <div 
          className="hero-title-container"
          data-cq-name="heroTitle"
          data-cq-component="core/wcm/components/text/v2/text"
          data-cq-dialog="/libs/core/wcm/components/text/v2/text/cq:dialog"
          data-cmp-is="text"
          data-cmp-hook-text="title"
        >
          <h1 className="hero-title aem-text">
            {title}
          </h1>
        </div>

        {/* AEM Rich Text Editor Component for Subtitle */}
        <div 
          className="hero-subtitle-container"
          data-cq-name="heroSubtitle"
          data-cq-component="core/wcm/components/text/v2/text"
          data-cq-dialog="/libs/core/wcm/components/text/v2/text/cq:dialog"
          data-cmp-is="text"
          data-cmp-hook-text="subtitle"
        >
          <p className="hero-subtitle aem-text">
            {subtitle}
          </p>
        </div>

        {/* AEM Button Component for CTA */}
        <div 
          className="hero-cta-container"
          data-cq-name="heroCta"
          data-cq-component="core/wcm/components/button/v2/button"
          data-cq-dialog="/libs/core/wcm/components/button/v2/button/cq:dialog"
          data-cmp-is="button"
          data-cmp-hook-button="cta"
        >
          <a 
            href={ctaLink}
            className="hero-cta aem-button"
            data-cmp-clickable="true"
            style={{
              backgroundColor: '#007acc',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '4px',
              display: 'inline-block',
              marginTop: '20px'
            }}
          >
            {ctaText}
          </a>
        </div>
      </div>

      {/* AEM Author Mode Overlay for easier editing */}
      {isAuthorMode && (
        <div 
          className="aem-author-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            border: '2px dashed #007acc',
            background: 'rgba(0, 122, 204, 0.1)'
          }}
        >
          <span 
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: '#007acc',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              borderRadius: '3px'
            }}
          >
            Hero Component
          </span>
        </div>
      )}
    </section>
  );
};

// AEM Component Configuration
Hero.displayName = 'Hero';

// Define edit configuration for AEM authoring
Hero.editConfig = {
  isEmpty: function(props) {
    return !props || (!props.title && !props.subtitle);
  }
};

// Map component to AEM resource type
MapTo('aemwithreact/components/hero')(withComponentMappingContext(Hero));

export default Hero;
