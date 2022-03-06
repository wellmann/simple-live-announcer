type Assertiveness = 'polite' | 'assertive';

interface HTMLLiveAnnouncerElement extends HTMLElement {
  message: string;
  assertiveness: Assertiveness;
}

const POLITE = 'polite';
const ASSERTIVE = 'assertive';

const announce = (message: string, assertiveness: Assertiveness = POLITE) => {
  let announcerInstance = <HTMLLiveAnnouncerElement>document.querySelector('live-announcer');
  if (!announcerInstance) {
    announcerInstance = <HTMLLiveAnnouncerElement>document.createElement('live-announcer');
    document.body.prepend(announcerInstance);
  }

  announcerInstance.assertiveness = assertiveness;
  announcerInstance.message = message;
};

customElements.define('live-announcer', class extends HTMLElement {

  private _assertiveness: string;

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
});

export { announce, POLITE, ASSERTIVE };