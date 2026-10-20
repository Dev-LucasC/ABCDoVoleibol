import styled from 'styled-components';

export const Container = styled.div`
  background-color: #171923;
  position: fixed;
  height: 100%;
  height: 100dvh;
  top: 0;
  left: 0;
  width: min(85vw, 360px);
  overflow-y: auto;
  overscroll-behavior: contain;
  animation: showSidebar .4s;
  z-index: 20;
  > svg {
    position: absolute;
    color: white;
    width: 30px;
    height: 30px;
    top: 32px;
    left: 32px;
    cursor: pointer;
  }
  @keyframes showSidebar {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
`;
export const Content = styled.div`
  margin-top: 100px;
  padding-bottom: 1rem;
`;
