export type VoiceOption = Pick<
  SpeechSynthesisUtterance,
  "lang" | "pitch" | "rate" | "voice"
>;

export type Utterance = Pick<
  SpeechSynthesisUtterance,
  "lang" | "pitch" | "rate" | "voice" | "text"
>;

export type SpeakValue = string | string[] | Utterance[];