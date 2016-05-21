import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';
import { Link, State, Navigation } from 'react-router';


import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import LoremIpsum from 'global/jsx/loremipsum';
import ReactStyle from 'global/jsx/react-styles/src/ReactStyle.jsx';




var EmailAlert = require("../js/emailAlert.js").EmailAlert;
var TubeLine = require("./tubeLine.jsx").TubeLine;
var TubeLineList = require("../js/tubeLine.js").TubeLineList;
var ajax = require("../js/ajax.js");

var EmailAlerts = require("../js/api-email-alert.js");

var _ = require("lodash");
var Body = React.createClass({
mixins: [State, Navigation],
   contextTypes: {
            router: React.PropTypes.object
   },

  checkForSession: function() {
     var cookie = ajax.cookie()
     if(_.isEmpty(cookie))
        this.transitionTo('/login');
  },
  componentDidMount: function() {

    this.checkForSession();

    var isLtr = $('html').attr('dir') === 'ltr';
    var styles = {};
    var that = this;

    if(isLtr) {
      styles['#wizard-2 .form-border'] = {
        borderRight: '1px solid #ddd'
      };
    } else {
      styles['#wizard-2 .form-border'] = {
        borderLeft: '1px solid #ddd'
      };
    }

    ReactStyle.addRules(ReactStyle.create(styles));

    $('#wizard-1').steps({
      autoFocus: true
    });

    $("#form-2").validate({
      rules: {
        confirm_password: {
          equalTo: "#password"
        }
      }
    });

    $('#wizard-2').steps({
      onStepChanging: function (event, currentIndex, newIndex) {
        $('#form-2').validate().settings.ignore = ':disabled,:hidden';
        return $('#form-2').valid();
      },
      onFinishing: function (event, currentIndex) {
        $('#form-2').validate().settings.ignore = ':disabled';
        return $('#form-2').valid();
      },
      onFinished: function (event, currentIndex) {
            EmailAlerts.sendEmailAlert(that.state.emailAlert,that.callbackSuccess,that.callbackFailure)
      }
    });


  },
  callbackSuccess: function() {
   vex.dialog.confirm({
                message: 'Alert Created!',
                callback: (value) => {
                   that.transitionTo('/');
                }
              });
  },

   callbackFailure: function() {
     const path = '/my-alerts'
     history.replaceState(null, path)
   },

  getInitialState: function() {
              return {emailAlert: new EmailAlert()}
  },
   handleChange: function(event) {
        var emailAlert = this.state.emailAlert;
                emailAlert.update(event.target.name,event.target.value);
                this.setState({emailAlert:emailAlert});
   },
   handleChangeOnSelect: function(event) {
                var emailAlert = this.state.emailAlert;
                        emailAlert.update(event.target.id,event.target.value);
                        this.setState({emailAlert:emailAlert});
  },
  generateMessageForPreviewAboutTubeLine : function() {
    var listOfLines = _.map(this.state.emailAlert.tubeLines(), function(lineId) {
        return TubeLineList.findById(lineId).displayName()
    })

    if(_.isEmpty(listOfLines))
      return "<< TUBE LINES selected on the next step>>";
    else {

         if(_.size(listOfLines) == 1)
           return listOfLines[0].concat(" Line")
         else {

           var last = _.last(listOfLines)
           var others = _.pull(listOfLines, last)

           var lastStr = _.toString(" and ").concat(last).concat(" Line")
           return _.join(others,",").concat(lastStr)

         }


    }


  },

  render: function() {

    var that=this;
    var lines = that.state.emailAlert.tubeLines()
    var selectedTubeLines = _.isEmpty(lines) ? (<div></div>) : ( _.map(lines, function(line)
     { return <TubeLine name={line}/>  })  )

     var rangeHour = _.range(1,25)

     var selectOption = _.flatten(_.map(rangeHour, function(h) {
        var f = _.toString(h).concat(":").concat("00");
        var s = _.toString(h).concat(":").concat("30");

        return ([<option value={f}>{f}</option>,<option value={s}>{s}</option>]);
     }));

      var tubeLines = _.map(new TubeLineList().list(), function(line) {
             return (<option value={line.id()}>{line.displayName()}</option>);
          });

    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col xs={12}>

              <PanelContainer noOverflow controlStyles='bg-pink fg-white'>
                <Panel>
                  <PanelHeader className='bg-blue fg-white' style={{margin: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Set up your ALERT</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody>
                    <Form id='form-2'>
                      <div id='wizard-2'>
                        <h1>Email Data</h1>
                        <div>
                          <Grid>
                            <Row>
                              <Col sm={4} xs={12} collapseLeft xsOnlyCollapseRight>
                                <FormGroup>
                                  <Label htmlFor='username'>Your Name test@re.it*</Label>
                                  <Input type='text' id='nameFrom' name='nameFrom' className='required' onChange={this.handleChange}/>
                                </FormGroup>
                               <FormGroup>
                                 <Label htmlFor='username'>E-mail (From) test@re.it*</Label>
                                 <Input type='email' id='emailFrom' name='emailFrom' className='required' onChange={this.handleChange}/>
                               </FormGroup>
                              </Col>
                              <Col sm={4} xs={12} collapseLeft className='form-border'>
                                <FormGroup>
                                  <Label htmlFor='username'>E-mail (To) test@re.it</Label>
                                  <Input type='email' id='emailTo' name='emailTo' className='required' onChange={this.handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor='username'>Name (To) test@re.it *</Label>
                                  <Input type='text' id='nameTo' name='nameTo' className='required' onChange={this.handleChange}/>
                                </FormGroup>
                              </Col>
                              <Col sm={4} xs={6} collapseRight>
                                <p>
                                  All fields marked (*) are Mandatory.
                                </p>
                              </Col>
                            </Row>
                            <Row>
                            <Col xs={12}>
                            <hr style={{marginTop: 10}}/>
                                <h4>Preview</h4>
                                <PanelBody>
                                <Grid>

                                  <Row>
                                  <Col xs={12}>
                                     <PanelContainer className='inbox'>
                                         <Panel>
                                           <PanelBody style={{paddingTop: 0}}>

                                             <hr style={{margin: 10}}/>
                                             <Panel horizontal>
                                               <PanelBody className='panel-sm-9 panel-xs-12'>
                                                 <Grid>
                                                   <Row>
                                                     <Col xs={12}>
                                                       <div className='inbox-avatar'>
                                                         <div className='inbox-avatar-name'>
                                                           <div className='fg-darkgrayishblue75'><strong>From: </strong>{that.state.emailAlert.nameFrom()} - <em>{that.state.emailAlert.emailFrom()}</em></div>
                                                           <div className='fg-darkgrayishblue75'><strong>To: </strong>{that.state.emailAlert.nameTo()} - <em>{that.state.emailAlert.emailTo()}</em></div>
                                                           <div className='fg-darkgray40'><strong>Subject: </strong>Running late</div>
                                                         </div>
                                                       </div>
                                                     </Col>
                                                   </Row>
                                                 </Grid>
                                                 <hr style={{marginTop: 10}}/>
                                                 <Grid>
                                                   <Row>
                                                     <Col xs={12}>
                                                       <p>
                                                         <strong>Hi {that.state.emailAlert.nameTo()},</strong>
                                                       </p>
                                                       <p>
                                                         Due to severe delays on {that.generateMessageForPreviewAboutTubeLine()}, {that.state.emailAlert.nameFrom()} might be running a few minutes late .
                                                       </p>
                                                       <p>This message was sent by {that.state.emailAlert.nameFrom()} using <a target='_blank' href='http://www.bobbit.co.uk'>Bobbit.</a></p>


                                                       <div><strong>Regards,</strong></div>
                                                       <div><strong>Bobbit Team</strong></div>
                                                     </Col>
                                                   </Row>
                                                 </Grid>
                                                <hr style={{margin: 10}}/>

                                               </PanelBody>
                                             </Panel>
                                           </PanelBody>
                                         </Panel>
                                     </PanelContainer>

                                  </Col>

                                  </Row>
                                </Grid>
                              </PanelBody>
                              </Col>

                            </Row>
                          </Grid>
                        </div>

                        <h1>Journey Info</h1>
                        <div>
                          <Grid>
                             <Row>
                              <Col xs={6}>

                              <FormGroup>
                                  <Label htmlFor='hourStart'>Journey Start Hour</Label>

                                  <Select id='hourStart' defaultValue='' onChange={this.handleChangeOnSelect}>
                                  <option value=''></option>
                                   {selectOption}
                                  </Select>
                                  </FormGroup>
                                  <FormGroup>
                                  <Label htmlFor='inlinehelp'>Duration</Label>
                                  <Input type='text' id='duration' name='duration' placeholder='Enter Numbers' onChange={this.handleChange} className='inline' />
                                  <HelpBlock className='inline'>minutes.</HelpBlock>
                                </FormGroup>
                              </Col>
                              <Col xs={6}>
                              <FormGroup>
                                <Label htmlFor='tubeLine'>Select Tube Line</Label>

                                <Select id='tubeLine' defaultValue='' onChange={this.handleChangeOnSelect}>
                                  <option value=''></option>
                                  {tubeLines}
                                </Select>
                              </FormGroup>
                               <FormGroup>
                                  <Label > Tube Line to watch</Label>
                                  {selectedTubeLines}
                                </FormGroup>

                              </Col>

                             </Row>


                          </Grid>

                        </div>
                        <h1>Settings</h1>
                            <div>
                              <Grid>
                                 <Row>
                                  <Col xs={6}>

                                  <FormGroup>
                                    <Label htmlFor='alertName'>Alert Name</Label>
                                    <Input type='text' id='alertName' name='alertName' className='required' onChange={this.handleChange}/>
                                  </FormGroup>
                                  <FormGroup>
                                    <div>
                                      <Checkbox inline id='recurring' value='true' name='recurring' onChange={this.handleChange}>
                                        Recurring (every Week Day)
                                      </Checkbox>
                                      <Checkbox inline id='enabled' value='true' defaultChecked name='enabled' onChange={this.handleChange}>
                                        Enabled?
                                      </Checkbox>


                                    </div>
                                  </FormGroup>
                                  </Col>

                                 </Row>


                              </Grid>

                            </div>
                      </div>
                    </Form>
                  </PanelBody>

                </Panel>
              </PanelContainer>


            </Col>
          </Row>
        </Grid>
        {ReactStyle.renderToComponents()}
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
