
export interface Question {
    id: string;
    text: string;
    placeholder: string;
}

export interface Answers {
    [questionId: string]: string;
}

export enum AppState {
    Welcome,
    Answering,
    Generating,
    Editing,
    Survey,
    Finished,
}
