import * as React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { preparedImageSrc } from '../../../utils';
import './header-bar.css';
export interface IHeaderBarProps {
	trainerSection: React.RefObject<HTMLHeadingElement>;
	registerSection: React.RefObject<HTMLHeadingElement>;
	contactSection: React.RefObject<HTMLHeadingElement>;
}
export interface IHeaderBarState {
	headerStyle: string;
}

export default class HeaderBar extends React.Component<IHeaderBarProps, IHeaderBarState> {
	constructor(props: IHeaderBarProps) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this);
		this.scrollTo = this.scrollTo.bind(this);
		this.state = {
			headerStyle: 'bg-header',
		};
	}

	handleScroll = (e: any) => {
		let element = e.target;
		if (element.scrollingElement.scrollTop > 50) {
			this.setState({ headerStyle: 'header-custom header_area' });
		} else {
			this.setState({ headerStyle: 'header_area' });
		}
	};
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

  scrollTo(elementName: React.RefObject<HTMLHeadingElement>, href: string) {
    console.log(elementName)
      if (elementName.current !== null) {
        window.scrollTo({
          behavior: 'smooth',
          top: elementName.current.offsetTop - 90,
        });
      } else {
        window.location.href = href;
			// elementName.current.scrollIntoView({behavior: 'smooth' });
		}
	}

	public render() {
		const { headerStyle } = this.state;
		const { trainerSection, registerSection, contactSection } = this.props;
		return (
			<Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" className={headerStyle + ' header_area'}>
				<Container>
					<Navbar.Brand href="/" className="title" data="asdasqweqwe">
						<img src={preparedImageSrc('big_logo.png')} style={{height: '68px'}} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto"></Nav>
						<Nav>
							<Nav.Link href="/">
								<div className="item-nav"> Trang chủ </div>
							</Nav.Link>

							<Nav.Link onClick={() => this.scrollTo(trainerSection, '/expert')}>
								<div className="item-nav">Chuyên gia</div>
							</Nav.Link>

							<Nav.Link onClick={() => this.scrollTo(registerSection, '')}>
								<div className="item-nav">Đăng ký</div>
							</Nav.Link>

							<Nav.Link onClick={() => this.scrollTo(contactSection, '')}>
								<div className="item-nav">Liên hệ</div>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
