import { CreateCardDto, GetCardsFilterDto, UpdateCardDto } from 'shared-types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCards({ tagName, status }: GetCardsFilterDto = {}) {
  const params = new URLSearchParams();
  if (tagName) params.append('tagName', tagName);
  if (status) params.append('status', status);

  const url = `${BASE_URL}/cards?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch cards');
  return res.json();
}

export async function getCardById(id: string) {
  const url = `${BASE_URL}/cards/${id}`;

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store', // trying to solve cache problem
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch card with is ${id}`);
  return res.json();
}

export async function getCardTagsByCardId(id: string) {
  const url = `${BASE_URL}/cards/${id}/tags`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch card with is ${id}`);
  return res.json();
}

export async function createCard(createCardDto: CreateCardDto) {
  const url = `${BASE_URL}/cards`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createCardDto),
  });

  if (!res.ok) throw new Error(`Failed to create card`);
  return res.json();
}

export async function updateCard(id: string, updateCardDto: UpdateCardDto) {
  const url = `${BASE_URL}/cards/${id}`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCardDto),
  });

  if (!res.ok) throw new Error(`Failed to fetch card with is ${id}`);
  return res.json();
}

export async function resetCardsStatus() {
  const url = BASE_URL + '/cards/reset-status';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!res.ok)
    throw new Error('Failed to update dismissed cards status to READY');
}

export async function deleteCard(id: string) {
  const url = `${BASE_URL}/cards/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete card with is ${id}`);
  return { success: true };
}

export async function getTags() {
  const url = `${BASE_URL}/tags`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch tags`);
  return res.json();
}

export async function deleteTagByName(name: string) {
  const url = `${BASE_URL}/tags/${name}`;
  const res = await fetch(url, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete tag with is ${name}`);
  return { success: true };
}

export async function generateNoteFromCodeWithAi(
  code: string,
): Promise<string> {
  const url = `${BASE_URL}/ai/generate-note`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) throw new Error(`Failed to fetch note with AI`);
    const note = await res.text();
    return note;
}
