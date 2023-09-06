<template>
    <div class="d-flex align-center flex-column">
        <v-card class="mx-auto mt-12 shadow"  min-width="400" width="700" max-width="800" tile>
            <v-list-item four-line v-for="task in tasks" :key="task.id" >
                <app-task :task= "task"/>
                <v-divider class="hr-tasks mt-4 mb-4"></v-divider>
            </v-list-item>
        </v-card>
        <add-task></add-task>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import AppTask from './AppTask';
import AddTask from './AddTask';



export default {
    components: {
        AppTask,
        AddTask
    },
    data() {
        return {
            task: ""
        }
    },
    computed: mapState({
        tasks: (state) => state.tasks.tasks,
    }),
}
</script>

<style scoped>
.shadow {
    box-shadow: 0px 0px 5px 5px rgba(202, 198, 198, 0.108);
    border: 1px solid rgba(220, 220, 220, 0.688);
}
.hr-tasks {
    color: #EEEEEE;
}
</style>