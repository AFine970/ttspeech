import type { SpeakValue, VoiceOption } from "./type";

const DefaultOptions: VoiceOption = {
  lang: "zh-CN",
  pitch: 1,
  rate: 1,
  voice: null,
  volume: 1,
};

async function speck(params: SpeakValue) {
  errorHandle(params);

  const uttr = await initSpeechSynthesisUtterance(params);

  return new Promise<boolean>((resolve, reject) => {
    uttr.onend = () => {
      resolve(true);
    };

    uttr.onerror = () => {
      reject(false);
    };
    window.speechSynthesis?.speak(uttr);
  });
}

async function initVoice(options: VoiceOption) {
  const voices = await getAllVoices();
  return voices?.find((item) => item.lang === options.lang) ?? null;
}

/**
 * transform text to SpeechSynthesisUtterance instance
 */
async function initSpeechSynthesisUtterance(params: SpeakValue) {
  const isUtterance = typeof params !== "string";
  const uttr = new window.SpeechSynthesisUtterance(
    isUtterance ? params.text : params
  );

  const userOptions = Object.assign(DefaultOptions, isUtterance ? params : {});
  const voice = await initVoice(userOptions);
  userOptions.voice = voice;

  Object.assign(uttr, userOptions);

  return uttr;
}

function errorHandle(params: SpeakValue) {
  if (typeof window.speechSynthesis === "undefined") {
    throw new Error("your browser does not support tts");
  }
  if (
    typeof params === "string" ||
    (typeof params === "object" && !Array.isArray(params) && params !== null)
  ) {
    return;
  }
  throw new Error("please input valid value");
}

function getAllVoices() {
  return new Promise<SpeechSynthesisVoice[]>((resolve, reject) => {
    const voices = getVoices();
    if (voices.length) {
      resolve(voices)
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = getVoices();
        resolve(voices);
      }
    }
  })
}

function getVoices() {
  return window.speechSynthesis?.getVoices() ?? [];
}

export { speck, getAllVoices };
