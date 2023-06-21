type Assertiveness = 'polite' | 'assertive';

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

const announce = (message: string, assertiveness: Assertiveness = POLITE) => {
  const announcerInstance = createInstance();

  announcerInstance.assertiveness = assertiveness;
  announcerInstance.message = message;
};

const createInstance = (): HTMLLiveAnnouncerElement => {
  let announcerInstance = <HTMLLiveAnnouncerElement>document.querySelector('live-announcer');
  if (!announcerInstance) {
    announcerInstance = <HTMLLiveAnnouncerElement>document.createElement('live-announcer');
    document.body.prepend(announcerInstance);
  }

  return announcerInstance;
};

customElements.define('live-announcer', HTMLLiveAnnouncerElement);

export {
  announce,
  createInstance,
  POLITE,
  ASSERTIVE,
  HTMLLiveAnnouncerElement
};