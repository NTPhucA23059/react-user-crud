import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import { useEffect, useState } from "react";

// Schema validation
const userValidationSchema = object({
    name: string().required("Name is required"),
    pic: string().url("Must be a valid URL").required("Pic is required"),
    bio: string().min(5, "Bio too short").required("Bio is required"),
});

export function EditUser() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://68366aa5664e72d28e40afee.mockapi.io/users/${id}`)
            .then((data) => data.json())
            .then((userInfo) => setUser(userInfo));
    }, [id]);

    return user ? <EditUserForm user={user} /> : <p>Loading...</p>;
}

export function EditUserForm({ user }) {
    const navigate = useNavigate();

    const updateUser = (updatedUser) => {
        fetch(`https://68366aa5664e72d28e40afee.mockapi.io/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(updatedUser),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => navigate("/users"));
    };

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        touched,
        values,
    } = useFormik({
        initialValues: {
            name: user.name,
            pic: user.pic,
            bio: user.bio,
        },
        onSubmit: (updatedUser) => {
            updateUser(updatedUser);
        },
        validationSchema: userValidationSchema,
        enableReinitialize: true, // 👈 QUAN TRỌNG để cập nhật form khi props user thay đổi
    });

    return (
        <form onSubmit={handleSubmit} className="add-user-form">
            <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                type="text"
                placeholder="Name"
                required
            />
            {touched.name && errors.name ? <p>{errors.name}</p> : null}

            <input
                value={values.pic}
                onChange={handleChange}
                onBlur={handleBlur}
                name="pic"
                type="text"
                placeholder="Profile Pic Url"
            />
            {touched.pic && errors.pic ? <p>{errors.pic}</p> : null}

            <input
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                name="bio"
                type="text"
                placeholder="Bio"
            />
            {touched.bio && errors.bio ? <p>{errors.bio}</p> : null}

            <button type="submit">Save</button>
        </form>
    );
}
