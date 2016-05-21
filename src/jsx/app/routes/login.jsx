import { Link, State, Navigation } from 'react-router';

import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';
var AccountApi = require("../js/api-account.js");
var Account = require("../js/account.js").Account;

var Body = React.createClass({
  mixins: [State, Navigation],

    login: function(e) {
      var that = this
      var account = that.state.account;
      var validPassword = true;

      if( _.isEmpty(account.password()) || _.isEmpty(account.username())) {
              validPassword = false;
                  this.setState({account:account, showFormPasswordError: true,passErrorMessage: "Error: UserName and Password are mandatory"});
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
         AccountApi.login(account,that.handleOK,that.handleKo)
       }
    },
  handleOK: function() {
      var that = this;
      that.transitionTo('/');
    },
    handleKo : function(status) {
    var that = this;
      if (status == 400 || status == 404 || status == 403)
        this.setState({showFormPasswordError: true,showFormUsernameError:false, passErrorMessage:"Error: Credentials wrong or account not active"});
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
      <Container id='auth-container' className='login'>
        <Container id='auth-row'>
          <Container id='auth-cell'>
            <Grid>
              <Row>
                <Col sm={12}>
                  <PanelContainer noControls>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Sign in to Bobbit</h3>
                        </div>
                        <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                          <div>You need to sign in for those awesome features</div>
                          <div style={{marginTop: 12.5, marginBottom: 12.5}}>
                            <Button id='facebook-btn' lg bsStyle='darkblue'  onClick={this.back}>
                              <Icon glyph='icon-fontello-facebook' />
                              <span>Sign in <span className='hidden-xs'>with facebook</span></span>
                            </Button>
                          </div>
                          <div>
                            <a id='twitter-link' href='#' onClick={this.back}><Icon glyph='icon-fontello-twitter' /><span> or with twitter</span></a>
                          </div>
                        </div>
                        <div>
                          <div className='text-center' style={{padding: 12.5}}>
                            or use your Bobbit account
                          </div>
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
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroupAddon>
                                  <Input type='password' id='password' className='border-focus-blue' placeholder='password' onChange={this.handleChange} />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>
                                      <Link to='/signup'>Create a Bobbit account</Link>
                                    </Col>
                                    <Col xs={6} collapseLeft collapseRight className='text-right'>
                                      <Button outlined lg  bsStyle='blue' onClick={this.login}>Login</Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
                            {showPasswordError}
                                                        {showUserNameError}
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
