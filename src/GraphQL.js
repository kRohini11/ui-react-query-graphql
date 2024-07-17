
"use client"

import React, { useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { useQuery, useMutation } from '@tanstack/react-query'

const GET_USERS = gql`
  query Query {
    getUsers {
      name
      uid
      pwd
      rollno
      gen
      hobbies
      country
      address
    }
  }
`
const SAVE_USER = gql`
  mutation Mutation($data: StudentsInput) {
    regStudents(data: $data)
  }
`
const GRAPHQL_ENDPOINT = "http://localhost:2020/graphql"
const Graphql = () => {

    const getUsers = async () => {
        const data = await request(GRAPHQL_ENDPOINT, GET_USERS);
        return data;
    }

    const { isLoading, data, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        enabled: false
    })

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                console.log(data);
            }
            if (error) {
                console.log(error)
            }
        }
    }, [isLoading])
    
    const saveUsers = async () => {
        const data = await request(GRAPHQL_ENDPOINT, SAVE_USER, {
            data: { name: "nitt" },
        });
        return data;
    }

    const { mutate } = useMutation({
        mutationKey: ["saveUsers"],
        mutationFn: saveUsers,
        onSuccess: (data) => {
            console.log("success", data);
        },
        onError: (data) => {
            console.log("error", data)
        }
    })

    const handleGetUsers = () => {
        refetch();
    }
    const handleSaveUsers = () => {
        mutate();
    }

    return (
        <div>
            <h5>GraphQL</h5>
            <button onClick={handleGetUsers}>Get Users</button>
            <button onClick={handleSaveUsers}>Save Users</button>
        </div>
        
    )
}

export default Graphql
