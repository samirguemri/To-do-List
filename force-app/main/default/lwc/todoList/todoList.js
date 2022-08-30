import { LightningElement, track } from 'lwc';

export default class TodoList extends LightningElement {

    lastId = 0;
    newTask;

    @track
    tasks = [];

    updateNewTask(event) {
        this.newTask = event.target.value;
    }

    addNewTasktoList(event) {
        this.tasks.unshift({
            id: ++this.lastId,
            task: this.newTask
        });
        this.newTask = '';
    }

    deleteTaskFromList(event) {
        const idToDelete = event.target.name;
        this.tasks = this.tasks.filter(value => value.id !== idToDelete);
    }
}