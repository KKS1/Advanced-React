import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  age: number;
};

function CreateProduct() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  console.log(watch('lastName')); // watch input value by passing the name of it

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          isInvalid={!!errors.firstName}
          {...register('firstName', { required: true })}
        />
        <Form.Text className="text-muted">eg. Kanwaljeet</Form.Text>

        <Form.Control.Feedback type="invalid">
          Please enter your first name.
        </Form.Control.Feedback>
      </Form.Group>

      {errors.firstName && <div>this is first name error</div>}

      <input {...register('lastName', { required: true })} />

      {errors.lastName && <span>Last name is missing</span>}

      <input type="number" {...register('age', { min: 18 })} />

      {errors.age?.type === 'min' && <span>Minimum age is 18 years</span>}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateProduct;
