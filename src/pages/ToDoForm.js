import { Form } from 'formik';
import React from 'react';
import Button from 'src/components/Button';
import CustomDatePicker from 'src/components/CustomDatePicker';
import FormField from 'src/components/FormField';

const ToDoForm = (props) => {
    const {
        values: { id, text, dueDate, priority },
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
                className={id ? 'h-28 w-full' : 'w-3/5'}
            />
            <div className={`flex flex-wrap justify-between`}>
                <CustomDatePicker
                    selected={dueDate}
                    onChange={(date) => setFieldValue('dueDate', date)}
                    id="custom-date-picker"
                />
                <FormField  id='priority' name="priority" as="select"  onChange={handleChange} value={priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </FormField>

                <div className={`flex flex-row`}>
                    {id ? <Button type='cancel' btnText={'Cancel'} className={id ? 'bg-red-600' : null} /> : null}
                    <Button type='submit' btnText={id ? 'Update' : 'Add'} className={id ? 'bg-green-600' : null} />
                </div>
            </div>
        </Form>
    );
}

export default React.memo(ToDoForm);
