export type Language =
  | 'EN'
  | 'FR'
  | 'ZH'
  | 'ES'
  | 'RU'
  | 'FA'
  | 'PA'
  | 'PT';

export interface TextLocalizations {
  EN?: Language
  FR?: Language
  ZH?: Language
  ES?: Language
  RU?: Language
  FA?: Language
  PA?: Language
  PT?: Language
}

export interface PrebuildText {
  text_id: number
  localizations: TextLocalizations
  original?: TextLocalizations
  is_manually_checked: boolean
}

export interface PrebuildAnswer {
  text: PrebuildText
  is_right_answer: boolean
}

export interface PrebuildQuestion {
  test_id: number
  question_id: number
  text: PrebuildText
  answers: [PrebuildAnswer]
  image?: string
  audio?: string
}

export interface PrebuildTest {
  test_id: number
  title: PrebuildText
  position: number
}
