import { getUser, clearUser } from "../models/UserModel";
import './UserProfileView.css';
import React, {useState} from 'react';

const user = getUser();


const UserProfileView = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedRole,setSelectedRole] = useState('');
    const [studentId, setStudentId] = useState('');

    const handleConfirm = () => {
        if (selectedRole === 'Student' && !studentId) {
            alert('Please enter a Student ID.');
            return;
        }
    }

        const updatedData = {
            role: selectedRole,
            studentId: selectedRole === 'Student' ? studentId : null,
        };


        return (
            <div className="user-profile-container">
            <h2>You are logged in with the following information:</h2>
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>You have 0 remaining visit available this week</p>

            <div>

                <button

                    onClick={() => setShowDropdown(!showDropdown)}
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
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
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
        </div>

    )

}

export default UserProfileView;