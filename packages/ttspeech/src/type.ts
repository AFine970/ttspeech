export type VoiceOption = Partial<
  Pick<SpeechSynthesisUtterance, "lang" | "pitch" | "rate" | "voice" | "volume">
>;

export type Utterance = VoiceOption & Pick<SpeechSynthesisUtterance, "text">;

export type SpeakValue = string | Utterance;
