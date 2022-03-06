# Simple Live Announcer

Announce messages for screen-readers using aria-live regions.

## Installation

Add a `.npmrc` file to your project root next to the package.json wiht the following contents:
```
@wellmann:registry=https://npm.pkg.github.com
```
Authentication to [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).

Or just add it to your dependencies like this:
```json
{
  "dependencies": {
    "@wellmann/simple-live-announcer": "github:wellmann/simple-live-announcer#v1.0.0"
  }
}
```

Requires the following CSS class to be present somewhere in the styles of your project:
```CSS
.screen-reader-text {
  border: 0;
  clip: rect(1px,1px,1px,1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  width: 1px;
  word-wrap: normal !important;
}
```

## Example

```js
import { announce } from '@wellmann/simple-live-announcer';

announce('I am a politely announced message.');
```