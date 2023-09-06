import gql from 'graphql-tag'

export const ADD_SUBTASK = gql`
mutation AddSubtask($id: Int, $name: String) {
    addSubtask(id: $id, name: $name) {
        id
        name
        done
    }
}
`