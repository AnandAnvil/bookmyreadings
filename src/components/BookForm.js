import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
  const [book, setBook] = useState(() => {
    return {
      bookname: props.book ? props.book.bookname : '',
      author: props.book ? props.book.author : '',
      year: props.book ? props.book.year : '',
      price: props.book ? props.book.price : '',
      date: props.book ? props.book.date : ''
    };
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { bookname, author, price, year } = book;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [bookname, author, price, year];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(),
        bookname,
        author,
        price,
        year,
        date: new Date()
      };
      props.handleOnSubmit(book);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    switch (name) {
      case 'year':
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        
        break;
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            value={author}
            placeholder="Enter name of author"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="year">
          <Form.Label>Published Year</Form.Label>
          <Form.Control
            className="input-control"
            type="date"
            name="year"
            value={year}
            placeholder="Published Year"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
