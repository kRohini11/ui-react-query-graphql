"use client"

import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect } from "react";

//const app = express();
// app.use(cors())

export default function Rest() {
    const fetchUsers = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const result = await res.json();
        return result;

    }
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        enabled: false,
    })

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                console.log("success", data)
            }
            if (error) {
                console.log("error", error)
            }
        }
    }, [isLoading])

    const saveMyUsers = async (data) => {
        const res = await fetch("http://localhost:2020/std/reg-std", {
            method: "post",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ data: data })
        })
        const result = await res.json;
        return result;
    }

    const { mutate } = useMutation({
        mutationKey: "saveUsers",
        mutationFn: saveMyUsers,
        onSuccess: (data) => {
            console.log("success", data)
        },
        onError: (data) => {
            console.log("error", data)
        }
    })
    const fnData = () => {
        refetch();
    }

    const saveUsers = () => {
        mutate({ "name": "gql" });
    }

    return (
        <div>
            <h5>REST</h5>
            <button onClick={fnData}>fetch</button>
            <button onClick={saveUsers}>Save</button>
        </div>
    );
    
}

