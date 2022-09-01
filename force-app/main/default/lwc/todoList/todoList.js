import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';

import getTasks from '@salesforce/apex/TodoListController.getTasks';
import insertTask from '@salesforce/apex/TodoListController.insertTask';
import deleteTask from '@salesforce/apex/TodoListController.deleteTask';

export default class TodoList extends LightningElement {

    newTask = '';
    @track tasks = [];
    error;
    tasksResponse;
    processing = true;

    @wire(getTasks)
    wiredTasks(response) {
        this.tasksResponse = response;
        let data = response.data;
        let error = response.error;

        if (data || error) {
            this.processing = false;
        }

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
        if (this.newTask === '') {
            return;
        }
        this.processing = true;
        insertTask({taskToInsert: this.newTask})
        .then(result => {
            console.log(result);
            this.tasks.push({
                Id: result.Id,
                Subject: this.newTask
            });
            this.newTask = '';
        })
        .catch(error => {
            console.log('error => ' + error);
        })
        .finally( () => {this.processing = false;});
    }

    deleteTaskFromList(event) {
        this.processing = true;
        const idToDelete = event.target.name;
        deleteTask({taskId: idToDelete})
        .then(result => {
            if(result) {
                console.log('delete => ' + result);
                this.tasks = this.tasks.filter(task => task.Id !== idToDelete);
            } else {
                console.log('Unable to delete this task');
            }
        })
        .catch(error => {
            console.log('error => ' + error);
        })
        .finally( () => {this.processing = false;});
    }

    refreshList() {
        this.processing = true;
        refreshApex(this.tasksResponse)
        .finally( () => {this.processing = false;});
    }

}