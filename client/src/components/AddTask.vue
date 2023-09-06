<template>
    <v-dialog transition="v-expand-x-transition" v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn 
                class="mx-auto mt-12 mb-4 text-subtitle-1 text-uppercase text-white font-weight-medium" 
                color="var(--accent-purple)" elevation="3" x-large v-bind="props">
                Create task
            </v-btn>
        </template>
        <v-card class="mx-auto" width="400" max-width="500">
            <v-card-title>
                <span class="text-h5 text-uppercase text-purple-darken-3">Add new task</span>
            </v-card-title>
            <v-card-text>
                <v-text-field 
                    counter
                    maxlength="20" color="var(--accent-purple)"  
                    dense variant="outlined" 
                    label="Task's title" v-model="title">
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="var(--accent-purple)" variant="text" @click="closeDialog()">
                    Close
                </v-btn>
                <v-btn v-if="title" color="purple-darken-3" variant="text" @click="saveNewTask(title)">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    data: () => ({
        dialog: false,
        title: '',
        subtasks: [],
    }),
    methods: {
        addToList(title) {
            this.$store.dispatch('tasks/addTask', {title});
            this.title = '';
        },
        addSubtask() {
            this.subtasks.push('');
        },
        saveNewTask(title) {
            this.addToList(title);
            this.dialog = false;
        },
        closeDialog() {
            this.dialog = false;
            this.title = '';
        }
    }
}
</script>

<style scoped>

</style>