import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';

import fetshTasks from '@salesforce/apex/TodoListController.getTasks';

export default class TodoList extends LightningElement {

    newTask = '';
    @track tasks = [];
    error;
    tasksResponse;

    @wire(fetshTasks)
    wiredTasks(response) {
        this.tasksResponse = response;
        let data = response.data;
        let error = response.error;

        if (data) {
            this.error = undefined;
            this.tasks = [];
            data.forEach(task => {
                this.tasks.push({
                    Id: task.Id,
                    Subject: task.Subject
                });
            });
        } else if (error) {
            this.error = error;
            this.tasks = undefined;
        }
    }

    updateNewTask(event) {
        this.newTask = event.target.value;
    }

    addNewTasktoList() {
        this.tasks.push({
            Id: 11111,
            Subject: this.newTask
        });
        this.newTask = '';
    }

    deleteTaskFromList(event) {
        const idToDelete = event.target.name;
        this.tasks = this.tasks.filter(task => task .Id !== idToDelete);
    }

    refreshList() {
        refreshApex(this.tasksResponse);
    }

}