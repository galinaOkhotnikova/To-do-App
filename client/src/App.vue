<template>
    <v-app class="back">
        <v-main>
            <v-app-bar  color="var(--accent-purple)" :elevation="3" width="100%">
                <v-app-bar-title class="text-h3 font-weight-medium text-center text-white">TO DO</v-app-bar-title>
            </v-app-bar>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('tasks/fetchTasks');
    }  
}
</script>

<style scoped>
.back {
    background-color: #f4ecfe;
}

</style>