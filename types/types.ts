// export type JobsArray = JobInterface[];

export interface JobInterface {
  id: number;
  position: string;
  company: string;
  link: string;
  app_contact: string;
  double_down: DoubleDown;
  cover_letter: string;
  status: string;
  date_submitted: Date;
}

export interface DoubleDown {
  id: number;
  name: string;
  message: string;
  date: Date;
  contact_info: string;
  follow_up: boolean;
  follow_up_by: Date;
}
