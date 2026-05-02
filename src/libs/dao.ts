import {
  Domain,
  PrebuildText,
  PrebuildQuestion,
  PrebuildTest,
  ImageUploadStatus,
} from './model';

// Use local network endpoint
const endpoint = 'http://pi.local';
const urlPrefix = '/api';

export function getImageUrl(domainName: string, image: string): string {
  return `${endpoint}${urlPrefix}/images/${domainName}/${image}`;
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

  const response = await fetch(`${endpoint}${urlPrefix}/${path}`, requestOptions);
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
  return await fetchData('tests/get', {
    domain: domainName,
  });
}

export async function fetchQuestions(domainName: string, testId: number): Promise<[PrebuildQuestion]> {
  console.assert(testId, `testId should be a number got ${testId}`);
  return await fetchData('questions/get', {
    domain: domainName,
    test_id: testId,
  });
}

export async function updateText(domainName: string, text: PrebuildText): Promise<void> {
  console.assert(text !== undefined, `text argument should be defined`);
  await fetchData('text/update', {
    domain: domainName,
    text: text,
  });
}

export async function setQuestionImage(domainName: string, questionId: number, image: string): Promise<void> {
  console.assert(image !== undefined, `image argument should be defined`);
  await fetchData('question/image/set', {
    domain: domainName,
    question_id: questionId,
    image: image,
  });
}

export async function uploadQuestionImage(domainName: string, questionId: number, imageFile: File): Promise<ImageUploadStatus> {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("domain", domainName);
  formData.append("question_id", questionId);

  const requestOptions = {
    method: 'post',
    body: formData,
  };

  const response = await fetch(`${endpoint}${urlPrefix}/question/image/upload`, requestOptions);
  const data = await response.json();
  return data.payload;
}

export async function searchMimicTexts(domainName: string, testId: number): Promise<Record<number, PrebuildText>> {
  return await fetchData('mimic_text/search', {
    domain: domainName,
    test_id: testId,
  });
}
