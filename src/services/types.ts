// Az interfész típusa
export interface APIResponse<T> {
  success: boolean;
  content: T;
  status?: number;
}
