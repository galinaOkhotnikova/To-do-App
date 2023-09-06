import gql from 'graphql-tag'

export const DELETE_TASK = gql`
mutation DeleteTask($id: Int) {
    deleteTask(id: $id) {
        id
        title
        list {
            name
            done
        }
    }
}`