import styled from 'styled-components';

export const Container = styled.div`
 display: none;
  
@media screen and (max-width: 600px) {
  display: flex;



  > svg {
    margin-top: 0.7rem;
    position: absolute; 
    color: white;
    width: 100px;
    height: 30px;
    cursor: pointer;
    background-color: #1D449F; 
  }

  .teste {
    background-color: #1D449F; 
    width: 100vw;
  }

}

@media screen and (max-width: 900px) {
  display: flex;



  > svg {
    margin-top: 0.7rem;
    position: absolute; 
    color: white;
    width: 100px;
    height: 30px;
    cursor: pointer;
    background-color: #1D449F; 
  }

  .teste {
    background-color: #1D449F; 
    width: 100vw;
  }

}
  
`;