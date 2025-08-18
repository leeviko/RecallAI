'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { instructions, openai } from '@/lib/openai';
import { flashcardsSchema } from '@/lib/schemas/flashcards';

export async function generateDecks(prompt: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return { ok: false, msg: 'Unauthorized' };

  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    instructions: instructions,
    input: prompt,
  });

  const output = response.output_text;

  const validatedOutput = flashcardsSchema.safeParse(JSON.parse(output));

  if (!validatedOutput.success) {
    console.error('Invalid output:', validatedOutput.error);
    console.log(output);
    return { ok: false, msg: 'Failed to generate valid flashcards' };
  }

  console.log(validatedOutput.data);
  return { ok: true, data: validatedOutput.data };
}
