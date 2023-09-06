import gql from 'graphql-tag'

export const ADD_TASK = gql`
    mutation AddTask($title: String) {
        addTask(title: $title) {
            id
            title
            list {
                name
                done
            }
        }
    }
`