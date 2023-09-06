<template>
    <v-card width="100%" class="d-flex align-center flex-column  centerElements" style="background-color: #f4ecfe" elevation="0">
        <v-card-title class="text-h4 font-weight-medium text-center text-grey-darken-2">PAGE NOT FOUND</v-card-title>
        <v-card-text class="font-weight-medium text-center text-grey-darken-1 mt-2">
            The page you are looking for doesn’t exist. 
            Please go back and start with main page
        </v-card-text>
            <router-link :to="{name: 'tasks'}">
                    <v-btn 
                        class="mx-auto mt-2 mb-4 text-subtitle-1 text-uppercase text-white font-weight-medium" 
                        color="var(--accent-purple)" elevation="3" x-large>
                        Go back
                    </v-btn>
            </router-link>
    </v-card>
</template>

<script>
export default {

}
</script>
<style scoped>
.centerElements {
        position: fixed;
        top: 40%;
    }
</style>