# ttspeech

A `Promise` tts api, it depend on browser api `window.speechSynthesis`;

## Install

you can install package in your dependencies

```bash
yarn add ttspeech
# or
pnpm add ttspeech
```

## Usage

### 1. Simple usage

```ts
import { speck } from "ttspeech";

speck("hello world!");

// you can hear "hello world!"
```

### 2. Promise usage

```ts
import { speck } from "ttspeech";

(async () => {
  await speck("hello world!");
  window.alert("speech end~");
})();
```
