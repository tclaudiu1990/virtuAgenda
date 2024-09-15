// The structure of the data for any New Task Creation
// has less properties than TaskBoxInfo 

export type NewTaskInfo = {
    title: string;          // title of the task
    description: string;    // description of the task
    startDate: Date;        // the task start date
}