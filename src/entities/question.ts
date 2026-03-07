export interface Question {
  id: string;
  roomId: string;
  question: string;
  answer?: string | null;
  createdAt: string;
}
