import {
  PrebuildText,
  PrebuildQuestion,
} from './model';


export function filterQuestionMimics(
  texts: Record<number, PrebuildText>,
  question: PrebuildQuestion,
): Record<number, PrebuildText> {
  const result: Record<number, PrebuildText> = {};
  const pushText = (text_id: number) => {
    const text = texts[text_id];
    if (text) {
      result[text_id] = text;
    }
  };
  pushText(question.text.text_id);
  for (const answer of question.answers) {
    pushText(answer.text.text_id);
  }
  return result;
}
