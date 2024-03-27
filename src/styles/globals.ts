import styled from '@emotion/styled';

import { Global, css } from '@emotion/react';

export const globalStyles = css`
  body {
    background-color: red; 
  }
`;

export const Button = styled.button`
    background-color: #f02b2b;
    color: black;
    font-weight: bold;
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
    direction: rtl;
    z-index: -1;
    box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
    7px 7px 20px 0px rgba(0,0,0,.1),
    4px 4px 5px 0px rgba(0,0,0,.1);
   transition: all 0.3s ease;

    &:hover {
      color: #fff;
    }
    &:hover:after {
      left: auto;
      right: 0;
      width: 100%;
    }
    &:active {
      top: 2px;
    }

    &:hover {
        background-color: #28292a;
        margin-top: -2px;
        color: white;
        a {
        color: black;

        &:hover{
          color: white;
        }
        }
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
    flex-flow: column wrap;
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