type Assertiveness = 'polite' | 'assertive';

const TAG_NAME = 'live-announcer';
const POLITE = 'polite';
const ASSERTIVE = 'assertive';
const CLEAR_MESSAGE_TIMEOUT = 100;
const INVISIBLE_CHARACTER = '\u00A0';

class HTMLLiveAnnouncerElement extends HTMLElement {

  private _assertiveness: Assertiveness;

  private _previousMessage: string;

  connectedCallback() {
    this.className = 'screen-reader-text';
    this.innerHTML = '<p aria-live="polite"></p><p aria-live="assertive"></p>';
  }

  set assertiveness(assertiveness: Assertiveness) {
    this._assertiveness = assertiveness;
  }

  set message(message: string) {
    const ariaLiveElement = <HTMLParagraphElement>this.querySelector(`p[aria-live="${this._assertiveness}"]`);
    ariaLiveElement.textContent = ''; // Clear to announce repeated messages.

    if (this._previousMessage === message) {
      message += INVISIBLE_CHARACTER; // Add non-breaking space invisble character, since VoiceOver doesn't announce repeated messages otherwise.
    }

    this._previousMessage = message;

    setTimeout(() => ariaLiveElement.textContent = message, CLEAR_MESSAGE_TIMEOUT);
  }
}

const announce = (message: string, assertiveness: Assertiveness = POLITE, elementName = '') => {
  const announcerInstance = createInstance(elementName);

  announcerInstance.assertiveness = assertiveness;
  announcerInstance.message = message;
};

const createInstance = (elementName = ''): HTMLLiveAnnouncerElement => {
  const tagName = elementName.length ? elementName : TAG_NAME;
  let announcerInstance = <HTMLLiveAnnouncerElement>document.querySelector(tagName);
  if (!announcerInstance) {
    announcerInstance = <HTMLLiveAnnouncerElement>document.createElement(tagName);
    document.body.prepend(announcerInstance);
  }

  return announcerInstance;
};

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, HTMLLiveAnnouncerElement);
}

export {
  announce,
  createInstance,
  POLITE,
  ASSERTIVE,
  CLEAR_MESSAGE_TIMEOUT,
  INVISIBLE_CHARACTER,
  HTMLLiveAnnouncerElement,
  Assertiveness
};
