import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
    const [userAuth, setUserAuth] = useState({ email: "", fullName: "", password: "", rePassword: "",role:"" })
    const [errors, setErrors] = useState({})
    const [isError, setIsError] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [roles,setRoles] = useState(["admin","user"])
    const [selectedRole,setSelectedRole] = useState("")
    const navigate = useNavigate()

    const onFieldChange = (e) => {
        console.log(e.target.name, e.target.value)
        setUserAuth((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const validateFormFields = () => {
        let errors = {}
        if (!userAuth.fullName) {
            errors.fullName = "Please enter full name"
        } if (!userAuth.email) {
            errors.email = "Please enter email"
        } if (!userAuth.password) {
            errors.password = "Please enter password"
        } if (!userAuth.rePassword) {
            errors.rePassword = "Please enter confirm password"
        } else if (userAuth.password != userAuth.rePassword) {
            errors.rePassword = "password confirm pasword does'nt match"
        }
        return errors
    }

    const signup = () => {
        fetch("https://task-management-application-ajjn.onrender.com/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userAuth) }).then((res) => {
            return res.json()
        }).then((result) => {
            if (result.success) {
                navigate("/login")
            } else {
                setIsError(true)
                setErrMessage(result.message)
            }
        })
    }
    const register = (e) => {
        e.preventDefault();
        let errors = validateFormFields()
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            // no error plase call to backedn
            signup();
        } else {
            return;
        }

    }

    const onRoleChange = (e)=>{
        console.log(e.target.value)
        setSelectedRole(e.target.value)
        setUserAuth((prevState) => {
            return {
                ...prevState,
                role: e.target.value
            }
        })
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="text-center">Signup</h4>
                        <form onSubmit={register}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" value={userAuth.fullName} onChange={onFieldChange} name="fullName" />
                            </div>
                            <p className="error-text">{errors?.fullName}</p>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" className="form-control" value={userAuth.email} onChange={onFieldChange} name="email" />
                            </div>
                            <p className="error-text">{errors?.email}</p>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" value={userAuth.password} onChange={onFieldChange} name="password" />
                            </div>
                            <p className="error-text">{errors?.password}</p>
                            <div className="mb-3">
                                <label className="form-label">Re-enter password</label>
                                <input type="password" className="form-control" value={userAuth.rePassword} onChange={onFieldChange} name="rePassword" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select class="form-select" aria-label="Default select example" onChange={(e) => onRoleChange(e)}>
                                    <option selected disabled value={"Select Role"}>{"Select role"}</option>
                                    {roles.map((role) => {
                                        return (
                                            <option value={role}>{role}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <Link to="/login">Already has account please go to login</Link>
                            </div>
                            <p className="error-text">{errors?.rePassword}</p>
                            <input type="submit" className="btn btn-primary w-100" value="Signup" style={{ background: '#009688', border: '1px solid #009688' }} />
                            {isError && <div className="mb-3">
                                <h4 style={{ color: "red" }}>{errMessage}</h4>
                            </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Signup