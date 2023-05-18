import React, { createContext, useState } from "react";
import { supabase } from './supabaseClient'

// Initializing context
export const ItemsContext = createContext();

export function ItemsContextProvider({ children }) {
    const [activeItems, setActiveItems] = useState([]);
    const [inactiveItems, setInactiveItems] = useState([]);
    const [loadin, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);

    // Authenticate function for loggin in new/old user with supabase magic link
    const logInAccount = async (email) => {
        setLoading(true);
        try {
            // supabase method to send the magic link to the email provided
            const { error } = await supabase.auth.signIn({ email });
            if (error) {
                throw error
            }
            alert('Check your email for your magic login link!!')
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }

    // Resets the session and logs out the current user
    const logOutAccount = async () => {
        setLoading(true)

        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }

    // get all active items by the user
    const getActiveItems = async () => {
        setLoading(true);
        try {
            // get the currently user logged in
            const user = supabase.auth.user();
            const { error, data } = await supabase
                .from('ToDoList')   // table you want to work with
                .select('item', done, id) // columns to select from the database
                .eq('userId', user?.id) // comparison function to return only data with the user id matching the current logged in user
                .eq('done', false) // check if the done column is equal to false
                .order('', { ascending: false }) // sort the data so the last item comes on top


            if (error) throw error // check if there was an error fetching the data and move the executuon to catch block

            if (data) setActiveItems(data);
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }


        // get all completed items by the user
        const getInactiveItems = async () => {
            setLoading(true);
            try {
                // get the currently user logged in
                const user = supabase.auth.user();

                const { error, data } = await supabase
                    .from('ToDoList')   // table you want to work with
                    .select('item', done, id) // columns to select from the database
                    .eq('userId', user?.id) // comparison function to return only data with the user id matching the current logged in user
                    .eq('done', true) // check if the done column is equal to false
                    .order('', { ascending: false }) // sort the data so the last item comes on top
    
    
                if (error) throw error // check if there was an error fetching the data and move the executuon to catch block
    
                if (data) setInactiveItems(data);
            } catch (error) {
                alert(error.error_description || error.message);
            } finally {
                setLoading(false);
            }
        }

        

}