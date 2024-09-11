// Structure of the data for new task creation
// has less properties than TaskBoxInfo

export type NewTaskInfo = {
    title: string;          // title of the task
    description: string;    // description of the task
    startDate: Date;        // the task start date
    deadline: Date;         // the tast deadline date
}