import { createStore } from 'vuex'

import tasks from './modules/tasks';

export default createStore({
    modules: {
		tasks
	},
	strict: process.env.NODE_ENV !== 'production'
})