import gql from 'graphql-tag'

export const CHANGE_NAME = gql`
mutation ChangeName($id: Int, $names: [String]) {
    changeName(id: $id, names: $names) {
        id
        name
        done
    }
}`