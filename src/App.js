import React from 'react';
import './App.css';
import { Form, Col, Button, Row, DropdownButton, Dropdown } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        formCheck: '',
        formCheckHobby:[]
      },
      error: {
        firstname: false,
        lastname: false,
        email: false,
        password: false,
        mobileNo: false,
        formRadios: false,
        formCheck: false,
        formCheckHobby: false
      },
      formCheck: [],
      isChecked: false,
    }
  }
  validateField = (name, value) => {
    // let errorMessage;

    switch (name) {
      case "email": {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(value);
        if (result === false) { this.setState({ error: { ...this.state.error, [name]: true } }) }
        else {
          this.setState({
            error: { ...this.state.error, [name]: false }
          })
        }
        break;
      }
      case "firstname": {
        const pattern = /^[a-zA-Z]{1,10}$/;
        const result = pattern.test(value);
        if (result === false) { this.setState({ error: { ...this.state.error, [name]: true } }); }
        else {
          this.setState({
            error: { ...this.state.error, [name]: false }
          })
        }
        break;
      }
      case "lastname": {
        const pattern = /^[a-zA-Z]{1,10}$/;
        const result = pattern.test(value);
        if (result === false) { this.setState({ error: { ...this.state.error, [name]: true } }); }
        else {
          this.setState({
            error: { ...this.state.error, [name]: false }
          })
        }
        break;
      }
      case "mobileNo": {
        const pattern = /^[0-9]{10}$/;
        const result = pattern.test(value);
        if (result === false) { this.setState({ error: { ...this.state.error, [name]: true } }); }
        else {
          this.setState({
            error: { ...this.state.error, [name]: false }
          })
        }
        break;
      }
      case "password": {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        const result = pattern.test(value);
        if (result === false) { this.setState({ error: { ...this.state.error, [name]: true } }); }
        else {
          this.setState({
            error: { ...this.state.error, [name]: false }
          })
        }
        break;
      }
      case "formRadio": {
        this.setState({ error: { ...this.state.error, [name]: true } });
        break;
      }
      case "formCheck": {
        this.setState({ error: { ...this.state.error, [name]: true } });
        break;
      }
      case "formCheckHobby": {
        if(this.state.form.formCheckHobby.length===0){
          this.setState({ error: { ...this.state.error,[name]:true } });
        }
        else{
          this.setState({ error: { ...this.state.error,[name]:false } }); 
        }
        break;
      }
      default:
        console.log("hello");
    }
  }
  validateChecked = (e) => {
    const { formCheckHobby } = this.state.form;
    const{form}=this.state
    const { name, value, checked } = e.target;
    if (checked) {
      formCheckHobby.push(value)
    }
    else {
      let index = formCheckHobby.indexOf(value)
      formCheckHobby.splice(index, 1)
    }
    this.setState({ form: { ...form, formCheckHobby: formCheckHobby } },function () {
      if (this.state.form[name].length === 0) {
        this.validateField(name, value);
      }
      console.log(this.state.form[name])
    })
  }
  handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      }
    }, function () {
      if (this.state.form[name] === '') {
        this.validateField(name, value);
      }
    })
    console.log(this.state)
  }
  render() {
    const { firstname, lastname, email, mobileNo, password, formCheck,formCheckHobby } = this.state.error;
    return (
      <div className="container card">
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="4">
              <Form.Label>First name</Form.Label><span className="error-msg">*</span>
              <Form.Control type="text" name="firstname" placeholder="First name" onBlur={(e) => this.handleChange(e)} />
              {firstname ? <span className="error-msg">Please enter First name</span> : ''}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationMiddleName">
              <Form.Label>Middle name</Form.Label>
              <Form.Control type="text" name="middlename" placeholder="Middle name" />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomName">
              <Form.Label>Last name</Form.Label><span className="error-msg">*</span>
              <Form.Control type="text" name="lastname" placeholder="Last name" onBlur={(e) => this.handleChange(e)} />
              {lastname ? <span className="error-msg">Please enter Last name</span> : ''}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationEmail">
              <Form.Label>Email</Form.Label><span className="error-msg">*</span>
              <Form.Control type="text" name="email" placeholder="Email" onBlur={(e) => this.handleChange(e)} />
              {email ? <span className="error-msg">Please enter valid email</span> : ''}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label  >Mobile no.<span className="error-msg">*</span></Form.Label>
              <Form.Control type="text" name="mobileNo" placeholder="Mobile no." onBlur={(e) => this.handleChange(e)} />
              {mobileNo ? <span className="error-msg">Please enter valid Mobile no.</span> : ''}
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustomPassword">
              <Form.Label>Password<span className="error-msg">*</span></Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onBlur={(e) => this.handleChange(e)} />
              {password ? <span className="error-msg">Please enter atleast one Uppercase,Lowercase,speacial Character and NUmber</span> : ''}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <fieldset>
              <Form.Group as={Row}>
                <Col><Form.Label column  > Gender:<span className="error-msg">*</span> </Form.Label></Col>
                <Col><Form.Check type="radio" label="Female" value="female" name="formRadios" id='formFemale' onChange={this.handleChange} /></Col>
                <Col><Form.Check type="radio" label="Male" value="male" name="formRadios" id='forMmale' onChange={this.handleChange} /></Col>
              </Form.Group>
            </fieldset>
          </Form.Row>
          <Form.Row>
            <fieldset>
              <Form.Group as={Row}>
                <Col><Form.Label column > Occupation:<span className="error-msg">*</span></Form.Label></Col>
                <Col><Form.Check type="checkbox" value="Student" id="Student" label="Student" name="formCheck"
                  checked={this.state.form.formCheck === "Student"}
                  onChange={this.handleChange}
                /></Col>
                <Col><Form.Check type="checkbox" value="Employee" id="Employee" label="Employee" name="formCheck"
                  checked={this.state.form.formCheck === "Employee"}
                  onChange={this.handleChange}
                /></Col>
                <br />
                {formCheck ? <span className="error-msg">Please select any one</span> : ''}
              </Form.Group>
            </fieldset>
          </Form.Row>
          <Form.Row>
            <fieldset>
              <Form.Group as={Row}>
                <Col><Form.Label column > Hobby:<span className="error-msg">*</span> </Form.Label></Col>
                <Col><Form.Check type="checkbox" label="Singing" value="Singing" name="formCheckHobby" id="formSinging" onChange={this.validateChecked} /></Col>
                <Col><Form.Check type="checkbox" label="Dancing" value="Dancing" name="formCheckHobby" id="formDancing" onChange={this.validateChecked} /></Col>
                <Col><Form.Check type="checkbox" label="Reading" value="Reading" name="formCheckHobby" id="formReading" onChange={this.validateChecked} /></Col>
                <Col><Form.Check type="checkbox" label="Travelling" value="Travelling" name="formCheckHobby" id="formTravelling" onChange={this.validateChecked} /></Col>
                {formCheckHobby ? <span className="error-msg">Please select any one</span> : ''}
              </Form.Group>
            </fieldset>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label><span className="error-msg">*</span>
              <DropdownButton title="City">
              <Dropdown.Item value="Select city" >Select city</Dropdown.Item>
                <Dropdown.Item value="Rajkot" >Rajkot</Dropdown.Item>
                <Dropdown.Item value="Ahemdabad">Ahemdabad</Dropdown.Item>
                <Dropdown.Item value="Surat">Surat</Dropdown.Item>
                <Dropdown.Item value="Vadodara">Vadodara</Dropdown.Item>
              </DropdownButton>
              <Form.Control.Feedback type="invalid">Please provide a valid city. </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit" >Submit form</Button>
        </Form>
      </div>
    )
  }
}

export default App;
