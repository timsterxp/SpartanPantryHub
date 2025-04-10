import { getUser, clearUser } from "../models/UserModel";
import './UserProfileView.css';
const user = getUser();

const UserProfileView = () => {

    return (
        <div>
            <h2>You are logged in with the following information:</h2>
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>You have 1 remaining visit available this week</p>
            <ul>
                <li>
                    <input type="checkbox" id="user1" name="user1" value="user1"/>
                    <label htmlFor="user1">Request Approved Student Access</label>
                    <input type="text" name="studentid" id="studentid" />
                </li>

                <li>
                    <input type="checkbox" id="user2" name="user2" value="user2"/>
                    <label htmlFor="user2">Request Staff Access</label>
                </li>

                <li>
                    <input type="checkbox" id="user3" name="user3" value="user1"/>
                    <label htmlFor="user3">Request Donor Access</label>
                </li>

            </ul>

        </div>

    )

}

export default (UserProfileView);