import type { SpeakValue, VoiceOption } from "./type";

const controller = window?.speechSynthesis;

const DefaultOptions: VoiceOption = {
  lang: "zh-CN",
  pitch: 1,
  rate: 1,
  voice: null,
};

function speck(params: SpeakValue) {
  if (Array.isArray(params)) {
  }
  const uttrs = initSpeechSynthesisUtterance(params);
  uttrs.forEach((uttr) => controller.speak(uttr));
}

function initVoice(options: VoiceOption) {
  const voices = controller.getVoices();
  return voices.find((item) => item.lang === options.lang) ?? null;
}

/**
 * transform text to SpeechSynthesisUtterance instance
 * @param params string | string[]
 * @returns SpeechSynthesisUtterance[]
 */
function initSpeechSynthesisUtterance(params: SpeakValue) {
  const texts = Array.isArray(params) ? params : [params];
  return texts.map((item) => {
    const isUtterance = typeof item !== "string";
    const uttr = new window.SpeechSynthesisUtterance(
      isUtterance ? item.text : item
    );

    const userOptions = Object.assign(DefaultOptions, isUtterance ? item : {});
    const voice = initVoice(userOptions);
    userOptions.voice = voice;

    Object.assign(uttr, userOptions);
    return uttr;
  });
}

export { speck };
