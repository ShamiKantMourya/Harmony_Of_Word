import axios from "axios";


export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginRequest",
        });

        const response = await axios.post("/user/login", { email, password }, {
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

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest",
        });

        await axios.get("/user/logout")

        dispatch({
            type: "logoutSuccess",
        });
    } catch (error) {
        dispatch({
            type: "logoutFailure",
            payload: error.response.data.message,
        });
    }
};


export const loadUser = () => async (dispatch) => {
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
};

export const getAllUsers = () => async (dispatch) => {
    try {

        dispatch({
            type: "allUserRequest",
        })

        const response = await axios.get("/user/all/usersProfile")
        dispatch({
            type: "allUserSuccess",
            payload: response.data.users,
        })

    } catch (error) {
        dispatch({
            type: "allUserFailure",
            payload: error.response.data.message,
        })
    }
};

export const registerUser = (avatar, name, location, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "registerRequest",
        });

        const response = await axios.post('user/register', {
            avatar, name, location, email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        dispatch({
            type: "registerSuccess",
            payload: response.data.user,
        })

    } catch (error) {
        dispatch({
            type: "registerFailure",
            payload: error.response.data.message,
        })
    }
};

export const updateUserProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest",
        });

        const response = await axios.put("/user/update/profile", {
            name, email, avatar
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        // console.log(response.data);
        dispatch({
            type: "updateProfileSuccess",
            payload: response.data.message,
        })
    } catch (error) {
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message,
        })
    }
};

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
try {
    dispatch({
        type: "updatePasswordRequest",
    });

    const response = await axios.put("/user//update/password", {
        oldPassword, newPassword
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    dispatch({
        type: "updatePasswordSuccess",
        payload: response.data.message,
    })
    
} catch (error) {
    dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
    })
}
};

export const deleteUserProfile = () => async (dispatch) => {
try {
dispatch({
    type: 'deleteProfileRequest',
});

const response = await axios.delete("/user/delete/profile");

dispatch({
    type: "deleteProfileSuccess",
    payload: response.data.message,
})
} catch (error) {
    dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
    })
}
};