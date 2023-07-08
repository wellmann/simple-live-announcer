type Assertiveness = 'polite' | 'assertive';

const TAG_NAME = 'live-announcer';
const POLITE = 'polite';
const ASSERTIVE = 'assertive';

class HTMLLiveAnnouncerElement extends HTMLElement {

  private _assertiveness: Assertiveness;

  connectedCallback() {
    this.className = 'screen-reader-text';
    this.innerHTML = '<p aria-live="polite"></p><p aria-live="assertive"></p>';
  }

  set assertiveness(assertiveness: Assertiveness) {
    this._assertiveness = assertiveness;
  }

  set message(message: string) {
    const ariaLiveElement = <HTMLParagraphElement>this.querySelector(`p[aria-live="${this._assertiveness}"]`);
    ariaLiveElement.innerText = '';

    setTimeout(() => ariaLiveElement.innerText = message, 50);
  }
}

const announce = (message: string, assertiveness: Assertiveness = POLITE, elementName: string | null = null) => {
  const announcerInstance = createInstance(elementName);

  announcerInstance.assertiveness = assertiveness;
  announcerInstance.message = message;
};

const createInstance = (elementName: string | null): HTMLLiveAnnouncerElement => {
  let announcerInstance = <HTMLLiveAnnouncerElement>document.querySelector(elementName || TAG_NAME);
  if (!announcerInstance) {
    announcerInstance = <HTMLLiveAnnouncerElement>document.createElement(elementName || TAG_NAME);
    document.body.prepend(announcerInstance);
  }

  return announcerInstance;
};

customElements.define(TAG_NAME, HTMLLiveAnnouncerElement);

export {
  announce,
  createInstance,
  POLITE,
  ASSERTIVE,
  HTMLLiveAnnouncerElement,
  Assertiveness
};