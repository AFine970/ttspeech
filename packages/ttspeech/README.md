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

## Demo

```bash
git clone https://github.com/AFine970/ttspeech.git

pnpm install

cd /packages/example && pnpm dev
```

![iShot_2023-06-03_20.22.07.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebc5198af69c4e129bb4fc6e0a02021f~tplv-k3u1fbpfcp-watermark.image?)