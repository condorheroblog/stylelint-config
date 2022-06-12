import styled from "@emotion/styled";

const Title = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  width: calc(5% - 10em);
`;

function Invalid() {
  return (
    <>
      <Title>Learn React</Title>
      <div style={{widht: "22px",top: 0}} />
    </>
  );
}

export default Invalid;
