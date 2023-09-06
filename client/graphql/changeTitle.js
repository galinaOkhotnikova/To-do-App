import gql from 'graphql-tag'

export const CHANGE_TITLE = gql`
mutation ChangeTitle($id: Int, $title: String) {
    changeTitle(title: $title, id: $id) {
        id
        list {
            id
            done
            name
        }
        title
    }
}`