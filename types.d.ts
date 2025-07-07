export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  status: boolean;
}

export interface Code {
  id: string;
  code: string;
  points: number;
  used: boolean;
}
