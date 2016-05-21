import { Link, State, Navigation } from 'react-router';

import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

var Account = require("../js/account.js").Account;

var AccountApi = require("../js/api-account.js");


var Body = React.createClass({
  mixins: [ Navigation],

  sendAccount: function(e) {
    var that = this
    var account = that.state.account;
    var validPassword = true;

    if(account.password() != account.confirmPassword() ) {
        validPassword = false;
            this.setState({account:account, showFormPasswordError: true,passErrorMessage: "Error: Passwords must be the same"});
    }
    if( _.isEmpty(account.password()) || _.isEmpty(account.username()) || _.isEmpty(account.email())) {
            validPassword = false;
                this.setState({account:account, showFormPasswordError: true,passErrorMessage: "Error: UserName, email and password are mandatory"});
    }

    if(account.password().length < 6) {
    validPassword = false;
            this.setState({account:account, showFormPasswordError: true, passErrorMessage: "Error: Password must contain at least six characters!"});
          }
    if(account.password() == account.username()) {
    validPassword = false;
      this.setState({account:account, showFormPasswordError: true, passErrorMessage: "Error: Password must be different from Username!"});

    }
    var re = /[0-9]/;
    if(!re.test(account.password())) {
    validPassword = false;
       this.setState({account:account, showFormPasswordError: true, passErrorMessage: "Error: password must contain at least one number (0-9)!"});
    }
    var re = /[a-z]/;
    if(!re.test(account.password())) {
    validPassword = false;
      this.setState({account:account, showFormPasswordError: true, passErrorMessage: "Error: password must contain at least one lowercase letter (a-z)!"});
    }
    var re = /[A-Z]/;
    if(!re.test(account.password())) {
    validPassword = false;
     this.setState({account:account, showFormPasswordError: true, passErrorMessage: "Error: password must contain at least one uppercase letter (A-Z)!"});
    }



    if(validPassword){
       AccountApi.sendAccount(account,that.handleOK,that.handleKo)
     }
  },
  handleOK: function() {
    var that = this;
    vex.dialog.alert({
                    message: 'Account Sent! Check your email to validate',
                    callback: (value) => {
                       that.transitionTo('/login');
                    }
                  });
  },
  handleKo : function(status) {
  var that = this;
    if (status == 400)
      this.setState({showFormPasswordError: false,showFormUsernameError:true});
      else {
       vex.dialog.alert('Ooops! There seems to be a problem , please try again later on');
      }
  },
   getInitialState: function() {
                return {account: new Account(), showFormPasswordError:false,showFormUsernameError:false};
    },
  componentDidMount: function() {
    $('html').addClass('authentication');
  },
  componentWillUnmount: function() {
    $('html').removeClass('authentication');
  },
   handleChange: function(event) {
          var acc = this.state.account;
          acc.update(event.target.id,event.target.value);
          this.setState({account:acc});
     },
  render: function() {
   var showPasswordError = !this.state.showFormPasswordError ? (<div></div>)  : (<div>{this.state.passErrorMessage}</div>);
   var showUserNameError = !this.state.showFormUsernameError ? (<div></div>)  : (<div>Username already in use!</div>);


    return (
      <Container id='auth-container' className='signup'>
        <Container id='auth-row'>
          <Container id='auth-cell'>
            <Grid>
              <Row>
                <Col sm={12}>
                  <PanelContainer noControls>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Sign up</h3>
                        </div>
                        <div>
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form onSubmit={this.back}>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroupAddon>
                                  <Input autoFocus type='text' id='username' className='border-focus-blue' placeholder='Username' onChange={this.handleChange} />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-mail' />
                                  </InputGroupAddon>
                                  <Input type='email' id='email' className='border-focus-blue' placeholder='support@bobbit.co.uk' onChange={this.handleChange}/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroupAddon>
                                  <Input type='password' id='password' className='border-focus-blue' placeholder='password' onChange={this.handleChange}/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                  <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroupAddon>
                                  <Input type='password' id='confirmPassword' className='border-focus-blue' placeholder='confirm password' onChange={this.handleChange}/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={12} collapseLeft collapseRight>
                                      <Button  outlined lg bsStyle='blue' block onClick={this.sendAccount}>Create account</Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
                            {showPasswordError}
                            {showUserNameError}
                          </div>
                          <div className='bg-hoverblue fg-black50 text-center' style={{padding: 25, paddingTop: 12.5}}>
                            <div style={{marginBottom: 12.5}}>SIGN UP WITH</div>
                            <Grid>
                              <Row>
                                <Col xs={12} sm={6} smCollapseRight>
                                  <Button block  id='facebook-btn' lg bsStyle='darkblue' onClick={this.back}>
                                    <Icon glyph='icon-fontello-facebook' />
                                    <span>Facebook</span>
                                  </Button>
                                </Col>
                                <Col xs={12} sm={6}>
                                  <Button block  id='twitter-btn' lg bsStyle='darkblue' onClick={this.back}>
                                    <Icon glyph='icon-fontello-twitter' />
                                    <span>Twitter</span>
                                  </Button>
                                </Col>
                              </Row>
                            </Grid>
                            <div style={{marginTop: 25}}>
                              Already have an account? <Link to='/login'>Login</Link>
                            </div>
                          </div>
                        </div>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Grid>
          </Container>
        </Container>
      </Container>
    );
  }
});

@SidebarMixin
export default class extends React.Component {
  render() {
    var classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
}
