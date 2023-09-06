import {GET_TASKS} from '@graphql/getTasks.js'
import {ADD_TASK} from '@graphql/addTask.js'
import {DELETE_TASK} from '@graphql/deleteTask.js'
import {ADD_SUBTASK} from '@graphql/addSubtask.js'
import {DELETE_SUBTASK} from '@graphql/deleteSubtask.js'
import {CHANGE_TITLE} from '@graphql/changeTitle.js'
import {SUB_DONE} from '@graphql/subDone.js'
import {CHANGE_NAME} from '@graphql/changeName.js'

import {apolloClient} from '@src/main.js';

export default ({
    namespaced: true,
    state: {
        tasks: []
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        add(state, el) {
            state.tasks = [...state.tasks, el];
        },
        changeT(state, obj) {
            let pos = state.tasks.findIndex(el => Number(el.id) === Number(obj.id));
            state.tasks[pos] = obj.answ;
        },
        editSubtasks(state, obj) {
            let pos = state.tasks.findIndex(el => Number(el.id) === Number(obj.id));
            state.tasks[pos].list = obj.answ;
        },
        addSub(state, obj) {
            let pos = state.tasks.findIndex(el => Number(el.id) === Number(obj.id));
            state.tasks[pos].list.push(obj.answ);
        }
    },
    actions: {
        async fetchTasks({commit}) {
            try {
                const response = await apolloClient.query({
                    query: GET_TASKS
                });
                commit('setTasks', JSON.parse(JSON.stringify(response.data.tasks)));
            }
            catch (error) {
                console.log("Не удалось выполнить запрос на получение данных");
            }
        },
        async addTask({commit}, el) {
            try {
                let resp = await apolloClient.mutate({
                    mutation: ADD_TASK,
                    variables: el
                });
                commit('add', JSON.parse( JSON.stringify(resp.data.addTask)));
            }
            catch (error) {
                console.log("Не удалось выполнить запрос на добавление задачи");
            }
        },
        async removeTask({commit}, id) {
            try {
                let resp = await apolloClient.mutate({
                    mutation: DELETE_TASK,
                    variables: id
                });
                commit('setTasks', resp.data.deleteTask);
            }
            catch (error) {
                console.log("Не удалось выполнить запрос на удаление задачи", error);
            }
		},
        async addSubtask({commit}, obj) {
            try {
                let resp = await apolloClient.mutate({
                    mutation: ADD_SUBTASK,
                    variables: {id: obj.id, name: obj.name}
                });
                commit('addSub', {answ: JSON.parse(JSON.stringify(resp.data.addSubtask)), id: obj.id});
            }
            catch (error) {
                console.log("Не удалось выполнить запрос на добавление подзадачи", error);
            }
        },
        async deleteSubtask({commit}, obj) {
            try {
                let resp = await apolloClient.mutate({
                    mutation: DELETE_SUBTASK,
                    variables: {id: obj.id, idSub: obj.idSub}
                });
                commit('editSubtasks', {answ: JSON.parse(JSON.stringify(resp.data.deleteSubtask)), id: obj.id});
            }
            catch (error) {
                console.log("Не удалось выполнить запрос на удаление подзадачи", error);
            }
        },
        async changeTitle({commit}, obj) {
            try {
                let resp = await apolloClient.mutate({
                    mutation: CHANGE_TITLE,
                    variables: {id: obj.id, title: obj.name}
                });
                commit('changeT', {answ: JSON.parse(JSON.stringify(resp.data.changeTitle)), id: obj.id});
            }
            catch (error) {
                console.log("Не удалось выполнить запрос на изменение заголовка задачи", error);
            }
        }, 
        async subDone({commit}, obj) {
            try {
                let resp = await apolloClient.mutate({
                    mutation: SUB_DONE,
                    variables: {id: obj.id, selected: obj.selected}
                });
                commit('editSubtasks', {answ: JSON.parse(JSON.stringify(resp.data.subDone)), id: obj.id});
            }
            catch (error) {
                console.log("Не удалось выполнить запрос на изменение статуса подзадачи", error);
            }
        },
        async changeName({commit}, obj) {
            try {
                let resp = await apolloClient.mutate({
                    mutation: CHANGE_NAME,
                    variables: {id: obj.id, names: obj.names}
                });
                commit('editSubtasks', {answ: JSON.parse(JSON.stringify(resp.data.changeName)), id: obj.id});
            }
            catch (error) {
                console.log("Не удалось выполнить запрос на изменение имени подзадачи", error);
            }
        }
    },

    modules: {
    }
})
