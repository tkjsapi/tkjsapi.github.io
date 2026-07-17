// customElement.js
function CustomElement(config) {
    const {
        name = 'CustomElement',
        parent = HTMLElement,
        tag = 'div',
        styles = {},
        attributes = {},
        methods = {},
        getters = {},
        setters = {},
        statics = {},
        lifecycle = {},
        observedAttributes = [],
        init = null,
        autoRegister = true
    } = config;

    const DynamicClass = class extends parent {
        constructor(master, ...args) {
            super();
            
            // 保存 master
            this._master = master || null;
            
            // 创建内部元素
            this._element = document.createElement(tag);
            
            // 应用样式
            if (Object.keys(styles).length > 0) {
                Object.assign(this._element.style, styles);
            }
            
            // 设置属性
            Object.entries(attributes).forEach(([key, value]) => {
                this._element.setAttribute(key, value);
            });
            
            // 将内部元素添加到自定义元素
            //this.appendChild(this._element);
            
            // 如果有 master，追加到 master
            if (this._master && this._master.appendChild) {
                this._master.appendChild(this._element);
            }
            
            // 执行初始化
            if (init) {
                init(this, master, ...args);
            }
            
            // 生命周期
            if (lifecycle.created) lifecycle.created.call(this);
        }

        // ====== 核心方法 ======
        getElement() {
            return this._element;
        }

        getDom() {
            return this._element;
        }

        getRoot() {
            return this;
        }

        getMaster() {
            return this._master;
        }

        setMaster(master) {
            if (this._master && this._master.removeChild) {
                this._master.removeChild(this);
            }
            this._master = master;
            if (master && master.appendChild) {
                master.appendChild(this);
            }
            return this;
        }

        // ====== appendChild ======
        appendChild(child) {
            if (typeof child === 'string') {
                const textNode = document.createTextNode(child);
                this._element.appendChild(textNode);
                return textNode;
            }
            
            if (Array.isArray(child)) {
                return child.map(item => this.appendChild(item));
            }
            
            if (child && typeof child.getElement === 'function') {
                this._element.appendChild(child.getElement());
                return child;
            }
            
            if (child instanceof HTMLElement) {
                this._element.appendChild(child);
                return child;
            }
            
            const textNode = document.createTextNode(String(child));
            this._element.appendChild(textNode);
            return textNode;
        }

        appendChildren(...children) {
            children.forEach(child => this.appendChild(child));
            return this;
        }

        // ====== 样式方法 ======
        setStyle(styles) {
            Object.assign(this._element.style, styles);
            return this;
        }

        getStyle(property) {
            return this._element.style[property];
        }

        // ====== 类方法 ======
        addClass(...classes) {
            this._element.classList.add(...classes);
            return this;
        }

        removeClass(...classes) {
            this._element.classList.remove(...classes);
            return this;
        }

        toggleClass(className) {
            this._element.classList.toggle(className);
            return this;
        }

        hasClass(className) {
            return this._element.classList.contains(className);
        }

        // ====== 属性方法 ======
        setAttribute(name, value) {
            this._element.setAttribute(name, value);
            return this;
        }

        getAttribute(name) {
            return this._element.getAttribute(name);
        }

        removeAttribute(name) {
            this._element.removeAttribute(name);
            return this;
        }

        // ====== 文本方法 ======
        setText(text) {
            this._element.textContent = text;
            return this;
        }

        getText() {
            return this._element.textContent;
        }

        setHTML(html) {
            this._element.innerHTML = html;
            return this;
        }

        getHTML() {
            return this._element.innerHTML;
        }

        // ====== 尺寸方法 ======
        setWidth(width) {
            if (typeof width === 'number') {
                this._element.style.width = width + 'px';
            } else {
                this._element.style.width = width;
            }
            return this;
        }

        setHeight(height) {
            if (typeof height === 'number') {
                this._element.style.height = height + 'px';
            } else {
                this._element.style.height = height;
            }
            return this;
        }

        setSize(width, height) {
            this.setWidth(width);
            this.setHeight(height);
            return this;
        }

        // ====== 显示控制 ======
        hide() {
            this._element.style.display = 'none';
            return this;
        }

        show() {
            this._element.style.display = '';
            return this;
        }

        toggle() {
            if (this._element.style.display === 'none') {
                this.show();
            } else {
                this.hide();
            }
            return this;
        }

        // ====== 事件处理 ======
        on(event, handler) {
            this._element.addEventListener(event, handler);
            return this;
        }

        off(event, handler) {
            this._element.removeEventListener(event, handler);
            return this;
        }

        trigger(event, detail = {}) {
            const evt = new CustomEvent(event, { detail });
            this._element.dispatchEvent(evt);
            return this;
        }

        // ====== 清空 ======
        clear() {
            this._element.innerHTML = '';
            return this;
        }

        // ====== 生命周期 ======
        connectedCallback() {
            if (lifecycle.connected) lifecycle.connected.call(this);
        }

        disconnectedCallback() {
            if (lifecycle.disconnected) lifecycle.disconnected.call(this);
        }

        attributeChangedCallback(name, oldVal, newVal) {
            if (lifecycle.attributeChanged) {
                lifecycle.attributeChanged.call(this, name, oldVal, newVal);
            }
        }
    };

    // ====== 添加自定义方法 ======
    Object.entries(methods).forEach(([key, fn]) => {
        DynamicClass.prototype[key] = fn;
    });

    // ====== 添加 getters ======
    Object.entries(getters).forEach(([key, fn]) => {
        Object.defineProperty(DynamicClass.prototype, key, {
            get: fn,
            configurable: true
        });
    });

    // ====== 添加 setters ======
    Object.entries(setters).forEach(([key, fn]) => {
        Object.defineProperty(DynamicClass.prototype, key, {
            set: fn,
            configurable: true
        });
    });

    // ====== 添加静态 ======
    Object.entries(statics).forEach(([key, value]) => {
        DynamicClass[key] = value;
    });

    if (observedAttributes.length > 0) {
        DynamicClass.observedAttributes = observedAttributes;
    }

    // ====== ★★★ 自动注册 ★★★ ======
    if (autoRegister && name) {
        if (!customElements.get(name)) {
            customElements.define(name, DynamicClass);
            console.log(`✅ 已注册自定义元素: <${name}>`);
        } else {
            console.warn(`⚠️ 元素 <${name}> 已经注册，跳过`);
        }
    }

    return DynamicClass;
}

// ====== 导出 ======
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomElement;
}