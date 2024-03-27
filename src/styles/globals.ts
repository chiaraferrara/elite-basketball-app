import styled from '@emotion/styled';

import { Global, css } from '@emotion/react';

export const globalStyles = css`
  body {
    background-color: red; 
  }
`;

export const Button = styled.button`
    position: relative;
    overflow: hidden;
    background-color: #f02b2b;
    color: black;
    font-weight: bold;
    height: 70px;
    font-size: 0.9rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    margin: 3px;
    margin-inline: 10px;
    border: none;
    cursor: pointer;
    z-index: 0;
    transition: all 0.3s ease;

    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        background-color: #212322;
        z-index: -1;
        transition: height 0.3s ease;
    }

    &:hover:before {
        height: 100%;
    }

    &:hover {
        color: #fff;
    }
`;


    export const Row = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    
    `

    export const PlayerName = styled.h3`
    font-size: 0.5rem;
    `;

export const Nav = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #212322;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    box-shadow: 0 2px 20px 0px rgb(0 0 0 / 68%);
    margin: 0 auto;
    a {
      
      &:hover {
          color: white;
        }
        text-decoration: none;

        

    font-weight: bold;
    }
    `;


    


    export const Img = styled.img`
    width: 300px;
    height: 300px;
    `;

    export const ContactWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start
    padding: 1rem 2rem;
    background-color: #f7f7f7;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin: 0 auto;
    `;


    export const PreviewPic = styled.img`
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-right: 1rem;
    object-fit: cover;
    box-shadow: 0 2px 8px 0px rgb(0 0 0 / 25%);
    `;

    export const PointsDetail = styled.div`
    display: flex;
    flex-flow: row wrap;
    background-color: #fff;
    justify-content: center;
    text-align: center;
    padding: 2rem 3rem;
    color: black;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin-top: 1rem;
    margin: 0 auto;
    `;

    export const RowWrap = styled.div`

    display: flex;
    flex-flow: row wrap;
    color: #212322;
    padding: 1rem 2rem;
    align-items: center
    `;

    export const Icon = styled.img`
    width: 30px;
    height: 30px;
    margin-left: 1rem;
    `;

    export const Wrapper= styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;`

    export const TeamWrapper = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgb(33,35,34);
    background: linear-gradient(180deg, rgba(33,35,34,1) 3%, rgba(255,255,255,1) 3%);background-color: #ffffff;
    color: black;
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    text-align: center;

    h1{
      color: #black;
      font-size: 1.5rem;
    }
    
    `;
