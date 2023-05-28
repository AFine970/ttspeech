import type { SpeakValue, VoiceOption } from "./type";

const controller = window?.speechSynthesis;

const DefaultOptions: VoiceOption = {
  lang: "zh-CN",
  pitch: 1,
  rate: 1,
  voice: null,
};

function speck(params: SpeakValue) {
  const uttr = initSpeechSynthesisUtterance(params);

  return new Promise<void>((resolve, reject) => {
    // @ts-expect-error
    uttr.onend?.(() => {
      resolve();
    });
    // @ts-expect-error
    uttr.onerror?.(() => {
      reject();
    });
    controller.speak(uttr);
  });
}

function initVoice(options: VoiceOption) {
  const voices = controller.getVoices();
  return voices.find((item) => item.lang === options.lang) ?? null;
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

export { speck };
