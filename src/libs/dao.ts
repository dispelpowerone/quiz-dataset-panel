import {
  PrebuildText,
  PrebuildQuestion,
  PrebuildTest,
} from './model';


//const endpoint = 'http://127.0.0.1:8000';
const endpoint = 'http://10.206.174.12:8000';

async function fetchData(path: string, args?): Promise {
  const requestOptions = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: args ? JSON.stringify(args) : '{}',
  };

  const response = await fetch(`${endpoint}${path}`, requestOptions);
  const data = await response.json();
  return data.payload;
}

export async function fetchTests(): Promise<[PrebuildTest]> {
  return fetchData('/tests/get');
}

export async function fetchQuestions(testId: number): Promise<[PrebuildQuestion]> {
  console.assert(testId, `testId should be a number got ${testId}`);
  return fetchData('/questions/get', {
    test_id: testId,
  });
}

export async function updateText(text: PrebuildText): Promise<void> {
  console.assert(text !== undefined, `text argument should be defined`);
  fetchData('/text/update', {
    text: text,
  });
}
