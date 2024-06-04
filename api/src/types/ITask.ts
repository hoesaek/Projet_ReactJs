interface ITask {
    id: number;
    taskName: string;
    description: string;
    user: number;
	status : string,
	isArchived : boolean;
}

export default ITask;