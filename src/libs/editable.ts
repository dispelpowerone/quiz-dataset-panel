import {
  useRef,
} from 'react';
import cloneDeep from 'lodash/cloneDeep';


class Editable {
  constructor(data) {
    this.actual = data;
    this.mutable = cloneDeep(data);
  }

  commit() {
    this.actual = cloneDeep(this.mutable);
  }

  revert() {
    this.mutable = cloneDeep(this.actual);
  }
}

export function useEditable(data) {
  const ref = useRef(new Editable(data));
  return ref.current;
}
