import { LightningElement, track } from 'lwc';

export default class TodoList extends LightningElement {

    lastId = 0;
    newTask;

    @track
    tasks = [];

    onChangeAddNewTaskInput(event) {
        this.newTask = event.target.value;
    }

    onClickAddNewTaskButton(event) {
        this.tasks.unshift({
            id: ++this.lastId,
            task: this.newTask
        });
        this.newTask = '';
    }
}