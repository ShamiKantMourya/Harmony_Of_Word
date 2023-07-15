import axios from "axios";

export const loginUser = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: "loginRequest",
        });

        const response = await axios.post("/user/login", {email, password},{
            headers: {
                "Content-Type": "application/json",
            },
        });

        dispatch({
            type: "loginSuccess",
            payload: response.data.user,
        });
         
    } catch (error) {
        dispatch({
            type: "loginFailure",
            payload: error.response.data.message,
        });
    }
};

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest",
        });

        const response = await axios.get("/user/myProfile");
        // console.log(response.data.user);
        dispatch({
            type: "loadUserSuccess",
            payload: response.data.user,
        });
         
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message,
        });
    }
}