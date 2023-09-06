<template>
    <v-card class="mx-auto" min-width="500" max-width="600" max-height="600">
        <v-card-title class="text-h5 text-uppercase text-center font-weight-medium text-purple-darken-4 backgroundColor">
            Edit task
        </v-card-title>
        <v-card-item>
            <label class="text-subtitle-1 text-uppercase font-weight-medium text-purple-darken-4">Title</label>
            <v-text-field
                class="text-subtitle-1 font-weight-medium text-grey-darken-2"
                density="compact"
                color="var(--accent-purple)"
                variant="plain" type="text" 
                v-model="changedTitle"
                counter
                maxlength="20"
            >
            </v-text-field>
        </v-card-item>
        <v-divider/>
        <v-card-text>
            <label class="text-subtitle-1 text-uppercase font-weight-medium text-purple-darken-4">add subtask</label>
            <v-text-field
                class="text-md-body-1 text-grey-darken-2"
                density="compact"
                color="var(--accent-purple)"
                variant="outlined" type="text"
                v-model="newSubtask" 
                counter
                maxlength="35"
            >
                <template v-slot:append>
                    <Icon 
                        icon="ic:round-library-add" 
                        color="var(--accent-purple)"
                        width="40" height="40" 
                        class="mt-n2"
                        style="cursor: pointer"
                        @click="addSubtask({ id: task.id, name: newSubtask })"/>
                </template>
            </v-text-field>
        </v-card-text>
        <v-divider class="mb-5"/>
        <v-card-text v-for="(subtask, index) in task.list" :key="subtask.id" class="py-0">
            <div class="d-flex pa-4">
                <v-checkbox-btn 
                    class="mb-2" 
                    color="var(--accent-purple)" 
                    v-model="selected" 
                    :value="subtask.id"
                >
                </v-checkbox-btn>
                <v-text-field
                    class="text-md-body-1 text-grey-darken-2"
                    density="compact"
                    color="var(--accent-purple)"
                    variant="plain" type="text" 
                    v-model="newNames[index]"
                    counter
                    maxlength="35"
                >
                    <template #append>
                        <Icon
                            class="mt-1"
                            icon="ri:delete-back-2-fill" 
                            color="var(--accent-purple)" 
                            width="25" height="25" 
                            style="cursor: pointer"
                            @click="removeSubtask({ id: task.id, idSub: subtask.id })"/>
                    </template>
                </v-text-field>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <div class = "mr-4">
                <Icon
                    @click="undo()"
                    class = "mr-4"
                    icon="solar:undo-left-round-square-linear"
                    role="img"
                    width="30"
                    style="cursor: pointer"
                    color="var(--accent-purple)"
                    aria-hidden="false" 
                    
                >
                        mdi-pencil
                </Icon>
                <Icon
                    @click="redo()"
                    icon="solar:undo-right-round-square-linear"
                    role="img" 
                    width="30" 
                    color="var(--accent-purple)"
                    style="cursor: pointer"
                    aria-hidden="false" 
                >
                        mdi-pencil
                </Icon> 
            </div>
            <v-btn 
                color="var(--accent-purple)" 
                @click="saveChanges(task.id)"
            >
                Save
        </v-btn>
            <v-btn 
                color="var(--accent-purple)" 
                @click= "cancelChanges(false)"
            >
                Cancel
            </v-btn>
        </v-card-actions>
    </v-card>     
</template>

<script>
import { Icon } from '@iconify/vue';


export default {
    props: ['task', 'editing'],
    data: () => ({
        changedTitle: '',
        selected: [],
        newSubtask: '',
        newNames: [],
        undoStack: [],
        redoStack: [],
    }),
    components: {
        Icon
    },
    created() {
        this.changedTitle = this.task.title;
        for (let i = 0; i < this.task.list.length; i++) {
            this.newNames[i] = this.task.list[i].name;
            if (this.task.list[i].done) {
                this.selected.push(this.task.list[i].id);
            }
        }
    },
    watch: {
        'changedTitle'(newValue, oldValue) {
            const change = {
                property: 'title',
                oldValue,
                newValue,
            };
            this.undoStack.push(change);
        },
    },
    methods: {
        onChange(bool) {
            this.$emit('edit', bool);
        },
        addSubtask(obj) {
            if (obj.name !== '') {
                this.$store.dispatch('tasks/addSubtask', obj);
                this.newNames.push(obj.name);
            }
            this.newSubtask = '';
        },
        removeSubtask(obj) {
            let res = confirm("Вы действительно хотите удалить подзадачу?");
            if (res) {
                this.$store.dispatch('tasks/deleteSubtask', obj);
            }
        },
        changeTitle(obj) {
            this.$store.dispatch('tasks/changeTitle', obj);
        },
        subTaskDone(obj) {
            this.$store.dispatch('tasks/subDone', obj);
        },
        changeNames(obj) {
            this.$store.dispatch('tasks/changeName', obj);
        },
        undo() {
            if (this.undoStack.length > 1) {
                const lastChange = this.undoStack.pop();
                const redoChange = {
                    property: lastChange.property,
                    newValue: lastChange.newValue,
                };
                this.redoStack.push(redoChange);
                if (lastChange.property === 'title') {
                    this.changedTitle = lastChange.oldValue;
                }
            }
        },
        redo() {
            if (this.redoStack.length > 0) {
                const lastChange = this.redoStack.pop();
                const undoChange = {
                    property: lastChange.property,
                    oldValue: this.task[lastChange.property],
                };
                this.undoStack.push(undoChange);
                if (lastChange.property === 'title') {
                    this.changedTitle = lastChange.newValue;
                }
                if (lastChange.property === 'title') {
                    this.changedTitle = lastChange.newValue;
                }
            }
        },
        saveChanges(id) {
            this.onChange(false);
            let arr = this.selected.map(String);
            this.subTaskDone({id: id, selected: arr });
            this.selected = [];
            this.changeTitle({id: id, name: this.changedTitle});
            this.changeNames({id: id, names: this.newNames});
            this.$router.push('/tasks');
        },
        cancelChanges(bool) {
            let res = confirm("Вы действительно хотите отменить изменения?");
            if (res) {
                this.selected = [];
                this.$emit('edit', bool);
                this.$router.push('/tasks');
            }
        }
    }
}
</script>

<style>
.style {
    border: 1px solid #e2e2e2;
    background-color: #F6F6F6;
    width: 100px;
    height: 50px;
}
</style>