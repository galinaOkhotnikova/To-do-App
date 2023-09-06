import gql from 'graphql-tag'

export const SUB_DONE = gql`
mutation SubDone($id: Int, $selected: [String]) {
    subDone(id: $id, selected: $selected) {
        id
        name
        done
    }
}`