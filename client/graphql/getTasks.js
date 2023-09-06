import gql from 'graphql-tag'

export const GET_TASKS = gql`
    query Tasks {
        tasks {
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