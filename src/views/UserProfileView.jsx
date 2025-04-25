import { getUser, clearUser } from "../models/UserModel";
import './UserProfileView.css';
import React, {useState,useEffect} from 'react';

const user = getUser();


const UserProfileView = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedRole,setSelectedRole] = useState('');
    const [text, setText] = useState('');
    const [roleRequested, setRoleRequested] = useState('');

    const handleConfirm = async () => {
        if (selectedRole === 'Student' && !text) {
            alert('Please enter a Student ID.');
            return;
        }
        if (roleRequested.role === selectedRole){
            alert("This is a role you are already requesting. Please be patient");
            return;
        }
        if (roleRequested){
            alert("You already have a pending request");
            return;
        }


        try {
            const res = await fetch("http://localhost:5000/api/role-change/send",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name:user.name,email:user.email,role:selectedRole,text:text}),
            });

        }catch (error){
            console.error("Error creating request:", error);
        }
    }



        const updatedData = {
            role: selectedRole,
            studentId: selectedRole === 'Student' ? text : null,
        };


    const checkCurrentRequests = async() => {
        try {
            const res = await fetch("http://localhost:5000/api/role-change/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email:user.email}),
            });
            const data = await res.json();
            setRoleRequested(data);

        } catch (error){
            console.log(error);
        }
    }




        return (
            <div className="user-profile-container">
            <h2>You are logged in with the following information:</h2>
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>You have 0 remaining visit available this week</p>

            <div>

                <button

                    onClick={() => {
                        setShowDropdown(!showDropdown)
                        checkCurrentRequests()
                    }}
                >
                    Need to request a change to your role?
                </button>

                {showDropdown && (
                    <div className="dropdown-container">
                        <select
                            value={selectedRole}
                            className="role-select"
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="">Select a role</option>
                            <option value="Student">Student</option>
                            <option value="Donor">Donor</option>
                            <option value="Staff">Staff</option>
                        </select>

                        {selectedRole === 'Student' && (
                            <>
                                <p className ="instruction-text">Important: You must have completed the online survey before requesting online access to the pantry.</p>
                                <p>
                                    If you have already done so, please enter your Student ID here.
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter Student ID"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </>
                        )}

                        {selectedRole === 'Staff' && (
                            <>
                                <p className ="instruction-text">Important: Please notify your supervisor prior to requesting staff access</p>

                            </>
                        )}

                        {selectedRole === 'Donor' && (
                            <>
                                <p className ="instruction-text">Thank you for signing up to be a donor. Please provide any information you think may be necessary such as company affiliation or contact information below</p>
                                <input
                                    type="text"
                                    placeholder=""
                                    value = {text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </>
                        )}



                        <button
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                    </div>
                )}
            </div>
                <div>
                    {roleRequested ? (
                        <>

                        <p>Warning! You already have a request pending. You are currently requesting the role below. Please cancel before sending another request.</p>
                            <td> {roleRequested.role}</td>
                        </>
                    ) : null}


                </div>

        </div>

    )

}

export default UserProfileView;