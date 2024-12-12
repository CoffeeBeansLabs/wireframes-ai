import { signal } from '@preact/signals';
import type { Message } from '../types';

export const messages = signal<Message[]>([]);

export const addMessage = (role: Message['role'], content: string) => {
  messages.value = [...messages.value, { role, content }];
};