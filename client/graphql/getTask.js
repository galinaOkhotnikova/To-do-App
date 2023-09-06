import gql from 'graphql-tag'

export const GET_TASK = gql`
    query Task ($TaskId: Int!) {
        task (id: $TaskId) {
            id
            title
            list {
                id
                name
                done
            }
        }
    }
`