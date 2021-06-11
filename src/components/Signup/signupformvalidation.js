export default function validate(values) {
    let errors = {};
    if(!values.firstname){
        errors.firstname='First Name is required';
    }else if (!/^[A-Za-z]+$/.test(values.firstname)){
        errors.firstname='First Name is invalid';
    }
    if(!values.lastname){
        errors.lastname='Last Name is required';
    }else if (!/^[A-Za-z]+$/.test(values.lastname)){
        errors.lastname='Last Name is invalid';
    }
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = 'Password is required';
    } else if (values.confirmpassword.length < 8) {
      errors.confirmpassword = 'Password must be 8 or more characters';
    }
    if(!values.rollno){
      errors.rollno='Roll No is required';
    }
    if(!values.department){
      errors.department='Department is required';
    }
    return errors;
};