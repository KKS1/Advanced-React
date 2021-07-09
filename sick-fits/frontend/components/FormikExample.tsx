import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import {
  Formik,
  Field,
  ErrorMessage,
  useFormik,
  useField,
  useFormikContext,
  Form as FormikForm,
} from 'formik';
import * as Yup from 'yup';

type FormValues = {
  firstName: string;
  age?: string;
};

const initialValues: FormValues = {
  firstName: '',
  age: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('Please enter your first name')
    .min(5, 'First name must be atleast 5 characters long'),
  age: Yup.number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .positive()
    .required('Please enter your age')
    .min(18, 'You must be atleast 18 years of age to apply'),
});

const onSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 100);
};

export default function FormikExample() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit,
        getFieldProps,
        values,
        setFieldValue,
        touched,
        errors,
        handleReset,
        isSubmitting,
        ...formikProps
      }) => {
        useEffect(() => {
          // setFieldValue('age', 32); // to depict watch function/ dependent fields
          console.log(values);
        }, [values.firstName]);

        return (
          <Form onSubmit={handleSubmit} onReset={handleReset}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                isInvalid={touched.firstName && Boolean(errors.firstName)}
                {...getFieldProps('firstName')}
              />
              <Form.Text className="text-muted">eg. Kanwaljeet</Form.Text>

              <ErrorMessage name="firstName">
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your age"
                isInvalid={touched.age && Boolean(errors.age)}
                {...getFieldProps('age')}
              />

              <ErrorMessage name="age">
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </Form.Group>

            <Container>
              <Row>
                <Col>
                  <Button className="mr-3" variant="secondary" type="reset">
                    Reset
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
}
