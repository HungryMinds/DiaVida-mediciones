/* ••••••••••••••••••••••••••••••••••••••••••• */
/* ••         INTERFACE DEFINITION          •• */
/* ••••••••••••••••••••••••••••••••••••••••••• */
export type QuestionType = 'text' | 'number' | 'bool';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  active: boolean;
}
