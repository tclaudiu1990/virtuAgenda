// Structure of the data for each task box
// This is also the structure of the stored tasks

export type TaskBoxInfo = {
    id: number;                // unique id
    status: string;         // current status (creata, incurs, finalizata)
    title: string;          // title of the task
    description: string;    // description of the task
    startDate: Date;        // the task start date
    deadline: Date;         // the tast deadline date
}