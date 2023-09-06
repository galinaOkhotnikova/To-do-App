import gql from 'graphql-tag'

import {tasks} from './database.js';

const typeDefs = gql`
    type Query {
        tasks: [Task]
        task(id: Int!): Task
    }

    type Mutation {
        addTask(title: String): Task
        deleteTask(id: Int): [Task]
        editTask(id: Int): [Task]
        addSubtask(id: Int, name: String): Subtask
        deleteSubtask(id: Int, idSub: Int): [Subtask]
        changeTitle(id: Int, title: String): Task
        subDone(id: Int, selected: [String]): [Subtask]
        changeName(id: Int, names: [String]): [Subtask]
    }

    type Subtask {
        id: Int
        name: String
        done: Boolean
    }
    type Task {
        id: Int
        title: String
        list: [Subtask]
    }
`
const resolvers = {
    Query: {
        task(_, { id }) {
            return tasks.find(task => Number(task.id) === Number(id));
        },
        tasks: () => tasks
    },
    Mutation: {
        addTask: (parent, args) => {
            args.id = parseInt(tasks[tasks.length - 1].id) + 1;
            const task = {
                id: args.id,
                title: args.title,
                list: []
            };
            tasks.push(task);
            return task
        },
        deleteTask: (parent, { id }) => {
            let ID = Number(id);
            let pos = tasks.findIndex(el => Number(el.id) === ID);
            if (pos !== -1) {
                tasks.splice(pos, 1);
            }
            return tasks;
        }, 
        editTask: (parent, { id }) => {
            let ID = Number(id);
            let pos = tasks.findIndex(el => Number(el.id) === ID);
            tasks[pos].editing = !tasks[pos].editing;
            return tasks;
        },
        addSubtask: (parent, { id, name }) => {
            let ID = Number(id);
            let pos = tasks.findIndex(el => Number(el.id) === ID);
            if (name) {
                tasks[pos].list.push({id: (Math.floor(Math.random() * 100)), name: name, done: false});
            }
            return tasks[pos].list[tasks[pos].list.length - 1];
        },
        deleteSubtask: (parent, { id, idSub }) => {
            let ID = Number(id);
            let pos = tasks.findIndex(el => Number(el.id) === ID);
            let ind = tasks[pos].list.findIndex(el => Number(el.id) === Number(idSub));
            if (pos !== -1 && ind !== -1) {
                tasks[pos].list.splice(ind, 1);
            }
            return tasks[pos].list;
        },
        changeTitle: (parent, {id, title}) => {
            let ID = Number(id);
            let pos = tasks.findIndex(el => Number(el.id) === ID);
            if (pos !== -1) {
                tasks[pos].title = title;
            }
            return tasks[pos];
        },
        subDone: (parent, {id, selected}) => {
            let ID = Number(id);
            let pos = tasks.findIndex(el => Number(el.id) === ID);
            const set1 = new Set(selected);
            if (pos !== -1) {
                for (let i = 0; i < tasks[pos].list.length; i++) {
                    if (set1.has(String(tasks[pos].list[i].id))) {
                        tasks[pos].list[i].done = true;
                    }
                    else {
                        tasks[pos].list[i].done = false;
                    }
                }
            }
            return tasks[pos].list;
        },
        changeName: (parent, {id, names}) => {
            let ID = Number(id);
            let pos = tasks.findIndex(el => Number(el.id) === ID);
            if (pos !== -1) {
                for (let i = 0; i < tasks[pos].list.length; i++) {
                        tasks[pos].list[i].name = names[i];
                }
            }
            return tasks[pos].list;
        }
    }
}

export {typeDefs, resolvers}