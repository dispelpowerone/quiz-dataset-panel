import {
  Domain,
  PrebuildText,
  PrebuildQuestion,
  PrebuildTest,
} from './model';


//const endpoint = 'http://127.0.0.1:8000';
const endpoint = 'http://192.168.43.95:8000';

export function getImageUrl(image: string): string {
  return `${endpoint}/images/${domain}/${image}`;
}

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

export async function fetchDomains(): Promise<[Domain]> {
  return [
    {name: "on", description: "Ontario"},
    {name: "bc", description: "British Columbia"},
    {name: "ny", description: "New York"},
    {name: "ca", description: "California"},
    {name: "tx", description: "Texas"},
    {name: "fl", description: "Florida"},
  ];
}

export async function fetchTests(domainName: string): Promise<[PrebuildTest]> {
  return await fetchData('/tests/get', {
    domain: domainName,
  });
}

export async function fetchQuestions(domainName: string, testId: number): Promise<[PrebuildQuestion]> {
  console.assert(testId, `testId should be a number got ${testId}`);
  return await fetchData('/questions/get', {
    domain: domainName,
    test_id: testId,
  });
}

export async function updateText(domainName: string, text: PrebuildText): Promise<void> {
  console.assert(text !== undefined, `text argument should be defined`);
  await fetchData('/text/update', {
    domain: domainName,
    text: text,
  });
}

export async function updateQuestionImage(questionId: number, image: string): Promise<void> {
  console.assert(image !== undefined, `image argument should be defined`);
  await fetchData('/question/image/update', {
    question_id: questionId,
    image: image,
  });
}

export async function searchMimicTexts(domainName: string, testId: number): Promise<Record<number, PrebuildText>> {
  return await fetchData('/mimic_text/search', {
    domain: domainName,
    test_id: testId,
  });
}
