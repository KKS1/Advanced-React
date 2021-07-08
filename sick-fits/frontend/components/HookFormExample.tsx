import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  firstName: string;
  lastName: string;
  age: number;
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your first name')
    .min(5, 'First name must be atleast 5 characters long'),
  lastName: yup
    .string()
    .required('Please enter your last name')
    .min(3, 'First name must be atleast 3 characters long'),
  age: yup
    .number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .positive()
    .required('Please enter your age')
    .min(18, 'You must be atleast 18 years of age to apply'),
});

export default function HookFormExample() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  const watchedLastName = watch('lastName'); // watch input value by passing the name of it

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          isInvalid={!!errors.firstName}
          {...register('firstName')}
        />
        <Form.Text className="text-muted">eg. Kanwaljeet</Form.Text>

        <ErrorMessage
          name="firstName"
          errors={errors}
          render={({ message }) => (
            <Form.Control.Feedback type="invalid">
              {message}
            </Form.Control.Feedback>
          )}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Control
              type="text"
              placeholder="Enter last name"
              isInvalid={!!errors.lastName}
              {...field}
            />
          )}
        />

        <ErrorMessage
          name="lastName"
          errors={errors}
          render={({ message }) => (
            <Form.Control.Feedback type="invalid">
              {message}
            </Form.Control.Feedback>
          )}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAge">
        <Form.Label>Age</Form.Label>
        <Controller
          name="age"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Control
              type="number"
              placeholder="Enter your age"
              isInvalid={!!errors.age}
              {...field}
            />
          )}
        />

        <ErrorMessage
          name="age"
          errors={errors}
          render={({ message }) => (
            <Form.Control.Feedback type="invalid">
              {message}
            </Form.Control.Feedback>
          )}
        />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="file"
          className="form-control"
          {...register('formImage')}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
