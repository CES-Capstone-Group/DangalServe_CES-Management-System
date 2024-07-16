import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faChartLine, faUserPen, faTrophy, faFileLines, faFile, faChevronDown, faCodePullRequest, faInbox, faCalendar } from '@fortawesome/free-solid-svg-icons'
import SidebarMenu, { SidebarMenuNav } from 'react-bootstrap-sidebar-menu';
import Logo from '../assets/pnclogo.png'
import '../App.css'
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';

const AdminSidebar = () => {
  return (
    <SidebarMenu expand="lg" className="d-md-block bg-light flex-column" style={{maxWidth:'19.9em', boxShadow: '5px 5px 10px'}}>
      {/*SidebarMenu Header*/}
      <SidebarMenu.Toggle>
        <SidebarMenu.Brand>
          <img className='logo img-fluid' src={Logo} alt="pnclogo" />
        </SidebarMenu.Brand>
      </SidebarMenu.Toggle>

      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          <h5>Community Extension Service Management System</h5>
        </SidebarMenu.Brand>
      </SidebarMenu.Header>

      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faTableColumns} style={{ color: 'black' }} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>

        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faUserPen} style={{ color: 'black' }} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Account Management </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>

        {/* PROPOSALS */}
        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faFileLines}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Proposals </SidebarMenu.Nav.Title>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>

            <SidebarMenu.Sub.Collapse>
              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Pending Proposals </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Approved Proposals </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

        {/* ACHIEVEMENTS */}
        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faTrophy} />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Achievements </SidebarMenu.Nav.Title>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>

            <SidebarMenu.Sub.Collapse>
              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Pending Achievements </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Approved Achievements </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

        {/* REQUESTS */}
        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faInbox}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Requests </SidebarMenu.Nav.Title>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>

            <SidebarMenu.Sub.Collapse>

              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Event Reschedule </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>

            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

        {/* DOCUMENTS */}
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faFile} style={{ color: 'black' }} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Documents </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>

        {/* CALENDAR */}
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faCalendar} style={{ color: 'black' }}></FontAwesomeIcon>
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Calendar </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>

        {/* Reports */}
        <SidebarMenu.Nav>
          <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faChartLine} />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Reports </SidebarMenu.Nav.Title>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
            </SidebarMenu.Sub.Toggle>

            <SidebarMenu.Sub.Collapse>
              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Involvement </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> KPI </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Impact </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
}

export default AdminSidebar;
