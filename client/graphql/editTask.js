import gql from 'graphql-tag'

export const EDIT_TASK = gql`
mutation editTask($id: Int) {
    editTask(id: $id) {
        id
        title
        list {
            id
            name
            done
        }
    }
}`