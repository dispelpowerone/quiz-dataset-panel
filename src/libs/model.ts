export type Language =
  | 'EN'
  | 'FR'
  | 'ZH'
  | 'ES'
  | 'RU'
  | 'FA'
  | 'PA'
  | 'PT';

export interface TextLocalization {
  content: string
  text_localization_id?: number
}

export interface TextLocalizations {
  EN?: TextLocalization
  FR?: TextLocalization
  ZH?: TextLocalization
  ES?: TextLocalization
  RU?: TextLocalization
  FA?: TextLocalization
  PA?: TextLocalization
  PT?: TextLocalization
}

export interface PrebuildTextWarning {
  text_warning_id: number
  text_id: number
  text_localization_id: number
  code: string
  content: string
  is_manually_checked: boolean
}

export interface PrebuildText {
  text_id: number
  localizations: TextLocalizations
  original?: TextLocalizations
  warnings: [PrebuildTextWarning]
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
  comment_text?: PrebuildText
}

export interface PrebuildTest {
  test_id: number
  title: PrebuildText
  position: number
}
