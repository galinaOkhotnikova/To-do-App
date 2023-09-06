import gql from 'graphql-tag'

export const DELETE_SUBTASK = gql`
mutation DeleteSubtask($id: Int, $idSub: Int) {
    deleteSubtask(id: $id, idSub: $idSub) {
        id
        name
        done
    }
}`