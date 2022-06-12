import styled from "@emotion/styled";

const Title = styled.h2`width: calc(5% - 10em);
  margin: 0 0 1rem;
  font-size: 1.5rem;
`;

function Valid() {
  return (
    <>
      <Title>Learn React</Title>
      <div style={{ width: "22px", top: 0 }} />
    </>
  );
}

export default Valid;
