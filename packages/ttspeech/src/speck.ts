import type { SpeakValue, VoiceOption } from "./type";

const DefaultOptions: VoiceOption = {
  lang: "zh-CN",
  pitch: 1,
  rate: 1,
  voice: null,
};

function speck(params: SpeakValue) {
  errorHandle(params);

  const uttr = initSpeechSynthesisUtterance(params);

  return new Promise<boolean>((resolve, reject) => {
    uttr.onend = () => {
      resolve(true);
    };

    uttr.onerror = () => {
      reject(false);
    };
    window?.speechSynthesis?.speak(uttr);
  });
}

function initVoice(options: VoiceOption) {
  const voices = window?.speechSynthesis?.getVoices();
  return voices?.find((item) => item.lang === options.lang) ?? null;
}

/**
 * transform text to SpeechSynthesisUtterance instance
 */
function initSpeechSynthesisUtterance(params: SpeakValue) {
  const isUtterance = typeof params !== "string";
  const uttr = new window.SpeechSynthesisUtterance(
    isUtterance ? params.text : params
  );

  const userOptions = Object.assign(DefaultOptions, isUtterance ? params : {});
  const voice = initVoice(userOptions);
  userOptions.voice = voice;

  Object.assign(uttr, userOptions);

  return uttr;
}

function errorHandle(params: SpeakValue) {
  if (typeof window?.speechSynthesis === "undefined") {
    throw new Error("your browser does not support tts");
  }
  if (typeof params !== "string" || Array.isArray(params)) {
    throw new Error("please input valid value");
  }
}

export { speck };
