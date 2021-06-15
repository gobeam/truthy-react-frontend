import { Parser as HtmlToReactParser } from 'html-to-react';
import DOMPurify from 'dompurify';
const allowedNodes = ['div', 'table', 'style', 'img'];

const styleObjToCSS = (styleObj) =>
  Object.keys(styleObj).reduce(
    (acum, style) =>
      (style && styleObj[style]
        ? `${style}:${styleObj[style]}; ${acum}`
        : ''
      ).trim(),
    '',
  );

const nodeAttributesToObj = (attrs) => {
  const objAttrs = { style: null };
  for (let i = attrs.length - 1; i >= 0; i = -1) {
    if (attrs[i].name !== 'style') {
      if (attrs[i].name && attrs[i].value) {
        objAttrs[attrs[i].name] = attrs[i].value;
      }
    } else {
      const stylesInText = attrs[i].value.split(';');
      const styles = stylesInText.reduce((acum, style) => {
        const components = style.split(':');
        if (components[0] && components[1]) {
          // eslint-disable-next-line no-param-reassign
          acum[components[0]] = `${components[1]}`;
        }
        return acum;
      }, {});
      objAttrs.style = styles;
    }
  }
  return objAttrs;
};

export function entityMapper(entity) {
  let { type } = entity;
  let data = { ...entity.data };

  if (type === 'IMAGE') {
    // added to support the existing image option in the editor
    type = 'IMG';
    data = { attributes: data, innerHTML: '' };
  }

  data.attributes = data.attributes ? data.attributes : {};
  let styleAsAttribute;
  if (data.attributes.style) {
    styleAsAttribute = styleObjToCSS(data.attributes.style);
  }

  const attributes = Object.keys(data.attributes).reduce(
    (acum, key) =>
      (key === 'style'
        ? `${key}="${styleAsAttribute}" ${acum}`
        : `${key}="${data.attributes[key]}" ${acum}`
      ).trim(),
    '',
  );

  const node = type.toLowerCase();
  if (allowedNodes.includes(node)) {
    return `<${node} ${attributes}>${data.innerHTML}</${node}>`;
  }
  return '';
}

export function entityMapperToComponent(entity) {
  const htmlToReactParser = new HtmlToReactParser();
  return () =>
    htmlToReactParser.parse(DOMPurify.sanitize(entityMapper(entity)));
}

export function customChunkRenderer(nodeName, node) {
  if (allowedNodes.includes(nodeName)) {
    let objAttrs = {};

    if (node.hasAttributes()) {
      objAttrs = nodeAttributesToObj(node.attributes);
    }

    return {
      type: nodeName.toString().toUpperCase(),
      mutability: 'MUTABLE',
      data: {
        // Pass whatever you want here (like id, or classList, etc.)
        innerText: node.innerText,
        innerHTML: node.innerHTML,
        attributes: objAttrs,
      },
    };
  }
  return null;
}
