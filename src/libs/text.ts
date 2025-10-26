import {
  useState,
  useCallback,
  useMemo,
} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { updateText } from '../libs/dao';
import { PrebuildText, PrebuildTextWarning, Language } from '../libs/model';


export interface TextState {
  actual: PrebuildText
  mutable: PrebuildText
  updateLocale: (lang: Language, content: string) => void
  updateWarning: (warning: PrebuildTextWarning) => void
  commitUpdates: () => Promise<void>
  rollbackUpdates: () => void
}

export function useTextState(text: PrebuildText): TextState {
  const [actual, setActual] = useState(cloneDeep(text));
  const [mutable, setMutable] = useState(cloneDeep(text));

  const updateLocale = useCallback((lang: Language, content: string) => {
    const updated = cloneDeep(mutable);
    if (updated.localizations[lang]) {
      updated.localizations[lang].content = content;
    }
    setMutable(updated);
  }, [mutable]);

  const updateWarning = useCallback((updatedWarning: PrebuildTextWarning) => {
    const updated = cloneDeep(mutable);
    updated.warnings = mutable.warnings.map((warning: PrebuildTextWarning) => {
      return warning.text_warning_id === updatedWarning.text_warning_id
        ? updatedWarning : warning;
    });
    setMutable(updated);
  }, [mutable]);

  const commitUpdates = useCallback(async () => {
    await updateText(mutable);
    setActual(mutable);
  }, [mutable]);

  const rollbackUpdates = useCallback(() => {
    setMutable(actual);
  }, [actual]);

  return useMemo(() => ({
    actual,
    mutable,
    updateLocale,
    updateWarning,
    commitUpdates,
    rollbackUpdates,
  }), [
    actual,
    mutable,
    updateLocale,
    updateWarning,
    commitUpdates,
    rollbackUpdates,
  ]);
}
