import React, { useState, useEffect } from 'react';
import { FaHeartCirclePlus } from "react-icons/fa6";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from './configuration/firebase';
import { Hearts } from 'react-loader-spinner';
import { TbPencilHeart } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Swal from 'sweetalert2'


const Todo = () => {
    const [addTodo, setAddTodo] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const addData = async () => {
        if (addTodo === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "please enter a Todo",
              });
            return;
        }
        try {
            await addDoc(collection(db, "users"), { addTodo });
            setAddTodo('');
            setRefresh(!refresh);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const getData = async () => {
        setLoading(true);
        try {
            const arr = [];
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                arr.push({ ...doc.data(), id: doc.id });
            });
            setUserData(arr);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };

    const EditData = async (id) => {
        const newValue = prompt("Enter new value:");
        if (newValue && newValue!== '') {
            try {
                await updateDoc(doc(db, "users", id), { addTodo: newValue });
                setRefresh(!refresh);
                
Swal.fire({
  text: "Edited successfully",
  icon: "success"
});
            } catch (e) {
                console.error("Error updating document: ", e);
            }
        }
    };

    const DeleteData = async (id) => {
        try {
        
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!"
            });
    
            
            if (result.isConfirmed) {
                await deleteDoc(doc(db, "users", id));
                setRefresh(!refresh); 
    
                await Swal.fire({
                    title: "Deleted!",
                    text: "Your todo has been deleted.",
                    icon: "success"
                });
            }
        } catch (e) {
            console.error("Error deleting document: ", e);
            Swal.fire({
                title: "Error",
                text: "There was a problem deleting the todo.",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        getData();
    }, [refresh]);

    return (
        <div className="todo-container">
            <h1>Things to Do</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={addTodo}
                    onChange={(e) => setAddTodo(e.target.value)}
                    placeholder='Write Todo here'
                />
                <button className='add-button' onClick={addData}>
                    <FaHeartCirclePlus />
                </button>
            </div><br />

            {loading ? (
             <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                   <Hearts
                    height="80"
                    width="80"
                    color="#2F1F57"
                    ariaLabel="hearts-loading"
                    
                />
             </div>
            ) : (
                <div className="todo-list">
                    {userData.map((e) => (
                        <div key={e.id} className="todo-item">
                            <span className="todo-text">{e.addTodo}</span>
                            <div className="todo-actions">
                                <button className='edit-button' onClick={() => EditData(e.id)}>
                                    <TbPencilHeart />
                                </button>
                                <button className='delete-button' onClick={() => DeleteData(e.id)}>
                                    <RiDeleteBin2Fill />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Todo;
