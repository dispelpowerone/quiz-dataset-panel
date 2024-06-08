
export interface TextLocalizations {
  EN?: string
  FR?: string
  ZH?: string
  ES?: string
  RU?: string
  FA?: string
  PA?: string
  KO?: string
  PT?: string
}

export interface PrebuildText {
  text_id: number
  localizations: TextLocalizations
  original?: TextLocalizations
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
