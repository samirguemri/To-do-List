import { LightningElement } from 'lwc';

export default class TodoList extends LightningElement {

    tasks = [
        {id: '1', task: 'Task 1'},
        {id: '2', task: 'Task 2'}
    ];
}