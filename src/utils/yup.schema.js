import * as Yup from "yup";


export const YUP = {
    text: Yup.string().trim().required('Enter your to-do note')
};
