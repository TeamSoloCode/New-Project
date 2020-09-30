import * as React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './header-bar.css';
export interface IHeaderBarProps {}

export default class HeaderBar extends React.Component<IHeaderBarProps> {
	public render() {
		return (
			<Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className="bg-header">
				<Container>
					<Navbar.Brand href="#home" className="header-title">
						Lân loz
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav"  />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto"></Nav>
						<Nav>
							<Nav.Link>
								<div className="item-nav">Home</div>
							</Nav.Link>

							<Nav.Link href="#features">
								<div className="item-nav">About</div>
							</Nav.Link>

							<Nav.Link href="#pricing">
								<div className="item-nav">Page</div>
							</Nav.Link>

							<Nav.Link href="#pricing">
								<div className="item-nav">Blog</div>
							</Nav.Link>

							<Nav.Link href="#pricing">
								<div className="item-nav">Contact</div>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
