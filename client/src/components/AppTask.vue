<template>
    <div>
        <v-icon @click="removeFromList(task.id)" role="img" aria-hidden="false" color="var(--accent-purple)" class="mr-2">
            mdi-pail-remove
        </v-icon>
            <v-dialog transition="v-expand-x-transition" v-model="editing">
                <template v-slot:activator="{ props }">
                    <v-icon @click="editing = true" v-bind="props" role="img" aria-hidden="false" color="var(--accent-purple)">
                        mdi-pencil
                    </v-icon>  
                </template>
                <edit-task @edit="onChange($event)" :task="task"/>  
            </v-dialog> 
        <v-list-item-title class="font-weight-bold text-h6 text-center text-uppercase text-purple-darken-4">{{ task.title }}</v-list-item-title>
        <div v-if="task.list.length > 0">
            <div v-for="(subtask) in task.list.slice(0, 3)" :key="subtask.id" >
                <v-list-item-subtitle
                    class="text-center text-grey-darken-4 text-md-body-1" :class="{ 'done': subtask.done }"
                >
                    • {{ subtask.name }}
                </v-list-item-subtitle>
            </div>
        </div>
    </div>
</template>
<script>


import EditTask from './EditTask';

import { mdiPailRemove } from '@mdi/js';
import { mdiPencil } from '@mdi/js';


export default {
    props: ['task'],
    components: {
        EditTask
    },
    data: () => ({
        icons: {
            mdiPailRemove,
            mdiPencil
        },
        editing: false
    }),
    methods: {
        removeFromList(id) {
            let res = confirm("Вы действительно хотите удалить задачу?");
            if (res) {
                this.$store.dispatch('tasks/removeTask', { id });
            }
        },
        onChange(bool) {
            this.editing = bool;
        }
    }
}
</script>
<style scoped>
.done {
        text-decoration: line-through;
    }
    .modal {
        overflow-y: auto;
    }
</style>