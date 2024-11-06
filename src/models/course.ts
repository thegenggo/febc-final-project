export interface Course {
    id: number;
    name: string;
    description: string;
    category: string;
    lectures?: Lecture[];
}

export interface Lecture {
    name: string;
    time: number;
    isViewed?: boolean;
}

export interface CourseLectures {
    [courseId: number]: Lecture[]
}