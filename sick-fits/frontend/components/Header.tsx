import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  background: var(--red);
  font-size: 4rem;
  padding: 1rem 2rem;
  transform: skew(-7deg);
  margin: 2rem 0;

  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const HeaderStyle = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    align-items: stretch;
    padding: 0 2rem;
  }

  .sub-bar {
    border-bottom: 1px solid var(--black, black);
    display: grid;
    grid-template-columns: 1fr;
    padding: 2rem 0;
  }
`;

function Header() {
  return (
    <HeaderStyle>
      <div className="bar">
        <Logo>
          <Link href="/">Sick fits</Link>
        </Logo>
        <Nav />
      </div>

      <div className="sub-bar">
        <p>Search</p>
      </div>
    </HeaderStyle>
  );
}

export default Header;
