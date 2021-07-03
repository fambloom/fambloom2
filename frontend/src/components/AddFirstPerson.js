import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, FormGroup, Label, Input
} from 'reactstrap';


export default class Homepage extends Component {
    render() {
        return(
            <div>

 <Container>
 <Row>
<Col sm="10" md={{ size: 6, offset: 3 }}>
<br></br>
<Card>
<CardBody body className="text-center">
<CardTitle tag="h2" centered>Welcome to TreeName</CardTitle>
<CardTitle tag="h5" centered>Add your First Person to get started</CardTitle>
<FormGroup>
 <Label for="firstName" hidden>First Name</Label>
 <Input type="firstName" name="firstName" id="firstName" placeholder="First Name" />
</FormGroup>
<FormGroup>
 <Label for="lastName" hidden>Last Name</Label>
 <Input type="lastName" name="lastName" id="lastName" placeholder="Last Name" />
</FormGroup>
<FormGroup>
 <Label for="select" hidden>Gender</Label>
 <Input type="select">
   <option>Female</option>
   <option>Male</option>
   <option>Other</option>
 </Input>
</FormGroup>
<CardText centered></CardText>
<Button centered outline color="secondary">Submit</Button>
</CardBody>
</Card>
</Col>
</Row>
<br></br>
<br></br>
<br></br>
</Container>

</div>
    );
  }

}