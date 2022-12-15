// Generated by https://quicktype.io

export interface ICategoryOfLessons {
  title: string;
  lessons: ILesson[];
}

export interface ILesson {
  _id: ID;
  title: string;
  description: string;
  example_video: string;
}

export interface ILessonRes {
  _id: ID;
  title: string;
  description: string;
  example_video: string;
  category_name: string;
}

export interface ID {
  $oid: string;
}