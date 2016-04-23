import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

var EmailAlerts = require("../js/api-email-alert.js");


class Body extends React.Component {
  componentDidMount() {
    $('.tablesaw').table();
  }
  render() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col xs={12}>
              <PanelContainer noOverflow controlStyles='bg-orange75 fg-white'>
                <Panel>
                  <PanelHeader className='bg-blue fg-white'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>My Alerts</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <Table bordered striped className='tablesaw' data-mode='swipe'>
                            <thead>
                              <tr>
                                <th data-priority='persist'>Name</th>
                                <th>Rank</th>
                                <th>Money</th>
                                <th>Money</th>

                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th className='ranked-name'><a href='#'>Amanda</a></th>
                                <td className='current-ranking'>1</td>
                                <td>19.45</td>
                                <td>18.72</td>

                              </tr>
                              <tr>
                                <th className='ranked-name'><a href='#'>Dave</a></th>
                                <td>2</td>
                                <td>36.32</td>
                                <td>20.52</td>

                              </tr>

                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

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
