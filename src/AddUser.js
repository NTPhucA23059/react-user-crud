import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { object, string } from "yup";
const userValidationSchema = object({
    name: string().required(),
    pic: string().url().required(),
    bio: string().min(10).required(),
});
export function AddUser() {
    const { handleSubmit, handleChange, errors, touched,
        handleBlur } = useFormik({
            initialValues: {
                name: "",
                pic: "",
                bio: "",
            },
            onSubmit: (newUser) => {
                addUser(newUser);
            },
            validationSchema: userValidationSchema,
        });
    const navigate = useNavigate();
    const addUser = (newUser) => {
        console.log(newUser);
        fetch(`https://68366aa5664e72d28e40afee.mockapi.io/users`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => navigate("/users"));
    };
    return (
        <form onSubmit={handleSubmit} className="add-user-form">
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                type="text"
                placeholder="Name"
                required
            />
            {touched.name && errors.name ? <p>{errors.name}</p> : null}
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="pic"
                type="text"
                placeholder="Profile Pic Url"
            />
            {touched.pic && errors.pic ? <p>{errors.pic}</p> : null}
            <input onChange={handleChange}
                onBlur={handleBlur} name="bio" type="text" placeholder="Bio" />
            {touched.bio && errors.bio ? <p>{errors.bio}</p> : null}
            <button type="submit">Add user</button>
        </form>
    );
}