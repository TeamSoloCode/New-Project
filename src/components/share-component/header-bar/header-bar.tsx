import * as React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./header-bar.css";
export interface IHeaderBarProps {}
export interface IHeaderBarState {
  headerStyle: string;
}

export default class HeaderBar extends React.Component<IHeaderBarProps, IHeaderBarState> {
  constructor(props: IHeaderBarProps) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      headerStyle: "bg-header",
    };
  }

  handleScroll = (e: any) => {
    let element = e.target;
    if (element.scrollingElement.scrollTop > 50) {
      this.setState({ headerStyle: "header-custom header_area" });
    } else {
      this.setState({ headerStyle: "header_area" });
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  
  public render() {
    const { headerStyle } = this.state;
    return (
			<Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className={headerStyle}>
				<Container>
					<Navbar.Brand href="/" className="title">
						WEFINEX
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto"></Nav>
						<Nav>
							<Nav.Link>
								<div className="item-nav"> Trang chủ </div>
							</Nav.Link>

							<Nav.Link href="#features">
								<div className="item-nav">Chuyên gia</div>
							</Nav.Link>

							<Nav.Link href="#pricing">
								<div className="item-nav">Đăng ký</div>
							</Nav.Link>

							<Nav.Link href="#pricing">
								<div className="item-nav">Liên hệ</div>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
  }
}
