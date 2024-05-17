import { Form } from 'formik';
import React from 'react';
import Button from 'src/components/Button';
import CustomDatePicker from 'src/components/CustomDatePicker';
import FormField from 'src/components/FormField';

const ToDoForm = (props) => {
    const {
        values: { text, dueDate, id },
        handleChange,
        setFieldValue
    } = props;
    return (
        <Form autoComplete="off" className={id ? 'block' : 'flex flex-row justify-between'} >
            <FormField
                id='text'
                name="text"
                as="textarea"
                value={text}
                rows={"2"}
                placeholder="Enter your to-do"
                onChange={handleChange}
                className={id ? 'h-28 w-full' : null}
            />
            <div className={`flex flex-wrap justify-end`}>
                <CustomDatePicker
                    selected={dueDate}
                    onChange={(date) => setFieldValue('dueDate', date)}
                    id="custom-date-picker"
                />
                <div className={`flex flex-row`}>
                    {id ? <Button type='cancel' btnText={'Cancel'} className={id ? 'bg-red-600' : null} /> : null}
                    <Button type='submit' btnText={id ? 'Update' : 'Add'} className={id ? 'bg-green-600' : null} />
                </div>
            </div>
        </Form>
    );
}

export default React.memo(ToDoForm);
