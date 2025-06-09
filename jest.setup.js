// jest.setup.js
import React from 'react';
import '@testing-library/jest-dom';
import 'jest-styled-components';

// Define htmlTags globally in this file so it's accessible to the final loop.
const htmlTags = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo',
  'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code',
  'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog',
  'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer',
  'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr',
  'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
  'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav',
  'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture',
  'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section',
  'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr',
  'track', 'u', 'ul', 'var', 'video', 'wbr',
  'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'path', 'pattern', 'polygon', 'polyline',
  'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'
];

jest.mock('styled-components', () => {
  const actualStyled = jest.requireActual('styled-components');

  const styled = (TargetComponentOrTag) => {
    const styleApplicationFn = (...styles) => {
      const MockComponent = React.forwardRef((props, ref) => {
        const mergedProps = { ...(styleApplicationFn.appliedAttrs || {}), ...props };
        if (typeof TargetComponentOrTag === 'string') {
          return React.createElement(TargetComponentOrTag, { ...mergedProps, ref });
        }
        return <TargetComponentOrTag {...mergedProps} ref={ref} />;
      });

      MockComponent.displayName = typeof TargetComponentOrTag === 'string'
        ? `styled.${TargetComponentOrTag}`
        : `styled(${TargetComponentOrTag.displayName || TargetComponentOrTag.name || 'Component'})`;

      MockComponent.toString = () => `.${MockComponent.displayName.replace(/[^a-zA-Z0-9-_]/g, '')}`;

      return MockComponent;
    };

    styleApplicationFn.attrs = (attrs) => {
      styleApplicationFn.appliedAttrs = typeof attrs === 'function' ? attrs({}) : attrs;
      return styleApplicationFn;
    };

    return styleApplicationFn;
  };

  Object.keys(actualStyled).forEach(key => {
    if (key !== 'default' && key !== 'defaultTags') {
      styled[key] = actualStyled[key];
    }
  });

  // Loop over htmlTags to set up styled.div, styled.input, etc.
  // This loop must be inside the jest.mock factory function.
  htmlTags.forEach(tag => {
    styled[tag] = styled(tag);
  });

  return styled;
});
