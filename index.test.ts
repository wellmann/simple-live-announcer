import {
  announce,
  createInstance,
  POLITE,
  ASSERTIVE,
  CLEAR_MESSAGE_TIMEOUT,
  INVISIBLE_CHARACTER,
  HTMLLiveAnnouncerElement
} from "./index";

test('prepend live announcer to body once', () => {
  const bodyContent = '<p>Lorem Ipsum</p>';
  document.body.innerHTML = bodyContent;
  announce('');
  announce('');
  announce('');

  expect(document.body.innerHTML).toEqual('<live-announcer class="screen-reader-text"><p aria-live="polite"></p><p aria-live="assertive"></p></live-announcer>' + bodyContent);
});

test('add default (polite) message', () => {
  const message = 'Lorem Ipsum';
  announce(message);

  setTimeout(() => expect(document.body.innerHTML).toContain(`<live-announcer class="screen-reader-text"><p aria-live="polite">${message}</p><p aria-live="assertive"></p></live-announcer>`), CLEAR_MESSAGE_TIMEOUT);
});

test('add polite message', () => {
  const message = 'Lorem Ipsum';
  announce(message, POLITE);

  setTimeout(() => expect(document.body.innerHTML).toContain(`<live-announcer class="screen-reader-text"><p aria-live="polite">${message}</p><p aria-live="assertive"></p></live-announcer>`), CLEAR_MESSAGE_TIMEOUT);
});

test('add assertive message', () => {
  const message = 'LOREM IPSUM';
  announce(message, ASSERTIVE);

  setTimeout(() => expect(document.body.innerHTML).toContain(`<live-announcer class="screen-reader-text"><p aria-live="polite"></p><p aria-live="assertive">${message}</p></live-announcer>`), CLEAR_MESSAGE_TIMEOUT);
});

test('clear previous message', () => {
  const prevMessage = 'Lorem Ipsum';
  const newMessage = 'Foo Bar';
  document.body.innerHTML = `<live-announcer class="screen-reader-text"><p aria-live="polite">${prevMessage}</p><p aria-live="assertive"></p></live-announcer>`;
  announce(newMessage);

  expect(document.body.innerHTML).toContain(`<live-announcer class="screen-reader-text"><p aria-live="polite"></p><p aria-live="assertive"></p></live-announcer>`);
  setTimeout(() => expect(document.body.innerHTML).toContain(`<live-announcer class="screen-reader-text"><p aria-live="polite">${newMessage}</p><p aria-live="assertive"></p></live-announcer>`), CLEAR_MESSAGE_TIMEOUT);
});

test('previous message + invisible character', () => {
  const announcerInstance = createInstance();
  const message = 'Lorem Ipsum';
  announce(message);
  setTimeout(() => expect(document.body.innerHTML).toContain(`<live-announcer class="screen-reader-text"><p aria-live="polite">${message}</p><p aria-live="assertive"></p></live-announcer>`), CLEAR_MESSAGE_TIMEOUT);
  announce(message);
  expect(announcerInstance['_previousMessage']).toEqual(message + INVISIBLE_CHARACTER);
});

test('custom element name', () => {
  customElements.define('kwio-live-announcer', class extends HTMLLiveAnnouncerElement {});
  document.body.innerHTML = '';
  announce('', POLITE, 'kwio-live-announcer');

  expect(document.body.innerHTML).toEqual('<kwio-live-announcer class="screen-reader-text"><p aria-live="polite"></p><p aria-live="assertive"></p></kwio-live-announcer>');
});