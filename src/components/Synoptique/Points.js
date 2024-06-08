import { createRef } from 'react';

export default class Point {
  constructor({ position, color, type, content, parent }) {
    this.position = position;
    this.color = color;
    this.type = type;
    this.content = content;
    this.parent = parent;
    this.ref = createRef();
  }

  update() {
    if (this.parent.ref) {
      const height = this.parent.ref.current.offsetHeight;
      const width = this.parent.ref.current.offsetWidth;
      let calculedHeight = 0;
      let calculedWidth = 0;
      if (this.parent.height - height > this.parent.width - width) {
        calculedHeight = height;
        calculedWidth = (height / this.parent.height) * this.parent.width;
      } else {
        calculedWidth = width;
        calculedHeight = (width / this.parent.width) * this.parent.height;
      }
      const top = (calculedHeight / this.parent.height) * this.position.y;
      const left = (calculedWidth / this.parent.width) * this.position.x;
      this.ref.current.style.top = `${top}px`;
      this.ref.current.style.left = `${left}px`;
    }
  }

  movePoint(mouseX, mouseY) {
    const height = this.parent.ref.current.offsetHeight;
    const width = this.parent.ref.current.offsetWidth;
    let calculedHeight = 0;
    let calculedWidth = 0;
    if (this.parent.height - height > this.parent.width - width) {
      calculedHeight = height;
      calculedWidth = (height / this.parent.height) * this.parent.width;
    } else {
      calculedWidth = width;
      calculedHeight = (width / this.parent.width) * this.parent.height;
    }
    this.position.x = (this.parent.width / calculedWidth) * mouseX;
    this.position.y = (this.parent.height / calculedHeight) * mouseY;
  }
}
