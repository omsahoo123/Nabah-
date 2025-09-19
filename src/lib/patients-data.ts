export type Patient = {
  id: string;
  name: string;
  avatar: string;
  lastVisit: Date;
  diagnosis: string;
};

export const patients: Patient[] = [];
