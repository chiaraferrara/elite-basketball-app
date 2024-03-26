import styled from '@emotion/styled';

import { Global, css } from '@emotion/react';

export const globalStyles = css`
  body {
    background-color: red; 
  }
`;

export const Nav = styled.div`
width: 100%;
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
        color: #212322;
        text-decoration: none;

    font-weight: bold;
    }
    `;


    export const Button = styled.button`
    background-color: #f02b2b;
    color: black;
    height: 70px;
    border-radius: 0.8em;
    font-size: 0.9rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    margin: 3px;
    margin-inline: 10px;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #28292a;
        margin-top: -2px;
        a {
        color: #f02b2b;
        }
    }
    `;


    export const Img = styled.img`
    width: 300px;
    height: 300px;
    `;