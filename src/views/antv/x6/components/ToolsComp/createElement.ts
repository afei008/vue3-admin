/** @format */

import type { Data } from '../../config';
import avatar from '@/assets/images/avatar.png';

function createElement(data: Data[]) {
  const frag = document.createDocumentFragment();
  data.forEach((item) => {
    let el;
    if (item.shape === 'image') {
      el = document.createElement('img');
      el.src = item.img || avatar;
    } else {
      el = document.createElement('div');
    }
    const style = `
      position: absolute;
      background: ${item.fill};
      width: ${item.width}px;
      height: ${item.height}px;
      left: ${item.x}px;
      top: ${item.y}px;
      z-index: ${item.zIndex};
      border-radius: ${item.shape === 'circle' ? '50%' : 0};
      display: flex;
      align-items: ${item.alignItems};
      justify-content: ${item.justifyContent};
      font-size: ${item.fontSize};
      color: ${item.color};
      `;
    el.textContent = item.label;
    el.setAttribute('style', style);
    frag.appendChild(el);
  });

  return frag;
}

export default createElement;
