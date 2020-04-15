  
  (() => {
    'use strict';

    // Retrieve template from current script's document owner.
    const doc = document.currentScript.ownerDocument;
    // const template = doc.querySelector('template#mm-action-button');
    const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
 display: block;
}
button {
 background-color: #0064fe;
 outline: none;
 box-shadow: none;
 border: none;
 padding: 5px 20px;
 color: #FFF;
 font-size: 14px;
 transition: all 0.3s cubic-bezier(.25,.8,.25,1);
 cursor: pointer;
}

button:hover {
 background-color: #002d72;
}

button.loading {
 background-color: #e1e1e1;
}
</style>
<button id="mm-action-button" loading=false>
Action Button
</button>`;
    class MmWebComponent extends HTMLElement {

      static get observedAttributes() {
        return ['loading'];
      }

      attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this[name] = value;
        }
      }

      constructor() {
        super();

        /**
         * @type {!Object}
         * @private
         */
        this._properties = {
          loading: "false"
        };
      }

      /** 
       * @property {boolean} loading
       */
      get loading() {
        return this._properties.loading;
      }

      set loading(val) {
        if (val !== this.loading) {
          this._properties.loading = val;
          this.setAttribute('loading', val);
          this._updateRendering();
        }
      }

      connectedCallback() {
        // Lazy creation of shadowRoot.
        if (!this.shadowRoot) {
          this.attachShadow({
            mode: 'open'
          }).appendChild(document.importNode(template.content, true));
        }
        this._updateRendering();
      }

      /**
       * @private
       */
      _updateRendering() {
        // Avoid rendering when not connected.
        if (this.shadowRoot && this.isConnected) {
          const button = this.shadowRoot.querySelector('button');
          button.textContent = this._properties.loading === "true" ? 'Loading' : 'Action Button';
          if(this._properties.loading === "true") {
            button.classList.add("loading");
          } else {
            button.classList.remove("loading");
          }
        }
      }
    }

    customElements.define('mm-action-button', MmWebComponent);
  })();