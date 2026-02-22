import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function FormikForm() {

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Registered:", data);

      alert("Registration successful!");
      resetForm();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>User Registration (Formik)</h2>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>

          <div>
            <Field
              type="text"
              name="username"
              placeholder="Username"
            />
            <ErrorMessage name="username" component="p" style={{ color: "red" }} />
          </div>

          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="p" style={{ color: "red" }} />
          </div>

          <div>
            <Field
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="p" style={{ color: "red" }} />
          </div>

          <button type="submit">Register</button>

        </Form>
      </Formik>
    </div>
  );
}

export default FormikForm;
